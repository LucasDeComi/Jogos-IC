import Link from "../ui/NavLink"

export default function Header() {
    return (
        <header className="flex justify-between items-center p-5 border-b-2 border-black">
            <h1 className="text-xl font-medium">Sistema de Jogos para Reabilitação</h1>
            <nav className="flex justify-between gap-10">
                <Link to="/patients">Pacientes</Link>
                <Link to="/settings">Meus dados</Link>
                <Link to="/">Sair</Link>
            </nav>
        </header>
    )
}