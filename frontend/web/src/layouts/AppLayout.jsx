import { Outlet } from "react-router-dom"
import Aside from "../components/layout/Aside"
import Header from "../components/layout/AppHeader"
import Chat from "../components/layout/Chat"

export default function AppLayout() {
  return (
    <div className="flex w-screen h-screen">
      <Aside />
      <div className="flex flex-col w-full h-full bg-(--background) overflow-y-auto">
        <div className="sticky top-0 z-10 shrink-0 bg-(--background)">
          <Header />
        </div>
        <main className="w-full flex-1 px-10 py-8">
          <Outlet />
        </main>
        <footer aria-hidden="true" className="shrink-0" />
      </div>
      <Chat />
    </div>
  )
}