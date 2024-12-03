import { ProductCreate } from "@/components/product-create";
import { VStack } from "@/components/ui/vstack";
import { useLocalSearchParams } from "expo-router";

export default function ProductUpdateScreen() {
    const { id } = useLocalSearchParams();
  return (
    <VStack className="p-4">
      <ProductCreate id={id as string}/>
    </VStack>
  );
}
