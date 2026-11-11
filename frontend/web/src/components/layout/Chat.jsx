import Panel from "../ui/Panel";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Icon from "../ui/Icon";
import ChatCard from "../ui/ChatCard";
import AI from "../../assets/icons/ai.svg";
import closeIcon from "../../assets/icons/remove.svg";
import add from "../../assets/icons/add.svg";
import search from "../../assets/icons/search.svg";
import pin from "../../assets/icons/pin.svg";
import mic from "../../assets/icons/mic.svg";
import send from "../../assets/icons/send.svg";

export default function Chat() {
  return (
    <aside className="hidden flex flex-col justify-between p-6 bg-(--chat) border-l border-(--chat-border) min-w-100 h-full">
        <div className="flex flex-col gap-4">
            <header className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <span className="flex justify-center items-center rounded-xl p-2.5 bg-(--transparent)">
                        <Icon src={AI} size={20} color="var(--link)" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-(--primary) text-lg font-bold">Assistente IA</h2>
                        <span className="text-(--link) text-[10px] font-semibold">EXPERIMENTAL</span>
                    </div>
                </div>
                <Button size="square" icon={closeIcon} />
            </header>
            <section className="flex flex-col gap-1">
                <h2 className="text-[21px] text-primary font-bold">Como posso ajudar?</h2>
                <span className="text-[13px] text-(--secondary)">Comece uma conversa ou retome um assunto.</span>
            </section>
            <Button type="primary" icon={add}>Nova conversa</Button>
            <section className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm text-(--primary) font-bold">Conversas recentes</h3>
                        <span className="text-[11px] text-(--secondary)">Histórico ilustrativo</span>
                    </div>
                    <span className="inline-flex items-center justify-center rounded-md bg-(--transparent) h-6 w-6 shrink-0 text-[11px] text-(--link) font-semibold">3{/* Número de chats */}</span>
                </div>
                <Input
                    icon={search}
                    placeholder="Buscar conversas..."
                />
                <div className="flex flex-col gap-2">
                    <ChatCard
                        title="Resumo do acompanhamento"
                        subtitle="Memória Visual e Labirinto Motor"
                    />
                </div>
            </section>
        </div>
        <div className="flex flex-col gap-2.5">
            <Panel className="flex flex-col gap-2.5 rounded-[14px] p-3.5">
                <h4 className="text-[10px] text-(--link) font-semibold">NOVA CONVERSA</h4>
                <textarea
                    className="text-sm text-(--text) placeholder-(--secondary) outline-0 resize-none h-12 shrink-0"
                    placeholder="Escreva sua mensagem..."
                />
                <div className="flex items-center gap-2">
                    <Button type="transparent" size="extra-small" icon={pin}>Anexar</Button>
                    <Button type="transparent" size="extra-small" icon={mic}>Áudio</Button>
                    <Button className="w-full" type="primary" size="small" icon={send}>Enviar</Button>
                </div>
            </Panel>
            <span className="text-[11px] text-(--secondary)">Revise as respostas antes de utilizá-las no registro clínico.</span>
        </div>
    </aside>
  )
}