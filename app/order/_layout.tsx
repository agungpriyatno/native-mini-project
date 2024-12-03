import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Orders" }} />
      <Stack.Screen name="create" options={{ title: "Orders" }} />
      <Stack.Screen name="update/[id]" options={{ title: "Orders" }} />
      <Stack.Screen name="detail/[id]" options={{ title: "Orders" }} />
      <Stack.Screen name="add/[id]" options={{ title: "Order Product" }} />
    </Stack>
  );
}
