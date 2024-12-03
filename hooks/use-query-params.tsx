import { QueryParamsDto } from "@/lib/validators/utils";
import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export type TextInputEvent = NativeSyntheticEvent<TextInputChangeEventData>;

type QueryParamsProps = {
  defaultParams: QueryParamsDto;
};

export const useQueryParams = ({ defaultParams }: QueryParamsProps) => {
  const [params, setParams] = useState<QueryParamsDto>(defaultParams);

  const onFilterFieldChange = (field: string) => {
    const value = params.filter.value;
    setParams({ ...params, page: 1, filter: { field, value } });
  };
  const onFilterValueChange = (e: TextInputEvent) => {
    const value = e.nativeEvent.text;
    const field = params.filter.field;
    setParams({ ...params, page: 1, filter: { field, value } });
  };

  const onSortFieldChange = (field: string) => {
    const value = params.sort.value;
    setParams({ ...params, page: 1, sort: { field, value } });
  };

  const onSortValueChange = (value: string) => {
    const field = params.sort.field;
    setParams({ ...params, page: 1, sort: { field, value: value } });
  };

  const onPageChange = (page: number) => {
    setParams({ ...params, page });
  };

  const onPerPageChange = (perPage: string | number) => {
    const value = typeof perPage === "number" ? perPage : parseInt(perPage);
    setParams({ ...params, perPage: value, page: 1 });
  };

  const onReset = () => {
    setParams(defaultParams);
  };

  const onFromDateChange = (from: string) => {
    const to = params.date.to;
    setParams({ ...params, page: 1, date: { from, to } });
  };

  const onToDateChange = (to: string) => {
    const from = params.date.from;
    setParams({ ...params, page: 1, date: { from, to } });
  };

  return {
    params,
    onFilterFieldChange,
    onFilterValueChange,
    onSortFieldChange,
    onSortValueChange,
    onPageChange,
    onPerPageChange,
    onReset,
    onFromDateChange,
    onToDateChange,
  };
};
