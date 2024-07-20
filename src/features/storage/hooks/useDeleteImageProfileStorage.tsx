import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useFormCV } from "./useFormCV";

export const useDeleteImageProfileStorage = () => {
  const { formik } = useFormCV();
  const queryClient = useQueryClient();
  return useMutation<null>({
    mutationKey: ["delete_image_profile"],
    mutationFn: async () => null,
    onSuccess: async () => {
      await formik.setFieldValue("picture", "");
      await queryClient.invalidateQueries({ queryKey: ["image_profile"] });
      await queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: (e) => {
      toast.error(e.message, {
        toastId: "delete_image_profile.error",
      });
    },
  });
};
