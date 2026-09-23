export const therapistSettings = {
  theme: "auto",
  style: "standart",
  itemsSize: "medium",
  contrast: false,
};

export const patientSettings = {
  theme: "auto",
  style: "standart",
  itemsSize: "medium",
  contrast: false,
  useSymbols: true,
  soundEffects: true,
  voiceInstructions: true,
};

const settingTranslations = {
  theme: {
    light: "Claro",
    dark: "Escuro",
    auto: "Automático",
  },
  style: {
    standart: "Padrão",
    compact: "Reduzido",
    elegant: "Elegante",
  },
  itemsSize: {
    small: "Pequeno",
    medium: "Médio",
    big: "Grande",
  },
  contrast: {
    true: "Ativado",
    false: "Desativado",
  },
  useSymbols: {
    true: "Sim",
    false: "Não",
  },
  soundEffects: {
    true: "Sim",
    false: "Não",
  },
  voiceInstructions: {
    true: "Ativado",
    false: "Desativado",
  },
};

export function translateSetting(setting, value) {
  return settingTranslations[setting]?.[String(value)] ?? value;
}
