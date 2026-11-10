import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
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
import CardNote from "../components/ui/CardNote";
import CardItem from "../components/ui/CardItem";
import GameSessionCard from "../components/ui/GameSessionCard";
import SessionDetails from "../components/ui/SessionDetails";
import Icon from "../components/ui/Icon";
import Info from "../components/ui/Info";
import ChartItem from "../components/ui/ChartItem";
import ProgressBar from "../components/ui/ProgressBar";
import { cardColors, profileColors, blockColors, progressColors } from "../utils/colors";
import calendar from "../assets/icons/calendar.svg";
import chartBar from "../assets/icons/chartBar.svg";
import star from "../assets/icons/star.svg";
import notes from "../assets/icons/notes.svg";
import lock from "../assets/icons/lock.svg";
import gameIcon from "../assets/icons/game.svg";
import time from "../assets/icons/time.svg";
import difficulty from "../assets/icons/difficulty.svg";
import conclusion from "../assets/icons/conclusion.svg";
import focus from "../assets/icons/focus.svg";

export default function PatientGamesHistory() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const deepLinkedSessionId = searchParams.get("session");
  const [period, setPeriod] = useState(() =>
    deepLinkedSessionId === null ? "30" : "all",
  );
  const [selectedSessionId, setSelectedSessionId] = useState(
    deepLinkedSessionId,
  );
  const sessionChartRef = useRef(null);
  const patientId = searchParams.get("patient");
  const gameId = searchParams.get("game");

  const { findPatient, findNotesByPatient } = useContext(PatientContext);
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

  useEffect(() => {
    if (
      selectedSessionId !== null &&
      !visibleSessions.some(
        (session) => String(session.id) === selectedSessionId,
      )
    ) {
      setSelectedSessionId(null);
    }
  }, [selectedSessionId, visibleSessions]);

  const selectedSession =
    selectedSessionId === null
      ? null
      : visibleSessions.find(
          (session) => String(session.id) === selectedSessionId,
        ) ?? null;

  useEffect(() => {
    if (
      selectedSession &&
      location.hash === "#session-performance" &&
      sessionChartRef.current
    ) {
      sessionChartRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location.hash, selectedSession]);

  const patientNotes = patient ? findNotesByPatient(patient.id) : [];
  const gameNotes = patientNotes
    .filter((note) => Number(note.gameId) === Number(gameId))
    .sort((first, second) => second.dateTime - first.dateTime);

  const filteredClinicalNotes = selectedSession
    ? gameNotes.filter(
        (note) =>
          String(note.sessionId ?? note.id) === String(selectedSession.id) ||
          (!note.sessionId &&
            new Date(note.dateTime).getTime() ===
              new Date(selectedSession.dateTime).getTime()),
      )
    : gameNotes.slice(0, 3);

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
  const sessionDurationMinutes = selectedSession?.duration ?? 22;
  const maxChartPoints = 8;
  const step = Math.max(1, Math.ceil(sessionDurationMinutes / (maxChartPoints - 1)));
  const sessionTicks = Array.from(
    { length: maxChartPoints },
    (_, index) => Math.min(index * step, sessionDurationMinutes),
  );
  const sessionProgressData = [
    { minute: 0, score: 260, tasks: 1 },
    { minute: sessionTicks[1], score: 340, tasks: 2 },
    { minute: sessionTicks[2], score: 430, tasks: 3 },
    { minute: sessionTicks[3], score: 560, tasks: 5 },
    { minute: sessionTicks[4], score: 640, tasks: 7 },
    { minute: sessionTicks[5], score: 700, tasks: 8 },
    { minute: sessionTicks[6], score: 710, tasks: 9 },
    { minute: sessionDurationMinutes, score: 720, tasks: 9 },
  ];

  const getSessionResponseValue = (session, offset) => {
    if (!session) return 0;

    const scoreSeed = Number.isFinite(session.score)
      ? Math.round(session.score / 100)
      : 0;

    return Math.abs((Number(session.id ?? 0) * 7 + offset * 9 + scoreSeed) % 11);
  };

  const selectedSessionClinicalResponses = selectedSession
    ? [
        {
          title: "Dificuldade percebida",
          value: getSessionResponseValue(selectedSession, 0),
          minText: "Fácil",
          maxText: "Muito Difícil",
          blockColors: blockColors().yellow,
          progressColor: progressColors.yellow,
        },
        {
          title: "Escala de dor",
          value: getSessionResponseValue(selectedSession, 1),
          minText: "Sem dor",
          maxText: "Dor intensa",
          blockColors: blockColors().red,
          progressColor: progressColors.red,
        },
        {
          title: "Ajuda necessária",
          value: getSessionResponseValue(selectedSession, 2),
          minText: "Autônomo",
          maxText: "Totalmente assistido",
          blockColors: blockColors().blue,
          progressColor: progressColors.blue,
        },
      ]
    : [];

  const hasSessions = sessions.length > 0;
  const sessionsLink = `/app/patients/${patientId}?game=${gameId}${selectedSession ? `&session=${selectedSession.id}` : ""}`;

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
                            <div className="rounded-lg border border-(--border) bg-(--panel) p-3 text-xs text-(--text) shadow-lg">
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
          <div className="flex w-full gap-6">
            <div className="flex w-full flex-col gap-4">
              <Panel className="flex flex-col gap-4 h-128 min-h-0 overflow-y-auto p-6">
                <div className="flex justify-between items-center w-full">
                  <PanelTitle>Histórico de sessões</PanelTitle>
                  <span className="inline-block bg-(--transparent) rounded-sm px-2.5 py-1 text-[11px] text-(--link) font-semibold">
                    Clique em uma sessão para ver detalhes
                  </span>
                </div>
                <table className="w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr>
                      <Th className="bg-(--background) px-4 py-2 first:rounded-l-lg last:rounded-r-lg">
                        Data
                      </Th>
                      <Th className="bg-(--background) px-4 py-2 first:rounded-l-lg last:rounded-r-lg">
                        Hora
                      </Th>
                      <Th className="bg-(--background) px-4 py-2 first:rounded-l-lg last:rounded-r-lg text-right">
                        Pontuação
                      </Th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleSessions.map((session) => {
                      const isSelected =
                        selectedSessionId === String(session.id);

                      return (
                        <tr
                          key={session.id}
                          onClick={() =>
                            setSelectedSessionId((current) =>
                              current === String(session.id)
                                ? null
                                : String(session.id),
                            )
                          }
                          className={`cursor-pointer transition-colors duration-150 ${
                            isSelected ? "bg-(--transparent)" : "hover:bg-(--transparent)"
                          }`}
                        >
                          <td className={`text-sm px-4 py-2 first:rounded-tl-lg last:rounded-tr-lg ${
                            isSelected
                              ? "text-(--primary) first:border-l-4 border-b-2 border-(--button)"
                              : "text-(--text) first:border-l-0 border-b border-(--border)"
                          }`}>
                            {formatSessionDate(session.dateTime)}
                          </td>
                          <td className={`text-sm px-4 py-2 first:rounded-tl-lg last:rounded-tr-lg ${
                            isSelected
                              ? "text-(--primary) first:border-l-4 border-b-2 border-(--button)"
                              : "text-(--secondary) first:border-l-0 border-b border-(--border)"
                          }`}>
                            {formatSessionTime(session.dateTime)}
                          </td>
                          <td className={`text-sm text-(--link) text-right font-bold px-4 py-2 first:rounded-tl-lg last:rounded-tr-lg ${
                            isSelected ? "first:border-l-4 border-b-2 border-(--button)" : "first:border-l-0 border-b border-(--border)"
                          }`}>
                            {Number.isFinite(session.score)
                              ? `${session.score.toLocaleString("pt-BR")} pts`
                              : "—"}
                          </td>
                        </tr>
                      );
                    })}
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
              <Panel className="flex flex-col gap-4 p-6">
                <PanelTitle icon={notes}>Anotações Clínicas</PanelTitle>
                <span className="text-[13px] text-(--secondary)">
                  {selectedSession
                    ? `Mostrando somente as anotações da sessão de ${formatSessionDate(selectedSession.dateTime)} às ${formatSessionTime(selectedSession.dateTime)}.`
                    : `Registros clínicos vinculados a sessões de ${game?.name ?? "este jogo"} de ${patient?.getName?.() ?? patient?.name ?? "paciente"}.`}
                </span>
                {filteredClinicalNotes.length === 0 ? (
                  <p className="text-sm text-(--secondary)">
                    Nenhuma anotação encontrada para esta sessão.
                  </p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {filteredClinicalNotes.map((note) => (
                      <div key={note.id} className="flex w-full flex-col gap-3">
                        <CardNote dateTime={note.dateTime}>{note.content}</CardNote>
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  to={sessionsLink}
                  className="text-(--link) text-sm hover:underline font-semibold"
                >
                  Ver sessões do paciente
                </Link>
              </Panel>
            </div>
            {selectedSession && (
              <div className="flex flex-col gap-4 lg:w-2/3 w-full">
                <Panel className="flex flex-col gap-5 p-6">
                  <section className="flex justify-between items-center">
                    <PanelTitle>Sessão selecionada</PanelTitle>
                    <div className="flex items-center gap-1.25 px-2 py-1 rounded-sm bg-(--background)">
                      <Icon src={lock} color="var(--secondary)" size={12} />
                      <span className="text-[11px] text-(--secondary)">
                        Somente leitura
                      </span>
                    </div>
                  </section>
                  <GameSessionCard
                    colors={{ background: "var(--transparent)", text: "var(--primary)", title: "var(--link)" }}
                    icon={gameIcon}
                    title={game?.name ?? "Jogo"}
                    date={selectedSession.dateTime}
                    patient={patient}
                  />
                  <section className="grid grid-cols-2 gap-3">
                    <SessionDetails
                      title="DURAÇÃO"
                      value={`${selectedSession.duration} minutos`}
                      icon={time}
                    />
                    <SessionDetails
                      title="DIFICULDADE"
                      value={game?.difficulty ?? "—"}
                      icon={difficulty}
                    />
                    <SessionDetails
                      title="CONCLUSÃO"
                      value="3 de 3 tentativas"
                      icon={conclusion}
                    />
                    <SessionDetails
                      title="FOCO TERAPÊUTICO"
                      value={game?.skill ?? "Coordenação"}
                      icon={focus}
                    />
                  </section>
                  <hr />
                  <span className="text-xs text-(--secondary) text-justify">
                    Dados da sessão jogada. Estas informações não são alteradas pela anotação.
                  </span>
                </Panel>
                <Info text="Selecione outra sessão na tabela para visualizar seus detalhes, gráfico de progresso e respostas clínicas." />
              </div>
            )}
          </div>
          {selectedSession && (
            <div
              ref={sessionChartRef}
              id="session-performance"
              className="flex w-full scroll-mt-24 items-stretch gap-6"
            >
              <div className="flex w-full flex-col gap-6">
                <Panel className="flex h-full flex-col gap-5 p-6">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col gap-1">
                      <PanelTitle>Desempenho e realização</PanelTitle>
                      <span className="text-xs text-(--secondary)">
                        {formatSessionDate(selectedSession.dateTime)} às {formatSessionTime(selectedSession.dateTime)}
                      </span>
                    </div>
                    <CardItem colors={cardColors().yellow}>Dados fictícios</CardItem>
                  </div>
                  <div className="h-80 w-full pl-2 pr-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={sessionProgressData}
                        margin={{ top: 8, right: 10, left: 10, bottom: 4 }}
                      >
                        <CartesianGrid
                          vertical={false}
                          stroke="currentColor"
                          opacity={0.12}
                          strokeDasharray="4 4"
                        />
                        <XAxis
                          dataKey="minute"
                          type="number"
                          domain={[0, sessionDurationMinutes]}
                          tickFormatter={(value) => `${value} min`}
                          ticks={sessionTicks}
                          tick={{ fill: "var(--secondary)", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          yAxisId="score"
                          hide={true}
                          domain={[350, 750]}
                        />
                        <YAxis
                          yAxisId="tasks"
                          orientation="right"
                          domain={[0, 10]}
                          hide={true}
                        />
                        <Tooltip
                          cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
                          contentStyle={{
                            backgroundColor: "var(--panel)",
                            border: "1px solid var(--border)",
                            borderRadius: 8,
                            color: "var(--text)",
                          }}
                          labelFormatter={(value) => `${value} min`}
                          labelStyle={{ color: "var(--text)" }}
                          formatter={(value, name) => [
                            Number(value).toLocaleString("pt-BR"),
                            name === "score" ? "Pontuação" : "Tarefas",
                          ]}
                        />
                        <Line
                          yAxisId="score"
                          type="monotone"
                          dataKey="score"
                          stroke={profileColors.green}
                          strokeWidth={3}
                          dot={{ r: 4, fill: profileColors.green }}
                          activeDot={{ r: 5 }}
                        />
                        <Line
                          yAxisId="tasks"
                          type="monotone"
                          dataKey="tasks"
                          stroke={profileColors.purple}
                          strokeWidth={3}
                          dot={{ r: 4, fill: profileColors.purple }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center gap-5">
                    <ChartItem color={profileColors.green}>Pontuação acumulada (pts)</ChartItem>
                    <ChartItem color={profileColors.purple}>Tarefas concluídas</ChartItem>
                  </div>
                </Panel>
              </div>

              <div className="flex w-full flex-col gap-6 lg:w-2/3">
                <Panel className="flex h-full flex-col gap-5 p-6">
                  <div className="flex justify-between items-center w-full">
                    <PanelTitle>Respostas clínicas</PanelTitle>
                    <CardItem colors={cardColors().yellow}>Dados fictícios</CardItem>
                  </div>
                  <span className="text-xs text-(--secondary)">Escala 0–10. Valores maiores indicam maior dificuldade, dor ou necessidade de ajuda — não melhor desempenho.</span>
                  {selectedSessionClinicalResponses.map((response, index) => (
                    <div key={response.title} className="contents">
                      <ProgressBar
                        title={response.title}
                        value={response.value}
                        minText={response.minText}
                        maxText={response.maxText}
                        blockColors={response.blockColors}
                        progressColor={response.progressColor}
                      />
                      {index < selectedSessionClinicalResponses.length - 1 && <hr />}
                    </div>
                  ))}
                </Panel>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}