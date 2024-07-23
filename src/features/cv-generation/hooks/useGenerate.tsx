import { useMutation } from "@tanstack/react-query";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { CVGenerationService } from "../services/CVGenerationService";
import { useAskOutputPath } from "./useAskOutputPath";

export const useGenerate = () => {
  const generate = useMutation({
    mutationKey: ["generate"],
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

  const askOutputPath = useAskOutputPath();

  useEffect(() => {
    const unlisten = listen("file-generate-and-save-as", async () => {
      askOutputPath.mutate(undefined, {
        onSuccess: (data) => {
          if (data) {
            generate.mutate(data);
          }
        },
      });
      return () => {
        unlisten.then((dispose) => dispose());
      };
    });
  }, [history]);

  return generate;
};
