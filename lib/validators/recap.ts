import { z } from "zod";
import { recapDto } from "./base";
import { responseDto } from "./utils";

export const findRecapDto = responseDto.extend({
    data: recapDto
})

export type FindRecapDto = z.infer<typeof findRecapDto>