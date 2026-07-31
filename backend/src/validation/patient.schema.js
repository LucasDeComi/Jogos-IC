import { z } from "zod"

const patientSchema = {
    updateSettings: z.object({
        theme: z.enum(["light", "dark", "auto"]).optional(),
        style: z.enum(["standard", "compact", "elegant"]).optional(),
        contrast: z.boolean().optional(),
        useSymbols: z.boolean().optional(),
        itemsSize: z.enum(["small", "medium", "big"]).optional()
    })
}

export default patientSchema;