export default function Option({ children, value, compare, selected = null }) {
  return (
    <option value={value} selected={selected ?? value === compare}>{children}</option>
  )
}