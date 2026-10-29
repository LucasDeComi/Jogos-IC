import Patient from "../utils/Patient";
import PatientGame from "../utils/PatientGame";
import TherapistNote from "../utils/TherapistNote";

const gameAssociations = (associations) =>
  associations.map(
    ([
      gameId,
      difficulty,
      movementFocuses,
      evolutionLevel,
      supportLevel,
      notes = [],
    ]) =>
      new PatientGame(
        gameId,
        difficulty,
        movementFocuses,
        evolutionLevel,
        supportLevel,
        notes,
      ),
  );


export function createInitialPatients() {
  return [
    new Patient(
      "0001",
      "Gabriel Souza",
      new Date("2017-05-12"),
      gameAssociations([
        [0, "Médio", ["Mãos (Gestos finos)", "Braços (Coordenação ampla)"], "Alta", "Mínimo", [
          new TherapistNote(1, "0001", 0, "Mariana Costa", "Manteve a atenção durante a atividade e concluiu as etapas com mais precisão.", "2026-06-10T14:00:00", "Manter atividades de atenção sustentada e aumentar gradualmente o nível de desafio."),
          new TherapistNote(7, "0001", 0, "Mariana Costa", "Aumentou a precisão ao selecionar os estímulos e precisou de menos lembretes.", "2026-10-03T14:00:00", "Propor novas sequências de estímulos e reduzir gradualmente as pistas."),
        ]],
        [1, "Fácil", ["Mãos (Gestos finos)", "Cabeça / Pescoço"], "Alta", "Mínimo", [
          new TherapistNote(2, "0001", 1, "Rafael Martins", "Precisou de incentivo para iniciar, mas completou as tarefas de memória visual.", "2026-06-08T15:30:00", "Usar pistas visuais no início e incentivar o início independente da atividade."),
          new TherapistNote(8, "0001", 1, "Rafael Martins", "Completou as etapas com autonomia e manteve a atenção até o fim.", "2026-09-16T15:30:00", "Aumentar gradualmente a quantidade de itens nas tarefas de memória visual."),
        ]],
        [2, "Difícil", ["Braços (Coordenação ampla)", "Cabeça / Pescoço"], "Média", "Médio", [
          new TherapistNote(9, "0001", 2, "Helena Almeida", "Precisou de suporte pontual para coordenar os movimentos, com melhora no ritmo.", "2026-10-06T10:00:00", "Praticar a coordenação com movimentos em ritmo gradual e reduzir o suporte conforme necessário."),
        ]],
      ]),
      "AVC",
    ),
    new Patient(
      "0002",
      "Leonardo Nunes",
      new Date("2014-03-15"),
      gameAssociations([
        [0, "Médio", ["Pernas (Deslocamento)", "Tronco (Postura)"], "Média", "Mínimo", [
          new TherapistNote(10, "0002", 0, "Beatriz Ferreira", "Manteve a postura durante a atividade e concluiu as etapas propostas.", "2026-09-30T09:30:00", "Manter atividades posturais e ampliar progressivamente o tempo de sustentação."),
        ]],
        [2, "Difícil", ["Pernas (Deslocamento)", "Cabeça / Pescoço"], "Média", "Médio", [
          new TherapistNote(3, "0002", 2, "Helena Almeida", "Apresentou dificuldade na coordenação dos movimentos e se beneficiou de orientações frequentes.", "2026-06-06T10:15:00", "Repetir movimentos em etapas curtas com demonstração e pistas verbais."),
          new TherapistNote(11, "0002", 2, "Helena Almeida", "Respondeu melhor às instruções e realizou mais movimentos sem ajuda física.", "2026-10-04T10:15:00", "Reduzir gradualmente as orientações e estimular a execução independente."),
        ]],
        [3, "Médio", ["Tronco (Postura)", "Cabeça / Pescoço"], "Média", "Médio", [
          new TherapistNote(12, "0002", 3, "Daniel Ribeiro", "Seguiu a sequência com poucas pistas verbais.", "2026-09-12T11:00:00", "Aumentar gradualmente a extensão das sequências e manter pistas verbais pontuais."),
        ]],
        [4, "Difícil", ["Braços (Coordenação ampla)", "Cabeça / Pescoço"], "Média", "Médio", [
          new TherapistNote(13, "0002", 4, "Lucas Carvalho", "Demonstrou maior controle dos braços durante as tarefas de alcance.", "2026-08-20T13:00:00", "Variar a direção dos alcances e aumentar a distância de forma gradual."),
        ]],
      ]),
      "Acidente de trânsito",
    ),
    new Patient(
      "0003",
      "João Gomes",
      new Date("2005-11-21"),
      gameAssociations([
        [0, "Médio", ["Mãos (Gestos finos)", "Pernas (Deslocamento)"], "Alta", "Mínimo", [
          new TherapistNote(14, "0003", 0, "Rafael Martins", "Realizou a atividade com ritmo constante e boa coordenação das mãos.", "2026-10-02T14:30:00", "Introduzir tarefas de coordenação manual com maior variedade de estímulos."),
        ]],
        [2, "Difícil", ["Mãos (Gestos finos)", "Tronco (Postura)"], "Alta", "Mínimo", [
          new TherapistNote(15, "0003", 2, "Mariana Costa", "Concluiu as etapas com menos pausas e manteve uma postura estável.", "2026-09-25T10:30:00", "Aumentar gradualmente a duração da atividade, respeitando a necessidade de pausas."),
        ]],
        [4, "Difícil", ["Pernas (Deslocamento)", "Tronco (Postura)"], "Alta", "Mínimo", [
          new TherapistNote(4, "0003", 4, "Daniel Ribeiro", "Realizou a atividade com autonomia e demonstrou melhora na organização das respostas.", "2026-06-04T11:45:00", "Propor atividades com novas categorias, mantendo o incentivo à organização independente."),
          new TherapistNote(16, "0003", 4, "Daniel Ribeiro", "Organizou as respostas com autonomia e precisou de menos tempo para concluir.", "2026-09-10T11:45:00", "Aumentar moderadamente a complexidade das tarefas e observar a manutenção da autonomia."),
          new TherapistNote(17, "0003", 4, "Beatriz Ferreira", "Manteve o desempenho e identificou os erros sem orientação direta.", "2026-10-05T11:45:00", "Introduzir novos desafios e reforçar a revisão autônoma das respostas."),
        ]],
      ]),
      "Fratura",
    ),
    new Patient(
      "0004",
      "Manoel Ferreira",
      new Date("1988-02-25"),
      gameAssociations([
        [1, "Fácil", ["Mãos (Gestos finos)", "Braços (Coordenação ampla)"], "Média", "Médio", [
          new TherapistNote(18, "0004", 1, "Lucas Carvalho", "Realizou os movimentos com maior controle e aceitou bem as orientações.", "2026-09-22T13:15:00", "Manter os exercícios com pistas verbais e ampliar a variedade de movimentos."),
        ]],
        [3, "Médio", ["Pernas (Deslocamento)", "Cabeça / Pescoço"], "Média", "Médio", [
          new TherapistNote(5, "0004", 3, "Beatriz Ferreira", "Acompanhou as instruções com suporte pontual e concluiu a maior parte da atividade.", "2026-06-02T09:20:00", "Dividir as instruções em etapas e manter suporte pontual durante a execução."),
          new TherapistNote(19, "0004", 3, "Beatriz Ferreira", "Completou todas as etapas com lembretes verbais pontuais.", "2026-10-01T09:20:00", "Reduzir gradualmente os lembretes e verificar a compreensão antes de iniciar."),
          new TherapistNote(20, "0004", 3, "Helena Almeida", "Precisou de apoio frequente para iniciar os movimentos, mas concluiu a atividade.", "2026-08-01T09:20:00", "Antecipar o início com demonstração e reduzir o apoio conforme a resposta."),
        ]],
        [4, "Difícil", ["Braços (Coordenação ampla)", "Tronco (Postura)"], "Média", "Médio", [
          new TherapistNote(21, "0004", 4, "Mariana Costa", "Manteve o equilíbrio durante os movimentos e concluiu as tarefas propostas.", "2026-10-06T15:00:00", "Variar os movimentos de equilíbrio e manter atenção à segurança durante a atividade."),
        ]],
      ]),
      "AVC",
    ),
    new Patient(
      "0005",
      "Maria Lopes",
      new Date("2017-12-23"),
      gameAssociations([
        [1, "Fácil", ["Tronco (Postura)", "Cabeça / Pescoço"], "Média", "Médio", [
          new TherapistNote(6, "0005", 1, "Lucas Carvalho", "Precisou de apoio contínuo para manter o foco e avançar nas etapas propostas.", "2026-05-29T13:10:00", "Usar objetivos curtos e pausas planejadas para apoiar a manutenção do foco."),
          new TherapistNote(22, "0005", 1, "Lucas Carvalho", "Manteve o foco por mais tempo e precisou de menos apoio para avançar.", "2026-10-04T13:10:00", "Ampliar gradualmente o tempo de atividade e observar a necessidade de apoio."),
        ]],
        [2, "Difícil", ["Mãos (Gestos finos)", "Pernas (Deslocamento)"], "Média", "Médio", [
          new TherapistNote(23, "0005", 2, "Rafael Martins", "Coordenou os movimentos com mais segurança e concluiu a sequência.", "2026-09-29T10:00:00", "Introduzir sequências motoras variadas mantendo o ritmo confortável."),
        ]],
        [4, "Difícil", ["Braços (Coordenação ampla)", "Cabeça / Pescoço"], "Média", "Médio", [
          new TherapistNote(24, "0005", 4, "Daniel Ribeiro", "Respondeu às instruções com mais consistência durante o jogo.", "2026-09-18T11:30:00", "Aumentar gradualmente a complexidade das instruções e reforçar respostas consistentes."),
          new TherapistNote(25, "0005", 4, "Beatriz Ferreira", "Finalizou a atividade com suporte verbal pontual.", "2026-07-15T11:30:00"),
        ]],
      ]),
      "Acidente de trânsito",
    ),
  ];
}
