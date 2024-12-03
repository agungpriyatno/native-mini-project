import { z } from "zod";
import { responseDto, responseFindMany } from "./utils";
import { customerDto, orderDto, orderProductDto, productDto } from "./base";


export const createCustomerDto = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  gender: z.string().min(1),
});

export const updateCustomerDto = createCustomerDto;

export const findCustomerDto = responseDto.extend({
  data: customerDto.extend({
    orders: z.array(
      orderDto.extend({
        order_products: z.array(
          orderProductDto.extend({
            products: productDto,
          })
        ),
      })
    ),
  }),
});

export const findManyCustomersDto = responseFindMany.extend({
  data: z.array(customerDto),
});

export type CustomerDto = z.infer<typeof customerDto>;
export type CreateCustomerDto = z.infer<typeof createCustomerDto>;
export type UpdateCustomerDto = z.infer<typeof updateCustomerDto>;
export type FindCustomerDto = z.infer<typeof findCustomerDto>;
