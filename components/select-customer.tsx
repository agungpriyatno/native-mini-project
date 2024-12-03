import { ShareIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Button, ButtonIcon, ButtonText } from "./ui/button";
import { Input, InputField } from "./ui/input";
import {
  Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
} from "./ui/popover";
import { findManyProducts, findProduct } from "@/lib/actions/product";
import { useQuery } from "@tanstack/react-query";
import { Pressable } from "./ui/pressable";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { Heading } from "./ui/heading";
import { z } from "zod";
import { customerDto, productDto } from "@/lib/validators/base";
import { Divider } from "./ui/divider";
import { findCustomer, findManyCustomers } from "@/lib/actions/customer";

type SelectCustomerProps = {
  value?: string;
  onChange: (data: z.infer<typeof customerDto>) => void;
};

const SelectCustomer = ({ onChange, value }: SelectCustomerProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fetcher = async () => {
    try {
      const { data } = await findManyCustomers({
        page: 1,
        perPage: 10,
        filter: { field: "name", value: search },
        sort: { field: "name", value: "asc" },
        date: { from: undefined, to: undefined },
      });
      return data;
    } catch (error) {
      return [];
    }
  };

  const { data, isFetching, isRefetching } = useQuery({
    queryKey: ["select-customers", search],
    queryFn: fetcher,
    enabled: isOpen,
    initialData: [],
  });

  const detail = useQuery({
    queryKey: ["customer-detail", value],
    queryFn: async () => {
      if (!value) return null;
      return await findCustomer(value);
    }
  })

  const isLoading = isFetching || isRefetching;

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (product: z.infer<typeof customerDto>) => {
    onChange(product);
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      placement="bottom"
      size="md"
      trigger={(triggerProps) => {
        return (
          <Button {...triggerProps} variant="outline" className="flex-1 justify-start h-14">
            <ButtonText className="text-left">{detail.data ? detail.data.data.name : "Select customer"}</ButtonText>
          </Button>
        );
      }}
    >
      <PopoverBackdrop />
      <PopoverContent className={" min-w-[400px] max-w-[400px]"}>
        <PopoverHeader>
          <Input className="w-full h-14">
            <InputField
              placeholder="Search for a customer"
              defaultValue={search}
              onChange={(e) => setSearch(e.nativeEvent.text)}
            />
          </Input>
        </PopoverHeader>
        <PopoverBody contentContainerClassName="px-3 gap-3">
          <VStack space="lg" className="py-5">
            {!isLoading &&
              data?.map((product) => (
                <Pressable
                  key={product.id}
                  onPress={() => handleChange(product)}
                >
                  <VStack space="sm">
                    <Heading>{product.name}</Heading>
                    <Text>{product.id}</Text>
                    <Divider />
                  </VStack>
                </Pressable>
              ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export { SelectCustomer };
