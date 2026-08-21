import Panel from "./Panel"

export default function Table({ children }) {
  return (
    <Panel>
      <table className="w-full">{ children }</table>
    </Panel>
  )
}