import { z } from "zod";

export const customerDto = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  address: z.string().min(1),
  gender: z.string().min(1),
  updated_at: z.string().min(1),
  created_at: z.string().min(1),
});

export const orderProductDto = z.object({
  order_id: z.string().min(1),
  product_code: z.string().min(1),
  quantity: z.number(),
  total_price: z.number(),
  updated_at: z.string().min(1),
  created_at: z.string().min(1),
});

export const orderDto = z.object({
  id: z.string().min(1),
  customer_id: z.string().min(1),
  total_price: z.number(),
  created_at: z.string().min(1),
  updated_at: z.string().min(1),
});

export const productDto = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.number(),
  created_at: z.string().min(1),
  updated_at: z.string().min(1),
});

export const recapDto = z.object({
  total_price: z.number(),
  total_transaction: z.number(),
  total_quantity: z.number(),
})
