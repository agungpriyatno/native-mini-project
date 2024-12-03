import { CustomerCreate } from "@/components/customer-create";
import { CustomerDetail } from "@/components/customer-detail";
import { VStack } from "@/components/ui/vstack";
import { useLocalSearchParams } from "expo-router";

export default function CustomerDetailScreen() {
  const { id } = useLocalSearchParams();
  return <CustomerDetail id={id as string} />;
}
