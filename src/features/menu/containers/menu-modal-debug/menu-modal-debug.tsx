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
import { useTranslation } from "react-i18next";
import { useGetDataStorage } from "../../../storage/hooks/useGetDataStorage";
import { useSetDataStorage } from "../../../storage/hooks/useSetDataStorage";
import { UserData } from "../../../storage/types/storage";
import { dataContentValidationSchema } from "../../../storage/validations/dataContentValidationSchema";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const MenuModalDebug = (props: Props) => {
  const { t } = useTranslation();
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
        .validate(text as UserData)
        .then(() => mutationDataToStorage.mutate({ values: text }))
        .catch((e) => alert(`DEBUG Validation Schema: ${e}`));
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
        sx={{ minWidth: { sm: "80vw", lg: "60vw" }, maxWidth: { sm: "80vw" } }}
      >
        <ModalClose />
        <Stack>
          <Typography level="title-lg">
            {t("debug-panel.title")} <span className="font-mono">[.json]</span>
          </Typography>
          <Typography
            startDecorator={<UpdateRounded />}
            level="body-xs"
            sx={{
              width: "fit-content",
            }}
          >
            {format(
              fromUnixTime(data.dataUpdatedAt / 1000),
              "dd/MM/yyyy HH:mm"
            )}
          </Typography>
        </Stack>

        <Card
          component={Stack}
          sx={{ overflowY: "auto", position: "relative" }}
          className="group"
        >
          <Typography component={"pre"} fontFamily={"monospace"}>
            {JSON.stringify(data.data, null, 2)}
          </Typography>
        </Card>

        <Stack direction={"row"} gap={1}>
          <Button sx={{ flex: 1 }} onClick={handleImportNewData}>
            {t("debug-panel.button.import-content-file.label")}
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
            {t("debug-panel.button.copy-file-content.label")}
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};
