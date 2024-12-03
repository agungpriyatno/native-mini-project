import { Stack } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";


const queryClient = new QueryClient({});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
      <Stack>
          <Stack.Screen name="index" options={{ title: "Mini Project" }} />
          <Stack.Screen name="customer" options={{ headerShown: false }} />
          <Stack.Screen name="product" options={{ headerShown: false }} />
          <Stack.Screen name="order" options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
