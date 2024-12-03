import { useQueryParams } from "@/hooks/use-query-params";
import { findRecap } from "@/lib/actions/recap";
import { formatPrice } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { SelectCustomer } from "./select-customer";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";

import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import { useState } from "react";
import { Button, ButtonText } from "./ui/button";
const Recap = () => {
  const [openStartDate, setOpenStartDate] = useState(false)
  const [openEndDate, setOpenEndDate] = useState(false)

  const {
    params,
    onFilterFieldChange,
    onFilterValueChange,
    onSortFieldChange,
    onSortValueChange,
    onPerPageChange,
    onPageChange,
    onReset,
    onFromDateChange,
    onToDateChange,
  } = useQueryParams({
    defaultParams: {
      page: 1,
      perPage: 10,
      filter: { field: "customer_id", value: "" },
      sort: { field: "customer_id", value: "asc" },
      date: { from: undefined, to: undefined },
    },
  });
  const fetcher = async () => {
    return await findRecap(params);
  };

  const { data, refetch, isFetching, isRefetching, error } = useQuery({
    queryKey: ["recap", params],
    queryFn: fetcher,
  });

  return (
    <Card className="gap-5">
      <Heading>RECAP</Heading>
      <VStack className="gap-4">
        <HStack>
          <SelectCustomer
            value={params.sort.value}
            onChange={(val) => {
              onSortValueChange(val.id);
            }}
          />
        </HStack>
        <Button variant="outline" className=" justify-start h-14" onPress={() => setOpenStartDate(true)}>
          <ButtonText>{params.date.from ? format(new Date(params.date.from), 'dd MMMM yyyy') : "From Date"}</ButtonText>
        </Button>
        <Button variant="outline" className=" justify-start h-14" onPress={() => setOpenEndDate(true)}>
          <ButtonText>{params.date.to ? format(new Date(params.date.to), 'dd MMMM yyyy') : "From Date"}</ButtonText>
        </Button>
        {openStartDate && <DateTimePicker mode="date" value={new Date()} onChange={(e) => {
          onFromDateChange(format(e.nativeEvent.timestamp, 'yyyy-MM-dd') + " 00:00:00")
          setOpenStartDate(false)
        }} />}
        {openEndDate && <DateTimePicker mode="date" value={new Date()} onChange={(e) => {
          onToDateChange(format(e.nativeEvent.timestamp, 'yyyy-MM-dd') + " 23:59:00")
          setOpenEndDate(false)
        }} />}
        <Heading>{formatPrice(data?.data.total_price || 0)}</Heading>
      </VStack>
    </Card>
  );
};

export { Recap };
