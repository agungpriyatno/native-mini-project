import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react-native";

import { Button, ButtonIcon } from "./ui/button";
import { HStack } from "./ui/hstack";
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
import { Text } from "./ui/text";

type PaginatorProps = {
  page: number;
  perPage: number;
  totalPage?: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

const Paginator = ({
  page,
  perPage,
  totalPage,
  onPageChange,
  onPerPageChange,
}: PaginatorProps) => {
  const changePerPage = (perPage: string) => onPerPageChange(parseInt(perPage));

  return (
    <HStack className="p-3 justify-between mb-14">
      <Select onValueChange={changePerPage}>
        <SelectTrigger variant="outline" className="h-12 justify-between">
          <SelectInput
            size="sm"
            placeholder="Per Page"
            value={perPage.toString()}
          />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <SelectItem label="10" value="10" />
            <SelectItem label="20" value="20" />
            <SelectItem label="30" value="30" />
            <SelectItem label="40" value="40" />
            <SelectItem label="50" value="50" />
          </SelectContent>
        </SelectPortal>
      </Select>
      <HStack className="justify-end items-center" space="md">
        <Button disabled={page == 1} onPress={() => onPageChange(page - 1)}>
          <ButtonIcon as={ChevronLeftIcon} />
        </Button>
        <Text className="text-center" size="lg">
          {page}/{totalPage ?? 1}
        </Text>
        <Button
          disabled={(totalPage ?? 1) == page}
          onPress={() => onPageChange(page + 1)}
        >
          <ButtonIcon as={ChevronRightIcon} />
        </Button>
      </HStack>
    </HStack>
  );
};

export { Paginator };
