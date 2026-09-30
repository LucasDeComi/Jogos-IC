export default function TableHeaderCell({ children, className = "" }) {
  return (
    <th
      scope="col"
      className={`text-[13px] text-(--secondary) font-bold text-left ${className}`}
    >
      {children}
    </th>
  );
}
