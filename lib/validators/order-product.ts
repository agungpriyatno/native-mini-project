import { z } from "zod";

export const createOrderProductDto = z.object({
    productId: z.string().min(1),
    quantity: z.coerce.number(),
    price: z.coerce.number(),
    totalPrice: z.coerce.number(),
})

export type CreateOrderProductDto = z.infer<typeof createOrderProductDto>


