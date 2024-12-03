import axios from "axios";
import { exchangeQueryParams } from "../utils";
import {
  createProductDto,
  CreateProductDto,
  findManyProductsDto,
  findProductDto,
  updateProductDto,
  UpdateProductDto,
} from "../validators/product";
import {
  queryParamsDto,
  QueryParamsDto,
  responseDto,
} from "../validators/utils";

const baseUrl = "http://192.168.1.5:8001/api/products";

export const findProduct = async (id: string) => {
  const resp = await axios.get(`${baseUrl}/${id}`);
  // return resp.data as FindProductDto;
  try {
    const data = findProductDto.parse(resp.data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const findManyProducts = async (payload: QueryParamsDto) => {
  const validated = queryParamsDto.parse(payload);
  const params = exchangeQueryParams(validated);
  const resp = await axios.get(`${baseUrl}`, { params });
  const data = findManyProductsDto.parse(resp.data);
  return data;
};

export const createProduct = async (payload: CreateProductDto) => {
  const validated = createProductDto.parse(payload);
  const resp = await axios.post(`${baseUrl}`, validated, {
    headers: { "Content-Type": "'application/json;charset=utf-8'" },
  });
  const data = responseDto.parse(resp.data);
  return data;
};

export const updateProduct = async (id: string, payload: UpdateProductDto) => {
  const validated = updateProductDto.parse(payload);
  const resp = await axios.put(`${baseUrl}/${id}`, validated, {
    headers: { "Content-Type": "'application/json;charset=utf-8'" },
  });
  const data = responseDto.parse(resp.data);
  return data;
};

export const deleteProduct = async (id: string) => {
  const resp = await axios.delete(`${baseUrl}/${id}`);
  const data = responseDto.parse(resp.data);
  return data;
};
