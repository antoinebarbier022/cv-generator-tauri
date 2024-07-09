import { useMutation } from "@tanstack/react-query";
import { CVGenerationService } from "../services/CVGenerationService";

export const useGenerateCV = () => {
  const generate = useMutation({
    mutationKey: ["generateCV"],
    mutationFn: CVGenerationService.generate,
    onSuccess: (data) => {
      alert(JSON.stringify(data));
    },
  });

  return useMutation({
    mutationKey: ["getPathToSave"],
    mutationFn: CVGenerationService.getPathToSave,
    onSuccess: (data) => {
      generate.mutate({ filePath: data });
    },
  });
};
