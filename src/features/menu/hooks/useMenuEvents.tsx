import { confirm } from "@tauri-apps/api/dialog";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAskOutputPath } from "../../cv-generation/hooks/useAskOutputPath";
import { useGenerate } from "../../cv-generation/hooks/useGenerate";
import { useImportDataContent } from "../../storage/hooks/useImportDataContent";
import { useResetDataStorage } from "../../storage/hooks/useResetDataStorage";
import { MenuEvent } from "../../../generated/events/menu-events";

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
    const unlisten = setupListener(MenuEvent.DebugOpenPanel, "/debug");

    return () => {
      unlisten.then((dispose) => dispose());
    };
  }, [history]);

  useEffect(() => {
    const unlisten = listen(MenuEvent.FileImport, () => mutationImport.mutate());
    return () => {
      unlisten.then((dispose) => dispose());
    };
  }, [history]);

  useEffect(() => {
    const unlisten = setupListener(MenuEvent.FileExport, "/export");
    return () => {
      unlisten.then((dispose) => dispose());
    };
  }, [history]);

  useEffect(() => {
    const unlisten = listen(MenuEvent.FileReset, async () => {
      console.log("reset")

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
    const unlisten = setupListener(MenuEvent.FileGenerate, "/generate");
    return () => {
      unlisten.then((dispose) => dispose());
    };
  }, []);

  const askOutputPath = useAskOutputPath();
  const generate = useGenerate();

  useEffect(() => {
    const unlisten = listen(MenuEvent.FileGenerateAndSaveAs, async () => {
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
