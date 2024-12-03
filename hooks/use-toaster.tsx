import { Toast, ToastTitle, useToast } from "@/components/ui/toast";

export const useToaster = () => {
  const toast = useToast();

  const success = (message: string) => {
    toast.show({
      placement: "bottom",
      render: ({ id }) => (
        <Toast nativeID={id}>
          <ToastTitle>{message}</ToastTitle>
        </Toast>
      ),
    });
  };

  const error = (message: string) => {
    toast.show({
      placement: "bottom",
      render: () => (
        <Toast>
          <ToastTitle>{message}</ToastTitle>
        </Toast>
      ),
    });
  };
  return {
    success,
    error,
  };
};
