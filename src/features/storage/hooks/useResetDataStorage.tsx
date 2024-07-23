import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { StorageService } from "../services/StorageService";

export const useResetDataStorage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["resetData"],
    mutationFn: StorageService.resetContentData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
      toast.success("All data has been successfully reset.", {
        toastId: "resetData.success",
      });
    },
    onError: (e) => {
      toast.error(e.message, {
        toastId: "resetData.error",
      });
    },
  });
};
