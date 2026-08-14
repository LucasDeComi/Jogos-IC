const store = new Map();

export default function rateLimit({
  windowMs = 60 * 1000,
  max = 10,
  message = "Muitas tentativas. Tente novamente mais tarde.",
} = {}) {
  return (req, res, next) => {
    const key = req.ip || "unknown";
    const now = Date.now();
    const existing = store.get(key) || { count: 0, resetAt: now + windowMs };

    if (now > existing.resetAt) {
      existing.count = 0;
      existing.resetAt = now + windowMs;
    }

    existing.count += 1;
    store.set(key, existing);

    if (existing.count > max) {
      return res.status(429).json({ status: "error", message });
    }

    next();
  };
}
