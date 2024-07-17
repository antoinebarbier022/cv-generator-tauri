import { useMutation } from "@tanstack/react-query";
import { CVGenerationService } from "../services/CVGenerationService";

export const useGenerateCV = () => {
  return useMutation({
    mutationKey: ["generateCV"],
    mutationFn: CVGenerationService.generate,
    onSuccess: (data) => {
      alert(JSON.stringify(data));
    },
    onError: (e) => {
      alert(e);
    },
  });
};
