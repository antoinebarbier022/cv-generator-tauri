import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataService } from "../services/DataService";

export const useSetDataStorage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["setData"],
    mutationFn: DataService.set,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });
};
