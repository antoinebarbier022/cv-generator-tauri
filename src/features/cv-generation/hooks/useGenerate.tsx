import { CloseRounded } from "@mui/icons-material";
import { IconButton, Link, Stack, Typography } from "@mui/joy";
import { useMutation } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import { toast } from "react-toastify";
import { CVGenerationService } from "../services/CVGenerationService";

export const useGenerate = () => {
  return useMutation({
    mutationKey: ["generate"],
    mutationFn: CVGenerationService.generate,
    onSuccess: async (data, outputFilePath) => {
      if (data) {
        const outputList = outputFilePath.split("/");
        const fileName = outputList[outputList.length - 1];

        const renderContent = (
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography textColor={"text.primary"}>{fileName}</Typography>
              <Stack direction={"column-reverse"}>
                <Link
                  className="peer"
                  mt={1}
                  sx={{ width: "fit-content" }}
                  fontSize={"0.75rem"}
                  onClick={(e) => {
                    e.stopPropagation();
                    invoke("open_finder", { path: outputFilePath });
                    toast.dismiss("generation-succeeded");
                  }}
                >
                  Afficher dans le finder
                </Link>
                <Typography
                  className="group-hover:hidden peer-hover:flex group-has-[.close:hover]:flex"
                  sx={{ width: "fit-content" }}
                  fontSize={"0.75rem"}
                >
                  PPTX
                </Typography>

                <Typography
                  sx={{ width: "fit-content", display: "none" }}
                  className="group-hover:flex peer-hover:hidden group-has-[.close:hover]:hidden"
                  fontSize={"0.75rem"}
                >
                  Ouvrir dans Microsoft PowerPoint
                </Typography>
              </Stack>
            </Stack>
            <IconButton
              size="sm"
              className="close"
              onClick={(e) => {
                e.stopPropagation();
                toast.dismiss("generation-succeeded");
              }}
            >
              <CloseRounded />
            </IconButton>
          </Stack>
        );

        toast.info(renderContent, {
          type: "info",
          toastId: `generation-succeeded`,
          icon: false,
          autoClose: 30000,
          hideProgressBar: false,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          progress: undefined,
          closeButton: false,
          theme: "light",
          className: "group",

          onClick(e) {
            e.stopPropagation();
            invoke("open_powerpoint", { path: outputFilePath });
          },
        });

        toast.update(`generation-succeeded`, {
          render: renderContent,
        });
      }
    },
    onError: (e) => {
      alert(`Generate [error] : ${e}`);
    },
  });
};
