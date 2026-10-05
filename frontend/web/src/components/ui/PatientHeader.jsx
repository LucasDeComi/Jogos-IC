import BackLink from "./BackLink"
import PatientBadge from "./PatientBadge"
import Title from "./Title"
import Description from "./Description"
import Button from "./Button"


export default function PatientHeader({
    title,
    description,
    backLinkTitle = "Voltar",
    backLinkPath,
    button = null,
    patient
}) {
  return (
    <>
        <div className="flex justify-between items-center w-full">
            <BackLink to={backLinkPath}>{backLinkTitle}</BackLink>
            <PatientBadge patient={patient} />
        </div>
        <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-2">
                <Title>{title}</Title>
                <Description>{description}</Description>
            </div>
            { button && <Button type="primary" icon={button.icon} onClick={button.onClick}>{button.text}</Button> }
        </div>
        <hr />
    </>
  )
}