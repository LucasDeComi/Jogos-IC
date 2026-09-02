import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/layout/LoginHeader";
import Panel from "../components/ui/Panel";
import Title from "../components/ui/Title";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function login() {
        if(!email || !password) {
            Swal.fire({
                title: "Preencha todos os campos.",
                confirmButtonColor: "black"
            });
            return;
        }

        navigate("/app");
    }

    return (
        <>
            <Header />
            <main className="flex justify-center p-10">
                <Panel className="flex flex-col items-center gap-7.5 max-w-250 p-7.5">
                    <Title className="text-3xl">Login</Title>
                    <Input
                        className="w-full max-w-125"
                        type="email"
                        label="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        className="w-full max-w-125"
                        type="password"
                        label="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button onClick={() => login()} className="w-full max-w-125" type="primary">Entrar</Button>
                    <div className="flex max-w-125 w-full justify-start">
                        <Link className="text-[#666] italic hover:underline font-medium">Esqueceu sua senha?</Link>
                    </div>
                </Panel>
            </main>
        </>
    )
}