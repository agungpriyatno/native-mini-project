import { CustomerCreate } from "@/components/customer-create";
import { VStack } from "@/components/ui/vstack";

export default function CustomerCreateScreen() {
  return (
    <VStack className="p-4">
      <CustomerCreate/>
    </VStack>
  );
}
