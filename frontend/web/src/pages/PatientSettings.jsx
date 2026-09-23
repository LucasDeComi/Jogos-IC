import { useState, useContext, use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import Swal from "sweetalert2";
import PatientHeader from "../components/ui/PatientHeader";
import PanelTitle from "../components/ui/PanelTitle";
import Button from "../components/ui/Button";
import Panel from "../components/ui/Panel";
import Select from "../components/ui/Select";
import Option from "../components/ui/Option";
import Checkbox from "../components/ui/Checkbox";
import SoundSetting from "../components/ui/SoundSetting";

export default function PatientSettings() {
  const { id } = useParams();
  const { findPatient, editPatient } = useContext(PatientContext);
  const patient = findPatient(id);

  const [theme, setTheme] = useState(patient.theme);
  const [style, setStyle] = useState(patient.style);
  const [itemsSize, setItemsSize] = useState(patient.itemsSize);
  const [contrast, setContrast] = useState(patient.contrast);
  const [useSymbols, setUseSymbols] = useState(patient.useSymbols);
  const [soundEffects, setSoundEffects] = useState(patient.soundEffects);
  const [voiceInstructions, setVoiceInstructions] = useState(patient.voiceInstructions);

  const navigate = useNavigate();

  function editSettings() {
    editPatient(id, theme, style, itemsSize, contrast, useSymbols, soundEffects, voiceInstructions);
    navigate(`/app/patients/${id}`);
    Swal.fire({
      title: "Configurações editadas com sucesso!",
      icon: "success",
      background: "var(--panel)",
      color: "var(--text)",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      customClass: {
        popup: "swal2-toast",
      },
    });
  }

  return (
    <section className="flex flex-col items-start gap-5">
      <PatientHeader
        title="Configurações do paciente"
        description="Ajuste o comportamento do sistema de jogos para este paciente específico"
        backLinkPath={`/app/patients/${id}`}
        patient={patient}
      />
      <section className="flex gap-8 w-full">
        <Panel className="flex flex-col gap-5 px-8 py-7 w-full">
          <PanelTitle>Exibição e Layout</PanelTitle>
          <div className="grid gap-5 grid-cols-2">
            <Select
              label="Tema de tela"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <Option value="light">Claro</Option>
              <Option value="dark">Escuro</Option>
              <Option value="auto">Automático</Option>
            </Select>
            <Select
              label="Tamanho dos itens"
              value={itemsSize}
              onChange={(e) => setItemsSize(e.target.value)}
            >
              <Option value="small">Pequeno</Option>
              <Option value="medium">Médio</Option>
              <Option value="big">Grande</Option>
            </Select>
            <Select
              label="Tipo de estilo"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <Option value="standart">Padrão</Option>
              <Option value="compact">Reduzido</Option>
              <Option value="elegant">Elegante</Option>
            </Select>
            <Checkbox
              label="Alto contraste"
              checked={contrast}
              onChange={(e) => setContrast(e.target.checked)}
            />
            <Checkbox
              label="Utilizar símbolos"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
            />
          </div>
        </Panel>
        <Panel className="flex flex-col gap-5 px-8 py-7 w-full">
          <PanelTitle>Áudio e Comandos</PanelTitle>
            <SoundSetting
              title="Sons dos jogos"
              description="Define se os efeitos sonoros dos jogos estarão habilitados durante a sessão."
              label="Habilitar efeitos sonoros"
              checked={soundEffects}
              onChange={e => setSoundEffects(e.target.checked)}
            />
            <SoundSetting
              title="Orientações por voz"
              description="Lê em voz alta as instruções, comandos e mensagens importantes para ajudar durante os jogos."
              label="Ativar orientações por voz"
              checked={voiceInstructions}
              onChange={e => setVoiceInstructions(e.target.checked)}
            />
        </Panel>
      </section>
      <div className="flex gap-5">
        <Button type="primary" onClick={() => editSettings()}>
          Salvar alterações
        </Button>
        <Button onClick={() => navigate(`/app/patients/${id}`)}>
          Cancelar
        </Button>
      </div>
    </section>
  );
}
