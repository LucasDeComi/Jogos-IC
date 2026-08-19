export default function TableHeaderCell({ children, pl, pr, bl, bb }) {
  return (
    <th
      className={`text-left py-2.5 font-bold
      ${pl ? "pl-5" : ""} ${pr ? "pr-5" : ""}
      ${bl ? "pl-5 border-l-2 border-black" : ""}
      ${bb ? "border-b-2 border-black" : ""}`}
    >
      {children}
    </th>
  )
}