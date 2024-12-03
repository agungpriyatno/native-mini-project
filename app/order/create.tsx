import { CustomerCreate } from "@/components/customer-create";
import { OrderCreate } from "@/components/order-create";
import { VStack } from "@/components/ui/vstack";
import { Box } from "lucide-react-native";
import { ScrollView } from "react-native";

export default function OrderCreateScreen() {
  return (
    <ScrollView className="p-4">
      <OrderCreate/>
      <Box className="h-[100px]"/>
    </ScrollView>
  );
}
