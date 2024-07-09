import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StorageService } from "../services/StorageService";

export const useSetDataStorage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["setData"],
    mutationFn: StorageService.setData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });
};
