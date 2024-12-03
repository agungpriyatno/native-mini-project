import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Products" }} />
      <Stack.Screen name="create" options={{ title: "Products" }} />
      <Stack.Screen name="update/[id]" options={{ title: "Products" }} />
      <Stack.Screen name="detail/[id]" options={{ title: "Products" }} />
    </Stack>
  );
}
