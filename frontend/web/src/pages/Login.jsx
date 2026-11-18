import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Panel from "../components/ui/Panel";
import Title from "../components/ui/Title";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import lightBackground from "../assets/backgrounds/loginBackgroundLight.png";
import darkBackground from "../assets/backgrounds/loginBackgroundDark.png";
import lightLogo from "../assets/icons/lightLogo.png";
import darkLogo from "../assets/icons/darkLogo.png";
import userIcon from "../assets/icons/userIcon.svg";
import passwordIcon from "../assets/icons/passwordIcon.svg"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("theme", theme);

    const navigate = useNavigate();

    function login() {
        if (!email || !password) {
            Swal.fire({
                title: "Preencha todos os campos.",
                confirmButtonColor: "#20514F",
            });
            return;
        }

        navigate("/app");
    }

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{
                backgroundImage: `url(${theme === "light" ? lightBackground : darkBackground})`,
            }}
        >
            <main className="flex min-h-screen w-full flex-col items-center gap-10 px-4 py-12 sm:gap-15 sm:px-8 sm:py-20 lg:px-10 lg:py-25">
                <section className="flex items-center gap-3 sm:gap-5">
                    <img src={theme === "light" ? lightLogo : darkLogo} className="w-20 sm:w-30" />
                    <h1 className="text-xl font-semibold text-(--primary) sm:text-2xl">Sistema de Jogos <br/> para Reabilitação</h1>
                </section>
                <Panel className="flex w-full max-w-150 flex-col items-center gap-6 rounded-3xl bg-transparent p-5 shadow-xl backdrop-blur-lg sm:gap-7.5 sm:rounded-4xl sm:p-8 lg:p-10">
                    <Title>Login</Title>
                    <Input
                        className="w-full"
                        type="email"
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        icon={userIcon}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        className="w-full"
                        type="password"
                        label="Senha"
                        placeholder="Digite sua senha"
                        icon={passwordIcon}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={() => login()} className="w-full rounded-xl mt-3" type="primary" size="large">
                        Entrar
                    </Button>
                    <Link className="text-[#458084] text-sm hover:underline font-medium">
                        Esqueceu sua senha?
                    </Link>
                </Panel>
            </main>
        </div>
    );
}