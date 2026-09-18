import { Outlet } from "react-router-dom"
import Aside from "../components/layout/Aside"

export default function AppLayout() {
  return (
    <div className="flex w-screen h-screen">
      <Aside />
      <main className="w-full px-10 py-8 bg-(--background) overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  )
}