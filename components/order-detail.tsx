import { useOnFocus } from "@/hooks/use-on-focus";
import { findOrder } from "@/lib/actions/order";
import { formatPrice } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link, router } from "expo-router";
import { EditIcon, PlusIcon } from "lucide-react-native";
import { ScrollView } from "react-native";
import { CustomerDelete } from "./customer-delete";
import { OrderProductDelete } from "./order-product-delete";
import { Box } from "./ui/box";
import { Button, ButtonIcon } from "./ui/button";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { OrderDelete } from "./order-delete";

type OrderDetailProps = { id: string };

const OrderDetail = ({ id }: OrderDetailProps) => {
  const fetcher = async () => {
    return await findOrder(id);
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["order-detail", id],
    queryFn: fetcher,
  });

  useOnFocus(refetch);

  return (
    <ScrollView className="space-y-2">
      {data?.data && (
        <>
          <VStack className="mb-3" space="md">
            <Box className="px-3 pt-4">
              <Heading className="" size="lg">
                Order Detail
              </Heading>
            </Box>
            <Card className="gap-4">
              <VStack>
                <Heading>{formatPrice(data.data.total_price || 0)}</Heading>
                <Text>{data.data.id}</Text>
                <Text>
                  {format(new Date(data.data.created_at || ""), "dd MMMM yyyy")}
                </Text>
              </VStack>
              <HStack space="sm" className="justify-end">
                <OrderDelete id={id} onRefetch={() => router.back()} />
              </HStack>
            </Card>
          </VStack>
          <VStack className="mb-3" space="md">
            <Box className="px-3 pt-4">
              <Heading className="" size="lg">
                Customer Detail
              </Heading>
            </Box>
            <Card className="gap-4">
              <VStack>
                <Heading>{data.data.customers.name}</Heading>
                <Text>{data.data.customers.address}</Text>
              </VStack>
            </Card>
          </VStack>
          <VStack className="mb-3" space="md">
            <HStack space="md" className="px-3 pt-4 justify-between">
              <Heading className="flex-1" size="lg">
                Order Products
              </Heading>
              <Link asChild href={`/order/add/${id}`}>
                <Button size={"md"}>
                  <ButtonIcon as={PlusIcon} />
                </Button>
              </Link>
            </HStack>
            {data.data.order_products.map(
              ({ products, quantity, total_price }) => (
                <Card key={products.code} className="gap-4">
                  <VStack space="xs">
                    <Heading>{products.name}</Heading>
                    <Text>{formatPrice(total_price)}</Text>
                    <Text>{quantity} Quantity</Text>
                    <HStack space="sm" className="justify-end">
                      <OrderProductDelete
                        orderId={id}
                        productCode={products.code}
                        onRefetch={refetch}
                      />
                    </HStack>
                  </VStack>
                </Card>
              )
            )}
          </VStack>
        </>
      )}
    </ScrollView>
  );
};

export { OrderDetail };
