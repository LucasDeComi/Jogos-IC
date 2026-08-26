import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import Button from "../components/ui/Button";
import Title from "../components/ui/Title";
import Panel from "../components/ui/Panel";
import Select from "../components/ui/Select";
import Option from "../components/ui/Option";
import Checkbox from "../components/ui/Checkbox";

export default function PatientSettings() {
  const { id } = useParams();
  const { findPatient, editPatient } = useContext(PatientContext);
  const patient = findPatient(id);

  const [theme, setTheme] = useState(patient.theme);
  const [style, setStyle] = useState(patient.style);
  const [itemsSize, setItemsSize] = useState(patient.itemsSize);
  const [contrast, setContrast] = useState(patient.contrast);
  const [useSymbols, setUseSymbols] = useState(patient.useSymbols);

  const navigate = useNavigate();

  function editSettings() {
    editPatient(id, theme, style, itemsSize, contrast, useSymbols);
    navigate(`/patients/${id}`);
  }

  return (
    <section className="flex flex-col items-start gap-5">
      <div className="relative flex items-center w-full">
        <Button onClick={() => navigate(`/patients/${id}`)}>&larr; Voltar</Button>
        <Title className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          Configurações do paciente
        </Title>
      </div>
      <div className="px-10 w-full">
        <Panel>
          <div className="flex gap-5 items-center w-full px-5 py-3 border-b-2 border-black">
            <span className="text-[16px]">Prontuário: {patient.id}</span>
            <span className="text-lg">|</span>
            <span className="text-[16px]">Nome: {patient.name}</span>
          </div>
          <form className="grid items-center gap-x-25 gap-y-5 grid-cols-2 px-7.5 py-5">
            <Select
              label="Tema de tela"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <Option value="light" compare={patient.theme}>
                Claro
              </Option>
              <Option value="dark" compare={patient.theme}>
                Escuro
              </Option>
              <Option value="auto" compare={patient.theme}>
                Automático
              </Option>
            </Select>
            <Select
              label="Tipo de estilo"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <Option value="standart" compare={patient.style}>
                Padrão
              </Option>
              <Option value="compact" compare={patient.style}>
                Reduzido
              </Option>
              <Option value="elegant" compare={patient.style}>
                Elegante
              </Option>
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
          </form>
        </Panel>
      </div>
      <div className="flex gap-5">
        <Button type="primary" onClick={() => editSettings()}>Salvar alterações</Button>
        <Button onClick={() => navigate(`/patients/${id}`)}>Cancelar</Button>
      </div>
    </section>
  );
}
