import User from "../../utils/User"
import { profileColors as colors } from "../../utils/colors"

export default function PatientBadge({ name, id }) {
    const patient = new User(name);

    return (
        <div className="flex px-4 py-1.5 gap-2.5 rounded-full bg-[#E6F4F4]">
            <span 
                className="flex justify-center items-center w-6 h-6 rounded-full text-white text-[10px] font-bold"
                style={{ backgroundColor: colors[(parseInt(id) - 1) % colors.length], fontFamily: '"Onest", "Inter", sans-serif' }}
            >
                {patient.getInitials()}
            </span>
            <span className="text-sm text-(--primary) font-bold">{name} ({id})</span>
        </div>
    )
}