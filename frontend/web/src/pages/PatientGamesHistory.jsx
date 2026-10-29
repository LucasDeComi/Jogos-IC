import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PatientContext } from "../context/PatientContext";
import { GameContext } from "../context/GameContext";
import Title from "../components/ui/Title";
import Description from "../components/ui/Description";
import BackLink from "../components/ui/BackLink";
import Panel from "../components/ui/Panel";
import PanelTitle from "../components/ui/PanelTitle";
import Select from "../components/ui/Select";
import GameHistoryCard from "../components/ui/GameHistoryCard";
import Th from "../components/ui/TableHeaderCell";
import calendar from "../assets/icons/calendar.svg";
import chartBar from "../assets/icons/chartBar.svg";
import star from "../assets/icons/star.svg";

export default function PatientGamesHistory() {
  const [period, setPeriod] = useState("30");
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patient");
  const gameId = searchParams.get("game");

  const { findPatient } = useContext(PatientContext);
  const { findGame } = useContext(GameContext);

  const patient = findPatient(patientId);
  const game = gameId !== null ? findGame(Number(gameId)) : null;
  const sessions =
    gameId === null
      ? []
      : patient?.games?.find(
          (patientGame) => patientGame.gameId === Number(gameId),
        )?.sessions ?? [];

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - Number(period));

  const visibleSessions = sessions
    .filter(
      (session) =>
        period === "all" || new Date(session.dateTime) >= cutoffDate,
    )
    .sort((first, second) => second.dateTime - first.dateTime);
  const chartData = visibleSessions
    .filter((session) => Number.isFinite(session.score))
    .map((session) => ({
      ...session,
      timestamp: new Date(session.dateTime).getTime(),
    }))
    .sort((first, second) => first.timestamp - second.timestamp);
  const chartLineData =
    chartData.length === 1
      ? [
          {
            ...chartData[0],
            timestamp: chartData[0].timestamp - 24 * 60 * 60 * 1000,
            synthetic: true,
          },
          chartData[0],
          {
            ...chartData[0],
            timestamp: chartData[0].timestamp + 24 * 60 * 60 * 1000,
            synthetic: true,
          },
        ]
      : chartData;
  const formatDate = (timestamp) =>
    new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    }).format(new Date(timestamp));
  const formatDateTime = (timestamp) =>
    new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(timestamp));
  const formatSessionDate = (dateTime) =>
    new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(dateTime));
  const formatSessionTime = (dateTime) =>
    new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateTime));
  const totalScore = chartData.reduce(
    (total, session) => total + session.score,
    0,
  );
  const averageScore = chartData.length
    ? Math.round(totalScore / chartData.length)
    : "—";
  const highestScore = chartData.length
    ? chartData.reduce(
        (highest, session) => Math.max(highest, session.score),
        0,
      )
    : "—";
  const hasSessions = sessions.length > 0;

  return (
    <div className="flex flex-col items-start gap-5">
      <section className="flex justify-between items-center w-full">
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
      </section>
      <section className="flex flex-col gap-2">
        <Title>Histórico — {game?.name ?? "Jogo"}</Title>
        <Description>
          Desempenho histórico e métricas coletadas durante as jogadas de{" "}
          {patient?.name ?? "paciente"} ({patientId})
        </Description>
      </section>
      <hr />
      {!hasSessions ? (
        <Panel className="w-full p-8 text-center">
          <p className="text-sm text-(--secondary)">
            Este paciente ainda não possui sessões registradas para este jogo.
          </p>
        </Panel>
      ) : (
      <section className="flex flex-col gap-6 w-full">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 w-full">
          <GameHistoryCard
            title="SESSÕES"
            icon={calendar}
            value={visibleSessions.length}
          />
          <GameHistoryCard
            title="PONTUAÇÃO MÉDIA"
            icon={chartBar}
            value={averageScore}
          />
          <GameHistoryCard
            title="MELHOR PONTUAÇÃO"
            icon={star}
            value={highestScore}
          />
        </div>
        <div className="grid grid-cols-[minmax(300px,1fr)_minmax(250px,1fr)] items-stretch gap-6 w-full">
          <Panel className="flex h-128 flex-col gap-6 p-6">
            <PanelTitle>Evolução da pontuação</PanelTitle>
            {chartLineData.length ? (
              <div className="h-100 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartLineData}
                    margin={{ top: 8, right: 12, bottom: 4, left: 4 }}
                  >
                    <CartesianGrid
                      vertical={false}
                      stroke="currentColor"
                      opacity={0.12}
                      strokeDasharray="4 4"
                    />
                    <XAxis
                      dataKey="timestamp"
                      type="number"
                      scale="time"
                      domain={["dataMin", "dataMax"]}
                      tickFormatter={formatDate}
                      tick={{ fill: "var(--secondary)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      minTickGap={24}
                      tickMargin={14}
                    />
                    <YAxis
                      domain={["dataMin - 50", "dataMax + 50"]}
                      tickFormatter={(score) => score.toLocaleString("pt-BR")}
                      tick={{ fill: "var(--secondary)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      width={44}
                    />
                    {chartData.length === 1 ? (
                      <Tooltip
                        content={({ active, payload }) => {
                          const session = payload?.[0]?.payload;

                          if (!active || !session || session.synthetic) {
                            return null;
                          }

                          return (
                            <div
                              className="rounded-lg border border-(--border) bg-(--panel) p-3 text-xs text-(--text) shadow-lg"
                            >
                              <p>{formatDateTime(session.timestamp)}</p>
                              <p className="mt-1 font-semibold">
                                Pontuação: {session.score.toLocaleString("pt-BR")}
                              </p>
                            </div>
                          );
                        }}
                      />
                    ) : chartData.length > 1 ? (
                      <Tooltip
                        labelFormatter={formatDateTime}
                        contentStyle={{
                          backgroundColor: "var(--panel)",
                          border: "1px solid var(--border)",
                          borderRadius: 8,
                          color: "var(--text)",
                        }}
                        labelStyle={{ color: "var(--text)" }}
                        itemStyle={{ color: "var(--text)" }}
                        formatter={(score) => [
                          Number(score).toLocaleString("pt-BR"),
                          "Pontuação",
                        ]}
                      />
                    ) : null}
                    <Line
                      type="linear"
                      dataKey="score"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      dot={
                        chartData.length === 1
                          ? ({ cx, cy, payload }) =>
                              payload.synthetic ? null : (
                                <circle
                                  cx={cx}
                                  cy={cy}
                                  r={5}
                                  fill="var(--primary)"
                                  stroke="var(--panel)"
                                  strokeWidth={2}
                                />
                              )
                          : { r: 3, fill: "var(--primary)" }
                      }
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-sm text-(--secondary)">
                Nenhuma pontuação encontrada neste período.
              </p>
            )}
          </Panel>
          <Panel className="flex h-128 min-h-0 flex-col gap-4 overflow-y-auto p-6">
            <PanelTitle>Histórico de sessões</PanelTitle>
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <Th className="bg-(--background) px-4 py-2 first:rounded-l-lg last:rounded-r-lg">
                    Data
                  </Th>
                  <Th className="bg-(--background) px-4 py-2 first:rounded-l-lg last:rounded-r-lg">
                    Hora
                  </Th>
                  <Th className="bg-(--background) px-4 py-2 first:rounded-l-lg last:rounded-r-lg">
                    Pontuação
                  </Th>
                </tr>
              </thead>
              <tbody>
                {visibleSessions.map((session) => (
                  <tr key={session.id}>
                    <td className="text-sm text-(--text) px-4 py-2 border-b border-b-(--border)">
                      {formatSessionDate(session.dateTime)}
                    </td>
                    <td className="text-sm text-(--secondary) px-4 py-2 border-b border-b-(--border)">
                      {formatSessionTime(session.dateTime)}
                    </td>
                    <td className="text-sm text-(--link) font-bold px-4 py-2 border-b border-b-(--border)">
                      {Number.isFinite(session.score)
                        ? `${session.score.toLocaleString("pt-BR")} pts`
                        : "—"}
                    </td>
                  </tr>
                ))}
                {visibleSessions.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-sm text-(--secondary) px-4 py-6 text-center"
                    >
                      Nenhuma sessão encontrada neste período.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Panel>
        </div>
      </section>
      )}
    </div>
  );
}