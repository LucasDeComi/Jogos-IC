export default function PrimaryButton({ onClick, children }) {
  return (
    <button
        className="bg-black text-white font-semibold px-6 py-2 rounded-md cursor-pointer"
        onClick={onClick}
    >
        { children }
    </button>
  )
}