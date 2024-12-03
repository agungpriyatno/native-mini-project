import { useOnFocus } from "@/hooks/use-on-focus";
import { useQueryParams } from "@/hooks/use-query-params";
import { findManyCustomers } from "@/lib/actions/customer";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { EditIcon, FileSearchIcon, PlusIcon } from "lucide-react-native";
import { ScrollView } from "react-native";
import { CustomerDelete } from "./customer-delete";
import { FilterDrawer } from "./filter-drawer";
import { Paginator } from "./paginator";
import { Button, ButtonIcon } from "./ui/button";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { findManyOrder } from "@/lib/actions/order";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { OrderDelete } from "./order-delete";

const filterColumns = [{ label: "ID", value: "id" }];

const sortColumns = [
  { label: "ID", value: "id" },
  { label: "Created At", value: "created_at" },
  { label: "Updated At", value: "updated_at" },
];

const OrderList = () => {
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
      filter: { field: "id", value: "" },
      sort: { field: "created_at", value: "asc" },
      date: { from: undefined, to: undefined },
    },
  });

  const { data, refetch, isFetching, isRefetching, error } = useQuery({
    queryKey: ["orders", params],
    queryFn: async () => {
      return await findManyOrder(params);
    },
  });

  const isLoading = isFetching || isRefetching;

  useOnFocus(() => {
    refetch();
  });

  return (
    <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <Card className="mb-3">
        <HStack space="sm">
          <FilterDrawer
            filter={params.filter}
            sort={params.sort}
            sortColumns={sortColumns}
            filterColumns={filterColumns}
            date={{ from: params.date.from, to: params.date.to }}
            onFilterFieldChange={onFilterFieldChange}
            onFilterValueChange={onFilterValueChange}
            onSortFieldChange={onSortFieldChange}
            onSortValueChange={onSortValueChange}
            onReset={onReset}
            onFromDateChange={onFromDateChange}
            onToDateChange={onToDateChange}
          />
          <Link href={"/order/create"} asChild>
            <Button className="h-14 w-14">
              <ButtonIcon as={PlusIcon} />
            </Button>
          </Link>
        </HStack>
      </Card>

      {isLoading && <Text className="text-center">Loading...</Text>}
      {data?.data?.length == 0 && !isLoading && (
        <Text className="text-center">No data</Text>
      )}
      {!!data?.data &&
        !isLoading &&
        data.data.map((order) => (
          <Card key={order.id} className="mb-3 gap-4">
            <VStack>
              <Heading>{formatPrice(order.total_price)}</Heading>
              <Text>{order.customers.name}</Text>
              <Text>{order.id}</Text>
              <Text>{order.order_products.length} items</Text>
              <Text>{format(new Date(order.created_at), "dd MMMM yyyy")}</Text>
            </VStack>
            <HStack space="sm" className="justify-end">
              <Link asChild href={`/order/detail/${order.id}`}>
                <Button size={"md"}>
                  <ButtonIcon as={FileSearchIcon} />
                </Button>
              </Link>
              <OrderDelete id={order.id} onRefetch={refetch} />
            </HStack>
          </Card>
        ))}
      {!isLoading && (
        <Paginator
          page={params.page}
          perPage={params.perPage}
          totalPage={data?.last_page}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      )}
    </ScrollView>
  );
};

export { OrderList };
