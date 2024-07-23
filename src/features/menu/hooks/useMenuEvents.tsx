import { confirm } from "@tauri-apps/api/dialog";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetDataStorage } from "../../storage/hooks/useResetDataStorage";

export const useMenuEvents = () => {
  const navigate = useNavigate();

  const routerLocation = useLocation();

  const resetDataStorage = useResetDataStorage();
  const setupListener = (eventName: string, navigateTo: string) => {
    return listen(eventName, () => {
      if (location.pathname !== navigateTo) {
        console.log(routerLocation);
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
    const unlisten = setupListener("file-import", "/import");
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
};
