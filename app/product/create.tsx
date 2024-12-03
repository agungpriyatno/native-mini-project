import { ProductCreate } from "@/components/product-create";
import { VStack } from "@/components/ui/vstack";

export default function ProductCreateScreen() {
  return (
    <VStack className="p-4">
      <ProductCreate/>
    </VStack>
  );
}
