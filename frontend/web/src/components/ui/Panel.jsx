export default function Panel({ children, className = "", onClick = () => {} }) {
  return (
    <div
      onClick={onClick}
      className={`${className.includes("w-") || className.includes("w/") || className.includes("w[") ? "" : "w-full"} border border-(--border) bg-(--panel) text-lg ${className.includes("rounded") ? "" : "rounded-2xl"} ${className}`}
    >
      {children}
    </div>
  );
}