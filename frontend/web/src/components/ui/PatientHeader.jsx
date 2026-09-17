import BackLink from "./BackLink"
import PatientBadge from "./PatientBadge"
import Title from "./Title"
import Description from "./Description"


export default function PatientHeader({ title, description, backLinkTitle = "Voltar", backLinkPath, patientName, patientId }) {
  return (
    <>
        <div className="flex justify-between items-center w-full">
            <BackLink to={backLinkPath}>{backLinkTitle}</BackLink>
            <PatientBadge name={patientName} id={patientId} />
        </div>
        <div className="flex flex-col gap-2">
            <Title>{title}</Title>
            <Description>{description}</Description>
        </div>
    </>
  )
}