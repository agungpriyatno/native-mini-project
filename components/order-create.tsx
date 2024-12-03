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
import { ChevronDownIcon, PlusIcon, Trash2Icon } from "lucide-react-native";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "./ui/button";
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
import { createOrderDto, CreateOrderDto } from "@/lib/validators/order";
import { createOrder } from "@/lib/actions/order";
import { Divider } from "./ui/divider";
import { HStack } from "./ui/hstack";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { SelectProduct } from "./select-product";
import { formatPrice } from "@/lib/utils";
import { SelectCustomer } from "./select-customer";

type OrderCreateProps = {};

const OrderCreate = ({}: OrderCreateProps) => {
  const toast = useToaster();
  const router = useRouter();

  const form = useForm<CreateOrderDto>({
    resolver: zodResolver(createOrderDto),
    defaultValues: {
      customerId: "",
      totalPrice: 0,
      products: [
        {
          productCode: "",
          quantity: 0,
          price: 0,
          totalPrice: 0,
        },
      ],
    },
  });

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = form;

  const { append, fields, remove } = useFieldArray({
    name: "products",
    control: form.control,
  });

  const products = watch("products");

  const onSetTotalPrice = () => {
    const total = products.reduce((acc, item) => acc + item.totalPrice, 0);
    form.setValue("totalPrice", total);
  };

  const onQuantityChange = (index: number, value: number) => {
    form.setValue(
      `products.${index}.totalPrice`,
      products[index].price * value
    );
    onSetTotalPrice();
  };

  const onProductChange = (
    index: number,
    value: { code: string; price: number }
  ) => {
    form.setValue(`products.${index}.price`, value.price);
    form.setValue(
      `products.${index}.totalPrice`,
      value.price * products[index].quantity
    );
    onSetTotalPrice();
  };

  const onAppend = () => {
    append({
      price: 0,
      totalPrice: 0,
      productCode: "",
      quantity: 1,
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createOrder(data);
      toast.success(`Success to create order`);
      router.back();
    } catch (error) {
      toast.error(`Failed to create order`);
    }
  });

  return (
    <Card className="gap-3">
      <VStack>
        <Heading>Create Order</Heading>
      </VStack>
      <VStack space="md">
        <VStack space="md">
          <FormControl
            isInvalid={!!errors.customerId?.message}
            className="w-full"
          >
            <FormControlLabel>
              <FormControlLabelText>Customer</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name={`customerId`}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <HStack space="md">
                  <SelectCustomer
                    value={value}
                    onChange={(val) => {
                      onChange(val.id);
                    }}
                  />
                </HStack>
              )}
            />

            <FormControlError>
              <FormControlErrorText>
               {errors.customerId?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
    
        </VStack>
        <VStack space="md" className="p-4 border rounded">
          <Heading size="md">Product</Heading>
          <Divider />
          {fields.map((field, index) => (
            <VStack key={field.id} space="md">
              <FormControl
                isInvalid={
                  !!errors?.products &&
                  !!errors.products[index]?.productCode?.message
                }
                className="w-full"
              >
                <FormControlLabel>
                  <FormControlLabelText>Product</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  name={`products.${index}.productCode`}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <HStack space="md">
                      <SelectProduct
                        value={value}
                        onChange={(val) => {
                          onChange(val.code);
                          onProductChange(index, val);
                        }}
                      />
                      <Button className="h-14 bg-error-500" onPress={() => remove(index)}>
                        <ButtonIcon as={Trash2Icon} />
                      </Button>
                    </HStack>
                  )}
                />

                <FormControlError>
                  <FormControlErrorText>
                    {!!errors?.products &&
                      errors.products[index]?.productCode?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                isInvalid={
                  !!errors?.products &&
                  !!errors.products[index]?.productCode?.message
                }
                className="w-full"
              >
                <FormControlLabel>
                  <FormControlLabelText>Quantity</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  name={`products.${index}.quantity`}
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
                            onQuantityChange(index, value);
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
                    {!!errors?.products &&
                      errors.products[index]?.productCode?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <HStack className="justify-between">
                <Text>
                  {formatPrice(products[index].price)} x{" "}
                  {products[index].quantity}
                </Text>
                <Text>{formatPrice(products[index].totalPrice)}</Text>
              </HStack>
              <Divider />
            </VStack>
          ))}
          <HStack space="md">
            <Box className="flex-1 bg-primary-50 rounded" />
            <Button className="h-14" onPress={onAppend}>
              <ButtonIcon as={PlusIcon} />
            </Button>
          </HStack>
        </VStack>
        <HStack className="justify-end">
          <Heading>TOTAL : {formatPrice(form.getValues("totalPrice"))}</Heading>
        </HStack>

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

export { OrderCreate };
