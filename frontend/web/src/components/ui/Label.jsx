export default function Label({ children, className = "", ...props }) {
  return (
    <label
      className={`text-sm font-semibold text-(--text) ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}