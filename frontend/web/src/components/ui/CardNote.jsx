export default function CardNote({ dateTime = new Date(), children }) {
    const formatter = new Intl.DateTimeFormat('pt-BR');
    const date = formatter.format(dateTime);
    const time = `${String(dateTime.getHours()).padStart(2, "0")}:${String(dateTime.getMinutes()).padStart(2, "0")}`;

    return (
        <div className="flex flex-col gap-2">
            <h4 className="text-[13px] text-(--text-black) font-bold">{date} às {time}</h4>
            <span className="text-[13px] text-[#718096]">{children}</span>
        </div>
    )
}