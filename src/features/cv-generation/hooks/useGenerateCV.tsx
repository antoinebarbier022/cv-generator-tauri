import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CVGenerationService } from "../services/CVGenerationService";

export const useGenerateCV = () => {
  return useMutation({
    mutationKey: ["generateCV"],
    mutationFn: CVGenerationService.generate,
    onSuccess: (data) => {
      if (data) {
        toast.success(`Generation succeeded`);
      }
    },
    onError: (e) => {
      alert(`Generate [error] : ${e}`);
    },
  });
};
