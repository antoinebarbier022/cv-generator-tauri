import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "@tauri-apps/api/dialog";
import { toast } from "react-toastify";
import { useFormCV } from "../../form/hooks/useFormCV";
import { StorageService } from "../services/StorageService";

export const useImportDataContent = () => {
  const { formik } = useFormCV();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["import-data-content"],
    mutationFn: StorageService.importContentData,
    onSuccess: async () => {
      await formik.setFieldValue("picture", "");
      await queryClient.invalidateQueries({ queryKey: ["image_profile"] });
      await queryClient.invalidateQueries({ queryKey: ["data"] });
      toast.success("JSON is imported");
    },
    onError: async (error) => {
      await message(error.message, { title: error.name, type: "error" });
    },
  });
};
