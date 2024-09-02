import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "@tauri-apps/api/dialog";
import { removeFile } from "@tauri-apps/api/fs";
import { useFormCV } from "../../form/hooks/useFormCV";

export const useDeleteImageProfileStorage = () => {
  const { formik } = useFormCV();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete_image_profile"],
    mutationFn: async () => {
      await removeFile(formik.values.picture);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["image_profile"] });
      await queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: async (error) => {
      await message(error.message, { title: error.name, type: "error" });
    },
  });
};
