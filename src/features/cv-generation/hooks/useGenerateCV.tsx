import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CVGenerationService } from "../services/CVGenerationService";

export const useGenerateCV = () => {
  return useMutation({
    mutationKey: ["generateCV"],
    mutationFn: CVGenerationService.generate,
    onSuccess: (data) => {
      if (data) {
        toast.success(`Generate CV succeeded`);
      }
    },
    onError: (e) => {
      alert(`Generate CV [error] : ${e}`);
    },
  });
};
