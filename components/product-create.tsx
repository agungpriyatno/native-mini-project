import { useToaster } from "@/hooks/use-toaster";
import {
  createProduct,
  findProduct,
  updateProduct,
} from "@/lib/actions/product";
import { CreateProductDto, createProductDto } from "@/lib/validators/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
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
import { VStack } from "./ui/vstack";

type ProductCreateProps = {
  id?: string;
};

const ProductCreate = ({ id }: ProductCreateProps) => {
  const toast = useToaster();
  const router = useRouter();

  const fetchDefaultValues = async () => {
    if (!id) return { code: "", name: "", price: 0, category: "" };
    const { data } = await findProduct(id);
    return data;
  };

  const form = useForm<CreateProductDto>({
    resolver: zodResolver(createProductDto),
    defaultValues: fetchDefaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id) await updateProduct(id, data);
      else await createProduct(data);
      toast.success(`Success to ${id ? "update" : "create"} Product`);
      router.back();
    } catch (error) {
      toast.error(`Failed to ${id ? "update" : "create"} Product`);
    }
  });

  return (
    <Card>
      <VStack>
        <Heading>{id ? "Update" : "Create"} Product</Heading>
      </VStack>

      <VStack space="md" className="p-4">
        <FormControl isInvalid={!!errors?.code} className="w-full">
          <FormControlLabel>
            <FormControlLabelText>Code</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="code"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="h-15">
                <InputField
                  placeholder="Enter Code"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="next"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>{errors?.code?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>
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
        <FormControl isInvalid={!!errors?.category} className="w-full">
          <FormControlLabel>
            <FormControlLabelText>Category</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="h-15">
                <InputField
                  placeholder="Enter Category"
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
              {errors?.category?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl isInvalid={!!errors?.price} className="w-full">
          <FormControlLabel>
            <FormControlLabelText>Price</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="h-15">
                <InputField
                  placeholder="Enter Price"
                  value={value?.toString()}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>
              {errors?.price?.message}
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

export { ProductCreate };
