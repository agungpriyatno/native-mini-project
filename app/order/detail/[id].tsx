import { OrderDetail } from "@/components/order-detail";
import { useLocalSearchParams } from "expo-router";

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  return <OrderDetail id={id as string} />;
}
