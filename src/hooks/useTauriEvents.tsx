import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useTauriEvents = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const setupListener = (eventName: string, navigateTo: string) => {
    return listen(eventName, () => {
      if (location.pathname !== navigateTo) {
        navigate(navigateTo, {
          state: { background: routerLocation },
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
    const unlisten = setupListener("file-reset", "/reset");
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
