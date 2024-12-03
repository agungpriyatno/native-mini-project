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

type CustomerCreateProps = {
  id?: string;
};

const CustomerCreate = ({ id }: CustomerCreateProps) => {
  const toast = useToaster();
  const router = useRouter();

  const fetchDefaultValues = async () => {
    if (!id) return { name: "", address: "", gender: "" };
    const { data } = await findCustomer(id);
    return data;
  };

  const form = useForm<CreateCustomerDto>({
    resolver: zodResolver(createCustomerDto),
    defaultValues: fetchDefaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id) await updateCustomer(id, data);
      else await createCustomer(data);
      toast.success(`Success to ${id ? "update" : "create"} customer`);
      router.back();
    } catch (error) {
      toast.error(`Failed to ${id ? "update" : "create"} customer`);
    }
  });

  return (
    <Card>
      <VStack>
        <Heading>{id ? "Update" : "Create"} Customer</Heading>
      </VStack>
      <VStack space="md" className="p-4">
        <FormControl isInvalid={!!errors?.name} className="w-full">
          <FormControlLabel>
            <FormControlLabelText>Name</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="h-15">
                <InputField
                  placeholder="Enter Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="next"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>{errors?.name?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl isInvalid={!!errors?.address} className="w-full">
          <FormControlLabel>
            <FormControlLabelText>Address</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="address"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="h-15">
                <InputField
                  placeholder="Enter Address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="next"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>
              {errors?.address?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl isInvalid={!!errors?.gender} className="w-full">
          <FormControlLabel>
            <FormControlLabelText>Gender</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="gender"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange}>
                <SelectTrigger
                  variant="outline"
                  size="md"
                  className="h-15 justify-between"
                >
                  <SelectInput placeholder="Select Gender" value={value} />
                  <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Male" value="MALE" />
                    <SelectItem label="Female" value="FEMALE" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            )}
          />
          <FormControlError>
            <FormControlErrorText>
              {errors?.address?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

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

export { CustomerCreate };
