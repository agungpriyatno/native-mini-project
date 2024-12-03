import { QueryParamsDto } from "./validators/utils";

export const exchangeQueryParams = (payload: QueryParamsDto) => {
  const { page, perPage, filter, sort } = payload;
  return {
    page,
    per_page: perPage,
    filter: { [filter.field]: filter.value },
    sort: { [sort.field]: sort.value },
    start_date: payload?.date?.from,
    end_date: payload?.date?.to,
  };
};

export function formatPrice(price: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(price); 
}
