import { ProductDetail } from "@/components/product-detail";
import { useLocalSearchParams } from "expo-router";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  return <ProductDetail id={id as string} />;
}
