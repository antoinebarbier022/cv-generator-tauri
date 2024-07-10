import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StorageService } from "../services/StorageService";

export const useSetImageProfileStorage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["set_image_profile"],
    mutationFn: StorageService.setImageProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["image_profile"] });
    },
  });
};
