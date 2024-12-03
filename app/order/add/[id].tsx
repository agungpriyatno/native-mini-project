import { OrderProductCreate } from "@/components/order-product-create";
import { ProductCreate } from "@/components/product-create";
import { VStack } from "@/components/ui/vstack";
import { useLocalSearchParams } from "expo-router";

export default function AddOrderProductScreen() {
  const { id } = useLocalSearchParams();

  return (
    <VStack className="p-4">
      <OrderProductCreate orderId={id as string}/>
    </VStack>
  );
}
