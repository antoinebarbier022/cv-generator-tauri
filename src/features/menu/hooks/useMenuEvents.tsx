import { confirm } from "@tauri-apps/api/dialog";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAskOutputPath } from "../../cv-generation/hooks/useAskOutputPath";
import { useGenerate } from "../../cv-generation/hooks/useGenerate";
import { useImportDataContent } from "../../storage/hooks/useImportDataContent";
import { useResetDataStorage } from "../../storage/hooks/useResetDataStorage";

export const useMenuEvents = () => {
  const navigate = useNavigate();

  const routerLocation = useLocation();

  const resetDataStorage = useResetDataStorage();

  const mutationImport = useImportDataContent();

  const setupListener = (eventName: string, navigateTo: string) => {
    return listen(eventName, () => {
      if (location.pathname !== navigateTo) {
        navigate(navigateTo, {
          state: {
            background: { ...routerLocation, pathname: location.pathname },
          },
        });
      }
    });
  };

  useEffect(() => {
    const unlisten = setupListener("debug-open-panel", "/debug");

    return () => {
      unlisten.then((dispose) => dispose());
    };
  }, [history]);

  useEffect(() => {
    const unlisten = listen("file-import", () => mutationImport.mutate());
    return () => {
      unlisten.then((dispose) => dispose());
    };
  }, [history]);

  useEffect(() => {
    const unlisten = setupListener("file-export", "/export");
    return () => {
      unlisten.then((dispose) => dispose());
    };
  }, [history]);

  useEffect(() => {
    const unlisten = listen("file-reset", async () => {
      const confirmed = await confirm(
        "This action cannot be reverted. Are you sure?",
        { title: "Reset all data", type: "warning" }
      );
      if (confirmed) {
        resetDataStorage.mutate();
      }
    });
    return () => {
      unlisten.then((dispose) => dispose());
    };
  }, [history]);

  useEffect(() => {
    const unlisten = setupListener("file-generate", "/generate");
    return () => {
      unlisten.then((dispose) => dispose());
    };
  }, []);

  const askOutputPath = useAskOutputPath();
  const generate = useGenerate();

  useEffect(() => {
    const unlisten = listen("file-generate-and-save-as", async () => {
      askOutputPath.mutate(undefined, {
        onSettled: () => {},
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

  return { isLoadingGenerate: generate.isPending };
};
