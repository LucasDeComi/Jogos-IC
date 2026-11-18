import { profileColorValues as colors } from "../../utils/colors"

export default function PatientBadge({ patient }) {
    const { id, name } = patient;

    return (
        <div className="flex max-w-full min-w-0 items-center gap-2 rounded-full bg-(--transparent) px-3 py-1.5 sm:gap-2.5 sm:px-4">
            <span 
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: colors[(parseInt(id) - 1) % colors.length], fontFamily: '"Onest", "Inter", sans-serif' }}
            >
                {patient.getInitials()}
            </span>
            <span className="truncate text-xs font-bold text-(--title) sm:text-sm">{name} ({id})</span>
        </div>
    )
}