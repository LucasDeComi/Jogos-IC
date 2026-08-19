export default function TableBodyCell({ children, pl, pr, bl, bb }) {
  return (
    <td
      className={`text-left py-2.5 font-medium
      ${pl ? "pl-5" : ""} ${pr ? "pr-5" : ""}
      ${bl ? "pl-5 border-l-2 border-black" : ""}
      ${bb ? "border-b-2 border-black" : ""}`}
    >
      {children}
    </td>
  )
}