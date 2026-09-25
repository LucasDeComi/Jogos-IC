const difficulties = ["Fácil", "Médio", "Difícil"];

export default function DifficultySelect({ value, onChange }) {
  return (
    <div className="flex w-full gap-1 rounded-lg bg-(--background) p-1">
      {difficulties.map((difficulty) => {
        const selected = value === difficulty;

        return (
          <button
            key={difficulty}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(difficulty)}
            className={`flex-1 rounded-md py-2 text-[13px] transition-colors ${selected ? "font-semibold" : "font-normal"}`}
            style={{
              backgroundColor: selected
                ? "var(--difficulty-button)"
                : "transparent",
              color: selected
                ? "var(--difficulty-text)"
                : "var(--secondary)",
            }}
          >
            {difficulty}
          </button>
        );
      })}
    </div>
  );
}