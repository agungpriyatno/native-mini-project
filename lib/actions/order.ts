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
import {
    findManyProductsDto
} from "../validators/product";
import {
    queryParamsDto,
    QueryParamsDto,
    responseDto,
} from "../validators/utils";

const baseUrl = "http://192.168.1.5:8001/api/orders";

export const findOrder = async (id: string) => {
  const resp = await axios.get(`${baseUrl}/${id}`);
  try {
    const data = findOrderDto.parse(resp.data);
    return data;
  } catch (error) {
    return {
      message: "Order not found",
      data: null,
    };
  }
};

export const findManyOrder = async (payload: QueryParamsDto) => {
  const validated = queryParamsDto.parse(payload);
  const params = exchangeQueryParams(validated);
  const resp = await axios.get(`${baseUrl}`, { params });  
  const data = findManyOrdersDto.parse(resp.data);

  return data;
};

export const createOrder = async (payload: CreateOrderDto) => {
  const validated = createOrderDto.parse(payload);
  const body = {
    customer_id: validated.customerId,
    total_price: validated.totalPrice,
    products: validated.products.map((product) => ({
      product_code: product.productCode,
      quantity: product.quantity,
    })),
  }
  const resp = await axios.post(`${baseUrl}`, body, {
    headers: { "Content-Type": "'application/json;charset=utf-8'" },
  });
  const data = responseDto.parse(resp.data);
  return data;
};


export const deleteOrder = async (id: string) => {
  const resp = await axios.delete(`${baseUrl}/${id}`);
  const data = responseDto.parse(resp.data);
  return data;
};
