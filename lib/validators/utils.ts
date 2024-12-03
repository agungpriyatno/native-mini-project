import { z } from "zod";

export const queryParamsDto = z.object({
    page: z.number().min(1).default(1),
    perPage: z.number().min(1).max(100).default(10),
    date: z.object({from: z.string().optional(), to: z.string().optional()}),
    filter: z.object({field: z.string(), value: z.string()}).default({field: "name", value: ""}),
    sort: z.object({field: z.string(), value: z.string()}).default({field: "created_at", value: "asc"}),
}) 

export const responseDto = z.object({
    message: z.string(),
})

export const responseFindMany = responseDto.extend({
    total: z.number(),
    per_page: z.number(),
    current_page: z.number(),
    last_page: z.number(),
})

export type QueryParamsDto = z.infer<typeof queryParamsDto>