import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StorageService } from "../services/StorageService";
import { useFormCV } from "./useFormCV";

export const useSetImageProfileStorage = () => {
  const { formik } = useFormCV();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["set_image_profile"],
    mutationFn: StorageService.setImageProfile,
    onSuccess: async (data) => {
      await formik.setFieldValue("picture", data);
      await queryClient.invalidateQueries({ queryKey: ["image_profile"] });
      await queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });
};
