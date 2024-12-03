import axios from "axios";
import { exchangeQueryParams } from "../utils";
import {
  createOrderDto,
  CreateOrderDto,
  findManyOrdersDto,
  findOrderDto,
  updateOrderDto,
  UpdateOrderDto,
} from "../validators/order";
import { findManyProductsDto } from "../validators/product";
import {
  queryParamsDto,
  QueryParamsDto,
  responseDto,
} from "../validators/utils";
import { createOrderProductDto, CreateOrderProductDto } from "../validators/order-product";

const baseUrl = "http://192.168.1.5:8001/api/order-products";

export const createOrderProduct = async (orderId: string, payload: CreateOrderProductDto) => {
  const validated = createOrderProductDto.parse(payload);
  const body = {
    product_code: validated.productId,
    quantity: validated.quantity,
    price: validated.price,
    total_price: validated.totalPrice
  }
  const resp = await axios.put(`${baseUrl}/${orderId}`, body, {
    headers: { "Content-Type": "'application/json;charset=utf-8'" },
  });

  const data = responseDto.parse(resp.data);
  return data;
};


export const deleteOrderProduct = async (orderId: string, productCode: string) => {
  const resp = await axios.delete(`${baseUrl}/${orderId}/${productCode}`);
  const data = responseDto.parse(resp.data);
  return data;
};
