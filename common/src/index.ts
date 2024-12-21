import zod from "zod";

export const urlSchema = zod.object({
    "key": zod.string(),
    "url": zod.string(),
    "verified": zod.boolean()
})

export const urlInputSchema = zod.object({
    "url": zod.string()
})

export type UrlSchema = zod.infer<typeof urlSchema>;
export type UrlInputSchema = zod.infer<typeof urlInputSchema>;