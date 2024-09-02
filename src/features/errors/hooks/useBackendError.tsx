import { emit } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";
import { ErrorContent } from "../../../generated/errors/types/errors";

export const useBackendError = () => {
  useEffect(() => {
    invoke("get_backend_error").then((error) => {
      if (error as String | null) {
        emit("error", {
          title: "Backend Error",
          message: error,
        } as ErrorContent);
      }
    });
  }, []);
};
