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
import { findManyProducts } from "@/lib/actions/product";
import { formatPrice } from "@/lib/utils";
import { ProductDelete } from "./product-delete";

const filterColumns = [
  { label: "Name", value: "name" },
  { label: "Category", value: "category" },
];

const sortColumns = [
  { label: "Name", value: "name" },
  { label: "Category", value: "category" },
  { label: "Created At", value: "created_at" },
  { label: "Updated At", value: "updated_at" },
];

const ProductList = () => {
  const {
    params,
    onFromDateChange,
    onToDateChange,
    onFilterFieldChange,
    onFilterValueChange,
    onSortFieldChange,
    onSortValueChange,
    onPerPageChange,
    onPageChange,
    onReset,
  } = useQueryParams({
    defaultParams: {
      page: 1,
      perPage: 10,
      filter: { field: "name", value: "" },
      sort: { field: "created_at", value: "asc" },
      date: { from: undefined, to: undefined },
    },
  });


  const { data, refetch, isFetching, isRefetching } = useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      return await findManyProducts(params);
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
          <Link href={"/product/create"} asChild>
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
        data.data.map((product) => (
          <Card key={product.code} className="mb-3">
            <VStack>
              <Heading>{product.name}</Heading>
              <Text>{product.category}</Text>
              <Text>{formatPrice(product.price)}</Text>
              <Text>{product.order_products.length} total orders</Text>
            </VStack>
            <HStack space="sm" className="justify-end">
              <Link asChild href={`/product/detail/${product.code}`}>
                <Button size={"md"}>
                <ButtonIcon as={FileSearchIcon} />
                </Button>
              </Link>
              <Link asChild href={`/product/update/${product.code}`}>
                <Button size={"md"}>
                  <ButtonIcon as={EditIcon} />
                </Button>
              </Link>
              <ProductDelete id={product.code} onRefetch={refetch} />
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

export { ProductList };
