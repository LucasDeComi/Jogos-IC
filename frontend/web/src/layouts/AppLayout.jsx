import { Outlet } from "react-router-dom"
import Header from "../components/layout/AppHeader"

export default function AppLayout() {
  return (
    <div className="w-screen h-screen">
        <Header />
        <main className="w-full px-5 py-4">
            <Outlet />
        </main>
    </div>
  )
}