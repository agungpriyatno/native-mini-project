import { z } from "zod";
import { responseDto, responseFindMany } from "./utils";
import { productDto, orderProductDto, orderDto } from "./base";

export const createProductDto = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.coerce.number(),
});

export const updateProductDto = createProductDto;

export const findProductDto = responseDto.extend({
  data: productDto.extend({
    order_products: z.array(orderProductDto.extend({
      orders: orderDto,
    })),
  }),
});

export const findManyProductsDto = responseFindMany.extend({
  data: z.array(productDto.extend({
    order_products: z.array(orderProductDto.extend({
      orders: orderDto,
    })),
  })),
});


export type CreateProductDto = z.infer<typeof createProductDto>;
export type UpdateProductDto = z.infer<typeof updateProductDto>;
export type FindProductDto = z.infer<typeof findProductDto>;
export type FindManyProductsDto = z.infer<typeof findManyProductsDto>;
