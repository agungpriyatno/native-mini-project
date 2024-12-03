import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Customers" }} />
      <Stack.Screen name="create" options={{ title: "Customers" }} />
      <Stack.Screen name="update/[id]" options={{ title: "Customers" }} />
      <Stack.Screen name="detail/[id]" options={{ title: "Customers" }} />
    </Stack>
  );
}
