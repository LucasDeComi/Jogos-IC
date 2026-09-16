import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Panel from "../components/ui/Panel";
import Title from "../components/ui/Title";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import loginBackground from "../assets/backgrounds/loginBackground.png";
import loginLogo from "../assets/icons/loginLogo.svg"
import userIcon from "../assets/icons/userIcon.svg";
import passwordIcon from "../assets/icons/passwordIcon.svg"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                backgroundImage: `url(${loginBackground})`,
            }}
        >
            <main className="flex flex-col gap-5 min-h-screen w-full items-center p-10">
                <section className="flex gap-5 items-center">
                    <img src={loginLogo} className="w-40" />
                    <h1 className="text-2xl text-[#20514F] font-semibold">Sistema de Jogos <br/> para Reabilitação</h1>
                </section>
                <Panel className="flex flex-col items-center gap-5 max-w-105 p-10 rounded-4xl bg-white/80 backdrop-blur-lg shadow-xl">
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
                    <Button onClick={() => login()} className="w-full rounded-xl mt-3" type="primary">
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