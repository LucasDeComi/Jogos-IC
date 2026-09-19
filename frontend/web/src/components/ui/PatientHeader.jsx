import BackLink from "./BackLink"
import PatientBadge from "./PatientBadge"
import Title from "./Title"
import Description from "./Description"


export default function PatientHeader({ title, description, backLinkTitle = "Voltar", backLinkPath, patient }) {
  return (
    <>
        <div className="flex justify-between items-center w-full">
            <BackLink to={backLinkPath}>{backLinkTitle}</BackLink>
            <PatientBadge patient={patient} />
        </div>
        <div className="flex flex-col gap-2">
            <Title>{title}</Title>
            <Description>{description}</Description>
        </div>
        <hr />
    </>
  )
}