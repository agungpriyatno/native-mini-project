import { CustomerCreate } from "@/components/customer-create";
import { VStack } from "@/components/ui/vstack";
import { useLocalSearchParams } from "expo-router";

export default function CustomerCreateScreen() {
    const { id } = useLocalSearchParams();
  return (
    <VStack className="p-4">
      <CustomerCreate id={id as string}/>
    </VStack>
  );
}
