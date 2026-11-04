import { Outlet } from "react-router-dom"
import Aside from "../components/layout/Aside"
import Header from "../components/layout/AppHeader"

export default function AppLayout() {
  return (
    <div className="flex w-screen h-screen">
      <Aside />
      <div className="flex flex-col w-full h-full bg-(--background) overflow-y-auto">
        <div className="sticky top-0 z-10 shrink-0 bg-(--background)">
          <Header />
        </div>
        <main className="w-full h-full px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}