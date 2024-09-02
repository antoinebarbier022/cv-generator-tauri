import { Event, listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ErrorContent } from "../../../generated/errors/types/errors";
import { ErrorToast } from "../components/ErrorToast.tsx";
import { useBackendError } from "./useBackendError.tsx";

export const useErrors = () => {
  useBackendError();

  useEffect(() => {
    const unlisten = listen("error", (event: Event<ErrorContent>) => {
      toast.error(<ErrorToast error={event.payload} />);
    });

    return () => {
      unlisten.then((dispose) => dispose());
    };
  }, []);
};
