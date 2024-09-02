import { Event, listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ErrorContent } from "../../../generated/errors/types/errors";
import { ErrorToast } from "../components/ErrorToast.tsx";
import {invoke} from "@tauri-apps/api/tauri";

export const useErrors = () => {
  useEffect(() => {

    const unlisten = async function() {
      const unlisten = await listen("error", (event: Event<ErrorContent>) => {
        toast.error(<ErrorToast error={event.payload} />);
      })
      invoke("ready_to_receive_errors");

      return unlisten
    }();

    return () => {
      unlisten.then((dispose) => dispose());
    };
  }, []);
};
