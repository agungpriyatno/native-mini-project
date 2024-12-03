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
import { findProduct } from "@/lib/actions/product";

type ProductDetailProps = { id: string };

const ProductDetail = ({ id }: ProductDetailProps) => {
  const isFocused = useIsFocused();
  const fetcher = async () => {
    return await findProduct(id);
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["product-detail", id],
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
            Product Detail
          </Heading>
        </Box>
        <Card className="gap-4">
          <VStack>
            <Heading>{data?.data.name}</Heading>
            <Text>{formatPrice(data?.data.price || 0)}</Text>
            <Text>{data?.data.code}</Text>
            <Text>{data?.data.order_products.length} total orders</Text>
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
        {data?.data.order_products.map((order) => (
          <Card key={order.product_code} className="gap-4">
            <VStack>
              <Heading>{formatPrice(order.total_price)} ({[order.quantity]})</Heading>
              <Text>{order.orders.id}</Text>
              <Text>{format(new Date(order.created_at), "dd MMMM yyyy")}</Text>
              <Text>{order.quantity} items</Text>
            </VStack>
          </Card>
        ))}
      </VStack>
    </ScrollView>
  );
};

export { ProductDetail };
