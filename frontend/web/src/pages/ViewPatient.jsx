import { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import { GameContext } from "../context/GameContext";
import Subtitle from "../components/ui/Subtitle";
import Button from "../components/ui/Button";
import Panel from "../components/ui/Panel";
import Table from "../components/ui/Table";
import TableHeaderCell from "../components/ui/TableHeaderCell";
import TableBodyCell from "../components/ui/TableBodyCell";
import TableActionsCell from "../components/ui/TableActionsCell";
import { translateSetting } from "../utils/settings";

export default function ViewPatient() {
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
            <Button onClick={() => navigate("/app/patients")}>&larr; Voltar</Button>
            <div className="w-full flex justify-between gap-[25%]">
                <Panel className="flex flex-col items-start gap-5 px-4 py-3">
                    <Subtitle>Dados do paciente</Subtitle>
                    <table>
                        <tbody>
                            <tr>
                                <td>Prontuário:</td>
                                <td className="pl-2">{patient.id}</td>
                            </tr>
                            <tr>
                                <td>Nome:</td>
                                <td className="pl-2">{patient.name}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Panel className="h-full p-2">
                        <span className="">Prontuário e nome não podem ser editados</span>
                    </Panel>
                </Panel>
                <Panel className="flex flex-col items-start gap-5 px-4 py-3">
                    <Subtitle>Configurações do Paciente</Subtitle>
                    <table>
                        <tbody>
                            <tr>
                                <td>Tema:</td>
                                <td className="pl-5">
                                {translateSetting("theme", patient.theme)}
                                </td>
                            </tr>
                            <tr>
                                <td>Estilo:</td>
                                <td className="pl-5">
                                {translateSetting("style", patient.style)}
                                </td>
                            </tr>
                            <tr>
                                <td>Tamanho dos itens:</td>
                                <td className="pl-5">
                                {translateSetting("itemsSize", patient.itemsSize)}
                                </td>
                            </tr>
                            <tr>
                                <td>Contraste:</td>
                                <td className="pl-5">
                                {translateSetting("contrast", patient.contrast)}
                                </td>
                            </tr>
                            <tr>
                                <td>Usar símbolos:</td>
                                <td className="pl-5">
                                {translateSetting("useSymbols", patient.useSymbols)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="w-full flex justify-center">
                        <Button onClick={() => navigate(`/app/patients/settings/${id}`)}>
                            Editar Configurações
                        </Button>
                    </div>
                </Panel>
            </div>
            <div className="flex justify-between items-center w-full">
                <Subtitle>Jogos do paciente</Subtitle>
                <Button type="primary" onClick={() => navigate(`/app/patients/games/${id}`)}>+ Adicionar Jogo</Button>
            </div>

            {patientGames.length === 0 ? (
                <p className="italic text-gray-600">O paciente não tem nenhum jogo</p>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <TableHeaderCell center bb>Jogo</TableHeaderCell>
                            <TableHeaderCell center bb bl>Categoria</TableHeaderCell>
                            <TableHeaderCell center bb bl>Habilidade</TableHeaderCell>
                            <TableHeaderCell center bb bl>Dificuldade</TableHeaderCell>
                            <TableHeaderCell center bb bl>Ações</TableHeaderCell>
                        </tr>
                    </thead>
                    <tbody>
                        {patientGames.map((game, index) => (
                            <tr key={`${game.name}-${index}`}>
                                <TableBodyCell bb={index !== patientGames.length - 1} pl>{game.name}</TableBodyCell>
                                <TableBodyCell bb={index !== patientGames.length - 1} bl>{game.category}</TableBodyCell>
                                <TableBodyCell bb={index !== patientGames.length - 1} bl>{game.skill}</TableBodyCell>
                                <TableBodyCell bb={index !== patientGames.length - 1} bl>{game.difficulty}</TableBodyCell>
                                <TableActionsCell bb={index !== patientGames.length - 1} bl>
                                    <Link
                                        className="hover:underline"
                                        to={`/app/patients/games/history?patient=${id}&game=${index}`}
                                    >
                                        Histórico
                                    </Link>
                                    <span>Remover</span>
                                </TableActionsCell>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </section>
    );
}