export default function TableHeaderCell({ children, center, pl, pr, bl, bb  }) {
  return (
    <th
      className={`py-2.5 font-bold
      ${center ? "text-center" : "text-left"}
      ${pl ? "pl-5" : ""} ${pr ? "pr-5" : ""}
      ${bl ? "border-l-2 border-black" : ""}
      ${bb ? "border-b-2 border-black" : ""}`}
    >
      {children}
    </th>
  )
}