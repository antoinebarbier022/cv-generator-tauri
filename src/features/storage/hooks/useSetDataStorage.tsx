import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { StorageService } from "../services/StorageService";

export const useSetDataStorage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["setData"],
    mutationFn: StorageService.setContentData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: (e) => {
      toast.error(e.message, {
        toastId: "setData.error",
      });
    },
  });
};
