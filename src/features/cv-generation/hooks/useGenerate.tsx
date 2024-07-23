import { useMutation } from "@tanstack/react-query";
import { message } from "@tauri-apps/api/dialog";
import { CVGenerationService } from "../services/CVGenerationService";

export const useGenerate = () => {
  return useMutation({
    mutationKey: ["generate"],
    mutationFn: CVGenerationService.generate,
    onSuccess: async (data, outputFilePath) => {
      if (data) {
        await message(
          `You can find it at the following path: ${outputFilePath}`,
          {
            title: "Generation succeeded",
            type: "info",
          }
        );
      }
    },
    onError: (e) => {
      alert(`Generate [error] : ${e}`);
    },
  });
};
