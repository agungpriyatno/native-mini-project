import { useToaster } from "@/hooks/use-toaster";
import {
  createCustomer,
  findCustomer,
  updateCustomer,
} from "@/lib/actions/customer";
import {
  CreateCustomerDto,
  createCustomerDto,
} from "@/lib/validators/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { ChevronDownIcon } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Button, ButtonSpinner, ButtonText } from "./ui/button";
import { Card } from "./ui/card";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "./ui/form-control";
import { Heading } from "./ui/heading";
import { Input, InputField } from "./ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "./ui/select";
import { VStack } from "./ui/vstack";
import {
  CreateOrderProductDto,
  createOrderProductDto,
} from "@/lib/validators/order-product";
import { createOrderProduct } from "@/lib/actions/order-product";
import { HStack } from "./ui/hstack";
import { SelectProduct } from "./select-product";
import { formatPrice } from "@/lib/utils";
import { Text } from "./ui/text";

type OrderProductCreateProps = {
  orderId: string;
};

const OrderProductCreate = ({ orderId }: OrderProductCreateProps) => {
  const toast = useToaster();
  const router = useRouter();

  const form = useForm<CreateOrderProductDto>({
    resolver: zodResolver(createOrderProductDto),
    defaultValues: {
      productId: undefined,
      quantity: 0,
      price: 0,
      totalPrice: 0,
    },
  });

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = form;

  const field = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createOrderProduct(orderId, data);
      toast.success(`Success to create order product`);
      router.back();
    } catch (error) {
      console.log(error);
      toast.error(`Failed to create order product`);
    }
  });

  return (
    <Card>
      <VStack>
        <Heading>Create Order Product</Heading>
      </VStack>
      <VStack space="md" className="p-4">
        <VStack space="md">
          <FormControl isInvalid={!!errors.productId} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Product</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name={"productId"}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <HStack className="h-14">
                  <SelectProduct
                  value={value}
                  onChange={(val) => {
                    onChange(val.code);
                    form.setValue("price", val.price);
                    form.setValue("totalPrice", val.price * field.quantity);
                  }}
                />
                </HStack>
              )}
            />

            <FormControlError>
              <FormControlErrorText>
                {errors.productId?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={!!errors?.quantity} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Quantity</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name={`quantity`}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <HStack space="md">
                  <Input className="h-15 flex-1">
                    <InputField
                      placeholder="Enter Quantity"
                      value={value.toString()}
                      onChangeText={(val) => {
                        const value = val === "" ? 0 : parseInt(val);
                        onChange(value);
                        form.setValue("totalPrice", value * field.price);
                      }}
                      onBlur={onBlur}
                      keyboardType="numeric"
                      returnKeyType="next"
                      autoCapitalize="none"
                    />
                  </Input>
                </HStack>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors?.quantity?.message} 
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <HStack className="justify-between">
            <Text>
              {formatPrice(field.price)} x {field.quantity}
            </Text>
            <Text>{formatPrice(field.totalPrice)}</Text>
          </HStack>
        </VStack>

        <Button
          onPress={onSubmit}
          size="lg"
          disabled={isLoading || isSubmitting}
        >
          {isSubmitting && <ButtonSpinner />}
          <ButtonText>SUBMIT</ButtonText>
        </Button>
      </VStack>
    </Card>
  );
};

export { OrderProductCreate };
