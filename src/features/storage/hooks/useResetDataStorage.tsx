import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "@tauri-apps/api/dialog";
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
    onError: async (error) => {
      await message(error.message, { title: error.name, type: "error" });
    },
  });
};
