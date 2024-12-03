import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
  } from "./ui/alert-dialog";
  import { Button, ButtonIcon, ButtonText } from "./ui/button";
  import { Heading } from "./ui/heading";
  import { Text } from "./ui/text";
  import { useState } from "react";
  import React from "react";
  import { Toast, ToastTitle, useToast } from "./ui/toast";
  import { deleteCustomer } from "@/lib/actions/customer";
  import { Trash2Icon } from "lucide-react-native";
  import { useToaster } from "@/hooks/use-toaster";
  import { deleteOrder } from "@/lib/actions/order";
import { deleteOrderProduct } from "@/lib/actions/order-product";
  
  type OrderProductDeleteProps = {
    orderId: string;
    productCode: string;
    onRefetch: () => void;
  };
  
  const OrderProductDelete = ({ orderId, productCode, onRefetch }: OrderProductDeleteProps) => {
    const toast = useToaster();
  
    const [showAlertDialog, setShowAlertDialog] = useState(false);
  
    const handleClose = () => setShowAlertDialog(false);
  
    const handleDelete = async () => {
      try {
        await deleteOrderProduct(orderId, productCode);
        toast.success("Order Product deleted successfully");
      } catch (error) {
        console.log(error);
        
        toast.error("Failed to delete Order Product");
      }
      onRefetch();
      setShowAlertDialog(false);
    };
  
    return (
      <React.Fragment>
        <Button
          size="md"
          className="bg-error-500"
          onPress={() => setShowAlertDialog(true)}
        >
          <ButtonIcon as={Trash2Icon} />
        </Button>
        <AlertDialog isOpen={showAlertDialog} onClose={handleClose}>
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading className="text-typography-950 font-semibold">
                Are you sure you want to delete this data?
              </Heading>
            </AlertDialogHeader>
            <AlertDialogBody className="mt-3 mb-4">
              <Text size="sm">
                Deleting the data will remove it permanently and cannot be undone.
                Please confirm if you want to proceed.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter className="">
              <Button
                variant="outline"
                action="secondary"
                onPress={handleClose}
                size="sm"
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button size="sm" className="bg-error-500" onPress={handleDelete}>
                <ButtonText>Delete</ButtonText>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </React.Fragment>
    );
  };
  
  export { OrderProductDelete };
  