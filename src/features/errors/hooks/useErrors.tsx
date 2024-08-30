import { useEffect } from "react";
import { listen, Event } from "@tauri-apps/api/event";
import { toast } from "react-toastify";
import { ErrorToast } from "../components/ErrorToast.tsx";
import { ErrorContent } from "../../../generated/features/errors/types/errors";
import {useBackendError} from "./useBackendError.tsx";


export const useErrors = () => {
  useBackendError();

  useEffect(() => {
    const unlisten = listen("error", (event: Event<ErrorContent>) => {
      toast.error(<ErrorToast error={event.payload}/>);
    })

    return () => {
      unlisten.then((dispose) => dispose());
    }
  }, []);
}