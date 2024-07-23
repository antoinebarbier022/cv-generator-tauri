import { confirm, message, open } from "@tauri-apps/api/dialog";
import { listen } from "@tauri-apps/api/event";
import { readTextFile } from "@tauri-apps/api/fs";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAskOutputPath } from "../../cv-generation/hooks/useAskOutputPath";
import { useGenerate } from "../../cv-generation/hooks/useGenerate";
import { useResetDataStorage } from "../../storage/hooks/useResetDataStorage";
import { useSetDataStorage } from "../../storage/hooks/useSetDataStorage";
import { UserData } from "../../storage/types/storage";
import { dataContentValidationSchema } from "../../storage/validations/dataContentValidationSchema";

export const useMenuEvents = () => {
  const navigate = useNavigate();

  const routerLocation = useLocation();

  const mutationDataToStorage = useSetDataStorage();

  const handleImportNewData = async () => {
    const selected = await open({
      multiple: false,
      filters: [
        {
          name: "Json",
          extensions: ["json"],
        },
      ],
    });
    if (selected) {
      const text = JSON.parse(await readTextFile(selected as string));

      dataContentValidationSchema
        .validate(text as UserData)
        .then(() =>
          mutationDataToStorage.mutate(
            { values: text },
            {
              onSuccess: () => {
                toast.success("JSON is imported");
              },
            }
          )
        )
        .catch(async (e: Error) => {
          switch (e.name) {
            case "ValidationError":
              await message(
                `The imported JSON file schema is not valid. Please check the following error: ${e.message}`,
                {
                  title: `Import Error: ${e.name}`,
                  type: "error",
                }
              );
              break;

            default:
              await message(`${e.message}`, {
                title: `${e.name}`,
                type: "error",
              });
              break;
          }
        });
    }
  };

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
    const unlisten = listen("file-import", handleImportNewData);
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
