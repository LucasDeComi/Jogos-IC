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
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <BackLink to={backLinkPath}>{backLinkTitle}</BackLink>
            <PatientBadge patient={patient} />
        </div>
        <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 flex-col gap-2">
                <Title>{title}</Title>
                <Description>{description}</Description>
            </div>
            { button && <Button className="w-full sm:w-auto" type="primary" icon={button.icon} onClick={button.onClick}>{button.text}</Button> }
        </div>
        <hr />
    </>
  )
}