import { Recap } from "@/components/recap";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="h-full container p-5">
      <VStack space="md">
        <Recap/>
        <Card>
          <Heading>Customers</Heading>
          <VStack space="md">
            <Text>Customer Master</Text>
            <Link asChild href={"/customer"}>
              <Button>
                <ButtonText>Go Here</ButtonText>
              </Button>
            </Link>
          </VStack>
        </Card>
        <Card>
          <Heading>Product</Heading>
          <VStack space="md">
            <Text>Product Master</Text>
            <Link asChild href={"/product"}>
              <Button>
                <ButtonText>Go Here</ButtonText>
              </Button>
            </Link>
          </VStack>
        </Card>
        <Card>
          <Heading>Orders</Heading>
          <VStack space="md">
            <Text>Order Management</Text>
            <Link asChild href={"/order"}>
              <Button>
                <ButtonText>Go Here</ButtonText>
              </Button>
            </Link>
          </VStack>
        </Card>

      </VStack>
    </SafeAreaView>
  );
}
