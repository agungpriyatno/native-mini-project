import axios from "axios";
import { fetcher } from "../fetcher";
import {
  createCustomerDto,
  CreateCustomerDto,
  findCustomerDto,
  findManyCustomersDto,
  updateCustomerDto,
  UpdateCustomerDto,
} from "../validators/customer";
import {
  queryParamsDto,
  QueryParamsDto,
  responseDto,
} from "../validators/utils";
import { exchangeQueryParams } from "../utils";

const baseUrl = "http://192.168.1.5:8001/api/customers";

export const findCustomer = async (id: string) => {
  const resp = await axios.get(`${baseUrl}/${id}`);
    const data = findCustomerDto.parse(resp.data);
    return data;
};

export const findManyCustomers = async (payload: QueryParamsDto) => {
  const validated = queryParamsDto.parse(payload);
  const params = exchangeQueryParams(validated);
  const resp = await axios.get(`${baseUrl}`, { params });
  const data = findManyCustomersDto.parse(resp.data);
  return data;
};

export const createCustomer = async (payload: CreateCustomerDto) => {
  const { name, address, gender } = createCustomerDto.parse(payload);
  const resp = await axios.post(
    `${baseUrl}`,
    { name, address, gender },
    { headers: { "Content-Type": "'application/json;charset=utf-8'" } }
  );
  const data = findCustomerDto.parse(resp.data);
  return data;
};

export const updateCustomer = async (
  id: string,
  payload: UpdateCustomerDto
) => {
  const { name, address, gender } = createCustomerDto.parse(payload);
  const resp = await axios.put(
    `${baseUrl}/${id}`,
    { name, address, gender },
    { headers: { "Content-Type": "'application/json;charset=utf-8'" } }
  );
  const data = responseDto.parse(resp.data);
  return data;
};

export const deleteCustomer = async (id: string) => {
  const resp = await axios.delete(`${baseUrl}/${id}`);
  const data = responseDto.parse(resp.data);
  return data;
};
