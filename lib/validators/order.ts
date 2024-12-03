import { z } from "zod";
import { responseDto, responseFindMany } from "./utils";
import { orderDto, customerDto, orderProductDto, productDto } from "./base";



export const createOrderDto = z.object({
  customerId: z.string().min(1),
  totalPrice: z.coerce.number(),
  products: z
    .array(
      z.object({
        productCode: z.string().min(1),
        quantity: z.coerce.number(),
        price: z.coerce.number(),
        totalPrice: z.coerce.number(),
      })
    )
    .min(1),
});

export const updateOrderDto = createOrderDto;

export const findManyOrdersDto = responseFindMany.extend({
  data: z.array(orderDto.extend({
    customers: customerDto,
    order_products: z.array(
      orderProductDto.extend({
        products: productDto,
      })
    )
  })),
})
export const findOrderDto = responseDto.extend({
  data: orderDto.extend({
    customers: customerDto,
    order_products: z.array(
      orderProductDto.extend({
        products: productDto,
      })
    ),
  }),
});

export type CreateOrderDto = z.infer<typeof createOrderDto>;
export type UpdateOrderDto = z.infer<typeof updateOrderDto>;
export type OrderDto = z.infer<typeof orderDto>;
