import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TherapistContext } from "../context/TherapistContext";
import Swal from "sweetalert2"
import Title from "../components/ui/Title";
import Subtitle from "../components/ui/Subtitle";
import Panel from "../components/ui/Panel";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Checkbox from "../components/ui/Checkbox";
import Button from "../components/ui/Button";

export default function TherapistSettings() {
    const { therapist, editTherapist } = useContext(TherapistContext);

    const [name, setName] = useState(therapist.name);
    const [email, setEmail] = useState(therapist.email);
    const [password, setPassword] = useState(therapist.password);
    const [theme, setTheme] = useState(therapist.theme);
    const [style, setStyle] = useState(therapist.style);
    const [itemsSize, setItemsSize] = useState(therapist.itemsSize);
    const [contrast, setContrast] = useState(therapist.contrast);

    const navigate = useNavigate();

    function editSettings() {
        if(!name || !email || !password) {
            Swal.fire({
                title: "Todos os dados pessoais são obrigatórios.",
                confirmButtonColor: "black"
            });
            return;
        }

        editTherapist(name, email, password, theme, style, itemsSize, contrast);

        navigate("/app/patients");

        Swal.fire({
            title: "Dados editados com sucesso!",
            icon: "success",
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            customClass: {
                popup: "swal2-toast"
            }
        });
    }

    return (
        <form className="flex flex-col items-start gap-7.5">
            <Title>Meus dados</Title>
            <section className="w-full flex justify-between gap-[5%]">
                <Panel className="flex flex-col gap-3 px-5 py-4">
                    <Subtitle className="mb-2">Dados Pessoais</Subtitle>
                    <Input
                        label="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="email"
                        label="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        label="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Panel>
                <Panel className="flex flex-col gap-5 px-5 py-4">
                    <Subtitle className="mb-2">Preferências de exibição</Subtitle>
                    <Select
                        label="Tema de tela"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                    >
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                        <option value="auto">Automático</option>
                    </Select>
                    <div className="flex gap-10 mb-5">
                        <div className="flex-1">
                            <Select
                                label="Tamanho dos itens"
                                value={itemsSize}
                                onChange={(e) => setItemsSize(e.target.value)}
                            >
                                <option value="small">Pequeno</option>
                                <option value="medium">Médio</option>
                                <option value="big">Grande</option>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <Select
                                label="Tipo de estilo"
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                            >
                                <option value="standart">Padrão</option>
                                <option value="compact">Reduzido</option>
                                <option value="elegant">Elegante</option>
                            </Select>
                        </div>
                    </div>
                    <Checkbox
                        label="Alto contraste"
                        checked={contrast}
                        onChange={(e) => setContrast(e.target.checked)}
                    />
                </Panel>
            </section>
            <Button type="primary" onClick={() => editSettings()}>Salvar alterações</Button>
        </form>
    )
}