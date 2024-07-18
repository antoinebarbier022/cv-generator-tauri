import { useMutation } from "@tanstack/react-query";
import { CVGenerationService } from "../services/CVGenerationService";

export const useGenerateCV = () => {
  return useMutation({
    mutationKey: ["generateCV"],
    mutationFn: CVGenerationService.generate,
    onSuccess: (data) => {
      alert(`Generate CV [success] : ${JSON.stringify(data)}`);
    },
    onError: (e) => {
      alert(`Generate CV [error] : ${e}`);
    },
  });
};
