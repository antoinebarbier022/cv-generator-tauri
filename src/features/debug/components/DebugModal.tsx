import { CheckRounded, ContentCopy, UpdateRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import { format, fromUnixTime } from "date-fns";

import { useState } from "react";
import { useGetDataStorage } from "../../storage/hooks/useGetDataStorage";
import { useSetDataStorage } from "../../storage/hooks/useSetDataStorage";
import { dataContentValidationSchema } from "../../storage/validations/dataContentValidationSchema";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const DebugModal = (props: Props) => {
  const mutationDataToStorage = useSetDataStorage();
  const data = useGetDataStorage();

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
        .validate(text)
        .then(() => mutationDataToStorage.mutate({ values: text }))
        .catch((e) => alert(e));
    }
  };

  const [isCopied, setIsCopied] = useState(false);
  const handleCopyToClipboard = (value: string) => {
    if (value) {
      setIsCopied(true);
      navigator.clipboard.writeText(value);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalDialog
        sx={{ minWidth: "60vw", maxWidth: { sm: "80vw", md: "60vw" } }}
      >
        <ModalClose />
        <Typography>data.json</Typography>

        <Card
          component={Stack}
          sx={{ overflowY: "auto", position: "relative" }}
          slotProps={{
            root: {
              contentEditable: "false",
            },
          }}
          className="group"
        >
          <Typography
            startDecorator={<UpdateRounded />}
            level="body-xs"
            sx={{
              position: "sticky",
              top: "0",
              right: "0",
              marginLeft: "auto",
              width: "fit-content",
              backgroundColor: "white",
              borderRadius: "sm",
            }}
          >
            {format(
              fromUnixTime(data.dataUpdatedAt / 1000),
              "dd/MM/yyyy HH:mm"
            )}
          </Typography>
          <Typography component={"pre"} fontFamily={"monospace"}>
            {JSON.stringify(data.data, null, 2)}
          </Typography>
        </Card>

        <Stack direction={"row"} gap={1}>
          <Button sx={{ flex: 1 }} onClick={handleImportNewData}>
            Importer un nouveau JSON
          </Button>
          <Button
            variant="outlined"
            startDecorator={
              isCopied ? (
                <CheckRounded sx={{ fontSize: "1rem" }} />
              ) : (
                <ContentCopy sx={{ fontSize: "1rem" }} />
              )
            }
            onClick={() =>
              handleCopyToClipboard(JSON.stringify(data.data, null, 2))
            }
          >
            Copier le JSON
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};
