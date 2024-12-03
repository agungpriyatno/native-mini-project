import { findCustomer } from "@/lib/actions/customer";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { Card } from "./ui/card";
import { VStack } from "./ui/vstack";
import { Heading } from "./ui/heading";
import customer from "@/app/customer";
import { Text } from "./ui/text";
import { HStack } from "./ui/hstack";
import { Link } from "expo-router";
import { Button, ButtonIcon } from "./ui/button";
import { CustomerDelete } from "./customer-delete";
import { EditIcon, FileSearchIcon } from "lucide-react-native";
import { Box } from "./ui/box";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { Divider } from "./ui/divider";

type CustomerDetailProps = { id: string };

const CustomerDetail = ({ id }: CustomerDetailProps) => {
  const isFocused = useIsFocused();
  const fetcher = async () => {
    return await findCustomer(id);
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["customer-detail", id],
    queryFn: fetcher,
  });

  useEffect(() => {
    if (isFocused) refetch();
  }, [isFocused]);

  return (
    <ScrollView>
      <VStack className="mb-3" space="md">
        <Box className="px-3 pt-4">
          <Heading className="" size="lg">
            Customer Detail
          </Heading>
        </Box>
        <Card className="gap-4">
          <VStack>
            <Heading>{data?.data.name}</Heading>
            <Text>{data?.data.gender == "MALE" ? "Male" : "Female"}</Text>
            <Text>{data?.data.address}</Text>
            <Text>{data?.data.orders.length} total orders</Text>
          </VStack>
          <HStack space="sm" className="justify-end">
            <Link asChild href={`/customer/update/${id}`}>
              <Button size={"md"}>
                <ButtonIcon as={EditIcon} />
              </Button>
            </Link>
            <CustomerDelete id={id} onRefetch={refetch} />
          </HStack>
        </Card>
      </VStack>
      <VStack className="mb-3" space="md">
        <Box className="px-3 pt-4">
          <Heading className="" size="lg">
            Order History
          </Heading>
        </Box>
        {data?.data.orders.map((order) => (
          <Card key={order.id} className="gap-4">
            <VStack>
              <Heading>{formatPrice(order.total_price)}</Heading>
              <Text>{format(new Date(order.created_at), "dd MMMM yyyy")}</Text>
            </VStack>

            <VStack className=" rounded p-3" space="md">
              <Heading size="sm">Ordered Items ({order.order_products.length})</Heading>
              <Divider />
              {order.order_products.map(
                ({ products, quantity, total_price }) => (
                  <VStack key={products.code} space="sm">
                    <Heading size="xs">
                      {products.name} ({quantity})
                    </Heading>
                    <Text>{formatPrice(total_price)}</Text>
                    <Divider />
                  </VStack>
                )
              )}
            </VStack>
          </Card>
        ))}
      </VStack>
    </ScrollView>
  );
};

export { CustomerDetail };
