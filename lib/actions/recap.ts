import axios from "axios";
import { findRecapDto } from "../validators/recap";
import { queryParamsDto, QueryParamsDto } from "../validators/utils";

const baseUrl = "http://192.168.1.5:8001/api/recap/total-price";

export const findRecap = async (payload: QueryParamsDto) => {
  const validated = queryParamsDto.parse(payload);

  const params: {[key: string]: string} = {};
  if (validated.date.from) {
    params.start_date = validated.date.from;
  }
  if (validated.date.to) {
    params.end_date = validated.date.to;
  }
  if (validated.sort.value.length > 0) {
    params.customer_id = validated.sort.value;
  }

  const resp = await axios.get(`${baseUrl}`, {
    params,
  });
  const data = findRecapDto.parse(resp.data);
 
  return data;
};
