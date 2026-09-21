import { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import { GameContext } from "../context/GameContext";
import PatientHeader from "../components/ui/PatientHeader";
import Subtitle from "../components/ui/Subtitle";
import Button from "../components/ui/Button";
import Panel from "../components/ui/Panel";
import PanelTitle from "../components/ui/PanelTitle";
import CardNote from "../components/ui/CardNote";
import DataRow from "../components/ui/DataRow";
import GameCard from "../components/ui/GameCard";
import { translateSetting } from "../utils/settings";
import { profileColors } from "../utils/colors";
import add from "../assets/icons/add.svg";
import notes from "../assets/icons/notes.svg";
import patientData from "../assets/icons/patientData.svg";
import patientSettings from "../assets/icons/patientSettings.svg";

export default function ViewPatient() {
    const formatter = new Intl.DateTimeFormat('pt-BR');
    const { id } = useParams();

    const { findPatient } = useContext(PatientContext);
    const { findGame } = useContext(GameContext);
    const patient = findPatient(id);

    const navigate = useNavigate();

    if (!patient) {
        return null;
    }

    const patientGames = (patient.games ?? [])
        .map((gameIndex) => findGame(gameIndex))
        .filter(Boolean);

    return (
        <section className="flex flex-col items-start gap-5">
            <PatientHeader
                title="Ficha do paciente"
                description="Acompanhe anotações clínicas, dados cadastrais e os jogos terapêuticos ativos"
                backLinkPath="/app/patients"
                patient={patient}
            />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-full">
                <Panel className="flex flex-col items-start gap-4 px-6 py-5 w-full">
                    <PanelTitle small icon={notes}>Evolução do paciente</PanelTitle>
                    <CardNote dateTime={new Date("2026-06-10T14:00:00")}>Apresentou boa atenção e evolução no labirinto motor. Coordenação mais estável.</CardNote>
                    <hr />
                    <CardNote dateTime={new Date("2026-06-08T15:30:00")}>Foco inicial reduzido nos minutos iniciais, mas completou as tarefas de memória visual recomendadas.</CardNote>
                    <Link className="text-(--link) text-sm hover:underline font-semibold">
                        Ver todas as anotações
                    </Link>
                </Panel>
                <Panel className="flex flex-col items-start gap-4 px-6 py-5 w-full">
                    <PanelTitle small icon={patientData}>Dados do paciente</PanelTitle>
                    <div className="flex flex-col gap-3 w-full">
                        <DataRow title="Prontuário" value={patient.id} />
                        <DataRow title="Nome completo" value={patient.name} />
                        <DataRow title="Data de nascimento" value={formatter.format(patient.birthDate)} />
                        <DataRow title="Idade" value={`${patient.getAge()} anos`} />
                    </div>
                </Panel>
                <Panel className="flex flex-col items-start gap-4 px-6 py-5 w-full">
                    <PanelTitle small icon={patientSettings}>Configurações do Paciente</PanelTitle>
                    <div className="flex flex-col gap-3 w-full">
                        <DataRow title="Tema da tela" value={translateSetting("theme", patient.theme)} />
                        <DataRow title="Tamanho dos itens" value={translateSetting("style", patient.style)} />
                        <DataRow title="Tipo de estilo" value={translateSetting("itemsSize", patient.itemsSize)} />
                        <DataRow title="Alto contraste" value={translateSetting("contrast", patient.contrast)} />
                        <DataRow title="Usar símbolos" value={translateSetting("useSymbols", patient.useSymbols)} />
                    </div>
                    <div className="w-full flex justify-center">
                        <Button className="w-full" type="edit" size="small" onClick={() => navigate(`/app/patients/settings/${id}`)}>
                            Editar Configurações
                        </Button>
                    </div>
                </Panel>
            </div>
            <div className="flex justify-between items-center w-full">
                <Subtitle>Jogos atribuídos</Subtitle>
                <Button type="primary" size="small" icon={add} onClick={() => navigate(`/app/patients/games/${id}`)}>Adicionar Jogo</Button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-6 w-full">
                {patientGames.length === 0 ? (
                    <p className="text-(--secondary) text-[13px]">O paciente não tem nenhum jogo</p>
                ) : patientGames.map((game, index) => (
                        <GameCard
                            key={index}
                            toolButtons={true}
                            color={profileColors[index % profileColors.length]}
                            name={game.name}
                            category={game.category}
                            skill={game.skill}
                            difficulty={game.difficulty}
                            gameId={index}
                            patientId={id}
                        />
                    )
                )}
            </div>
            
        </section>
    );
}