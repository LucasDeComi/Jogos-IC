import { useContext } from "react"
import { useParams } from "react-router-dom"
import { PatientContext } from "../context/PatientContext"
import Subtitle from "../components/ui/Subtitle"
import Button from "../components/ui/Button"
import Panel from "../components/ui/Panel"
import Table from "../components/ui/Table"
import TableHeaderCell from "../components/ui/TableHeaderCell"
import TableBodyCell from "../components/ui/TableBodyCell"
import TableActionsCell from "../components/ui/TableActionsCell"

export default function ViewPatient() {
    const { id } = useParams();

    const { findPatient, patients } = useContext(PatientContext);
    const patient = findPatient(id);

    return (
        <section className="flex flex-col items-start gap-5">
            <Button>&larr; Voltar</Button>
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
                                <td className="pl-5">{patient.theme}</td>
                            </tr>
                            <tr>
                                <td>Estilo:</td>
                                <td className="pl-5">{patient.style}</td>
                            </tr>
                            <tr>
                                <td>Tamanho dos itens:</td>
                                <td className="pl-5">{patient.itemsSize}</td>
                            </tr>
                            <tr>
                                <td>Contraste:</td>
                                <td className="pl-5">{patient.contrast ? "Ativado" : "Desativado"}</td>
                            </tr>
                            <tr>
                                <td>Usar símbolos:</td>
                                <td className="pl-5">{patient.useSymbols ? "Sim" : "Não"}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="w-full flex justify-center">
                        <Button>Editar Configurações</Button>
                    </div>
                </Panel>
            </div>
            <Subtitle>Jogos do paciente</Subtitle>
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
                    <tr>
                        <TableBodyCell bb pl>Jogo 1</TableBodyCell>
                        <TableBodyCell bb bl>Memória</TableBodyCell>
                        <TableBodyCell bb bl>Memória</TableBodyCell>
                        <TableBodyCell bb bl>Médio</TableBodyCell>
                        <TableActionsCell bb bl>
                            <span>Histórico</span>
                            <span>Remover</span>
                        </TableActionsCell>
                    </tr>
                    <tr>
                        <TableBodyCell bb pl>Jogo 1</TableBodyCell>
                        <TableBodyCell bb bl>Memória</TableBodyCell>
                        <TableBodyCell bb bl>Memória</TableBodyCell>
                        <TableBodyCell bb bl>Médio</TableBodyCell>
                        <TableActionsCell bb bl>
                            <span>Histórico</span>
                            <span>Remover</span>
                        </TableActionsCell>
                    </tr>
                    <tr>
                        <TableBodyCell pl>Jogo 1</TableBodyCell>
                        <TableBodyCell bl>Memória</TableBodyCell>
                        <TableBodyCell bl>Memória</TableBodyCell>
                        <TableBodyCell bl>Médio</TableBodyCell>
                        <TableActionsCell bl>
                            <span>Histórico</span>
                            <span>Remover</span>
                        </TableActionsCell>
                    </tr>
                </tbody>
            </Table>
        </section>
    )
}