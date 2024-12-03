import { useState } from "react";
import { Button, ButtonIcon, ButtonText } from "./ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "./ui/drawer";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { ChevronDownIcon, FilterIcon } from "lucide-react-native";
import { Input, InputField } from "./ui/input";
import { TextInputEvent } from "@/hooks/use-query-params";
import { VStack } from "./ui/vstack";
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

import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

type FilterDrawerProps = {
  filterColumns: { label: string; value: string }[];
  sortColumns: { label: string; value: string }[];
  filter: { field: string; value: string };
  sort: { field: string; value: string };
  date: { from: string | undefined; to: string | undefined };
  onFilterFieldChange: (field: string) => void;
  onFilterValueChange: (value: TextInputEvent) => void;
  onSortFieldChange: (field: string) => void;
  onSortValueChange: (value: string) => void;
  onFromDateChange: (from: string) => void;
  onToDateChange: (to: string) => void;
  onReset: () => void;
};

const FilterDrawer = ({
  filterColumns,
  sortColumns,
  filter,
  sort,
  date,
  onFilterFieldChange,
  onFilterValueChange,
  onSortFieldChange,
  onSortValueChange,
  onFromDateChange,
  onToDateChange,
  onReset,
}: FilterDrawerProps) => {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const [showDrawer, setShowDrawer] = useState(false);
  const onOpenDrawer = () => setShowDrawer(true);
  const onCloseDrawer = () => setShowDrawer(false);

  return (
    <>
      <Input className="h-14 flex-1">
        <InputField
          placeholder={`Search by ${filter.field}`}
          onChange={onFilterValueChange}
        />
      </Input>
      <Button onPress={onOpenDrawer} className="h-14 w-14">
        <ButtonIcon as={FilterIcon} />
      </Button>
      <Drawer
        isOpen={showDrawer}
        onClose={onCloseDrawer}
        size="lg"
        anchor="left"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <Heading>Filter Management</Heading>
          </DrawerHeader>
          <DrawerBody>
            <VStack space="md">
              <VStack space="xs">
                <Text>Filter by</Text>
                <Select onValueChange={onFilterFieldChange}>
                  <SelectTrigger
                    variant="outline"
                    className="h-12 justify-between"
                  >
                    <SelectInput
                      size="sm"
                      placeholder="Filter by"
                      value={filter.field}
                    />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {filterColumns.map((column) => (
                        <SelectItem
                          key={column.value}
                          label={column.label}
                          value={column.value}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </VStack>

              <VStack space="xs">
                <Text>Sort by</Text>
                <Select onValueChange={onSortFieldChange}>
                  <SelectTrigger
                    variant="outline"
                    className="h-12 justify-between"
                  >
                    <SelectInput
                      size="sm"
                      placeholder="Sort by"
                      value={sort.field}
                    />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {sortColumns.map((column) => (
                        <SelectItem
                          key={column.value}
                          label={column.label}
                          value={column.value}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </VStack>
              <VStack space="xs">
                <Text>Sort direction</Text>
                <Select onValueChange={onSortValueChange}>
                  <SelectTrigger
                    variant="outline"
                    className="h-12 justify-between"
                  >
                    <SelectInput
                      size="sm"
                      placeholder="Sort by"
                      value={sort.value}
                    />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label={"Ascending"} value={"asc"} />
                      <SelectItem label={"Descending"} value={"desc"} />
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </VStack>
              <VStack space="xs">
                <Text>From Date</Text>
                <Button
                  variant="outline"
                  className=" justify-start h-14"
                  onPress={() => setOpenStartDate(true)}
                >
                  <ButtonText>
                    {!!date?.from
                      ? format(new Date(date.from), "dd MMMM yyyy")
                      : "From Date"}
                  </ButtonText>
                </Button>
              </VStack>
              <VStack space="xs">
                <Text>End Date</Text>
                <Button
                  variant="outline"
                  className=" justify-start h-14"
                  onPress={() => setOpenEndDate(true)}
                >
                  <ButtonText>
                    {!!date?.to
                      ? format(new Date(date.to), "dd MMMM yyyy")
                      : "From Date"}
                  </ButtonText>
                </Button>
              </VStack>
              {openStartDate && (
                <DateTimePicker
                  mode="date"
                  value={new Date()}
                  onTouchCancel={() => setOpenStartDate(false)}
                  onChange={(e) => {
                    onFromDateChange(
                      format(e.nativeEvent.timestamp, "yyyy-MM-dd") +
                        " 00:00:00"
                    );
                    setOpenStartDate(false);
                  }}
                />
              )}
              {openEndDate && (
                <DateTimePicker
                  mode="date"
                  value={new Date()}
                  onTouchCancel={() => setOpenEndDate(false)}
                  onChange={(e) => {
                    onToDateChange(
                      format(e.nativeEvent.timestamp, "yyyy-MM-dd") +
                        " 23:59:00"
                    );
                    setOpenEndDate(false);
                  }}
                />
              )}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button onPress={onReset} className="flex-1">
              <ButtonText>Reset Filter</ButtonText>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { FilterDrawer };
