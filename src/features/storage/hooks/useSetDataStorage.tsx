import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "@tauri-apps/api/dialog";
import { StorageService } from "../services/StorageService";

export const useSetDataStorage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["setData"],
    mutationFn: StorageService.setContentData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: async (error) => {
      await message(error.message, { title: error.name, type: "error" });
    },
  });
};
