import { useContext, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import { GameContext } from "../context/GameContext";
import Button from "../components/ui/Button";
import Title from "../components/ui/Title";
import Description from "../components/ui/Description";
import BackLink from "../components/ui/BackLink";
import Select from "../components/ui/Select";

export default function PatientGamesHistory() {
  const [period, setPeriod] = useState("30");
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patient");
  const gameId = searchParams.get("game");

  const { findPatient } = useContext(PatientContext);
  const { findGame } = useContext(GameContext);

  const patient = findPatient(patientId);
  const game = gameId !== null ? findGame(Number(gameId)) : null;

  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-start gap-5">
      <div className="flex justify-between items-center w-full">
        <BackLink to={`/app/patients/${patientId}`}>Voltar</BackLink>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-(--secondary)">Período:</span>
          <Select
            compact
            className="font-semibold"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
          >
            <option value="7">Últimos 7 dias</option>
            <option value="15">Últimos 15 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="365">Último ano</option>
            <option value="all">Todo o período</option>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Title>Histórico — {game.name}</Title>
        <Description>Desempenho histórico e métricas coletadas durante as jogadas de {patient.name} ({patientId})</Description>
      </div>
      <hr />
    </section>
  );
}