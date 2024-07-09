import {
  BusinessRounded,
  CheckRounded,
  Construction,
  ContentCopy,
  HomeRepairServiceRounded,
  SchoolRounded,
  TimelineRounded,
} from "@mui/icons-material";
import {
  Button,
  Card,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";

import { useState } from "react";
import { useGenerateCV } from "../../cv-generation/hooks/useGenerateCV";
import { useGetDataStorage } from "../../storage/hooks/useGetDataStorage";
import { useGetImageProfileStorage } from "../../storage/hooks/useGetImageProfileStorage";
import { CardProfileButton } from "../components/CardProfileButton";
import { NavigationList } from "../components/NavigationList";
import { NavigationType } from "../types/sidebar";

export const SidebarContainer = () => {
  const generateCV = useGenerateCV();

  const image = useGetImageProfileStorage();
  const data = useGetDataStorage();

  const [isOpenDebugModal, setOpenDebugModal] = useState(false);
  const handleCloseDebugModal = () => {
    setOpenDebugModal(false);
  };
  const handleOpenDebugModal = () => {
    setOpenDebugModal(true);
  };

  const handleGenerateCV = () => {
    generateCV.mutate();
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

  const navigation: NavigationType[] = [
    {
      icon: <HomeRepairServiceRounded />,
      label: "Skills",
      to: "/skills",
    },
    {
      icon: <SchoolRounded />,
      label: "Formation",
      to: "/formation",
    },
    {
      icon: <TimelineRounded />,
      label: "Employment History",
      to: "/employment-history",
    },
    {
      icon: <BusinessRounded />,
      label: "Projects",
      to: "/projects",
      divider: false,
    },
    {
      icon: <Construction />,
      label: "CV Configuration",
      to: "/cv-configuration",
      hide: true,
    },
  ];

  return (
    <>
      <Sheet
        component={Stack}
        color="primary"
        variant="solid"
        invertedColors
        sx={{ backgroundColor: "transparent", height: "100%" }}
      >
        <Stack
          data-tauri-drag-region
          sx={{
            height: "2rem",
            minHeight: "2rem",
            paddingX: "var(--app-border-width)",
          }}
        />
        <Stack
          gap={1}
          height={"100%"}
          justifyContent={"space-between"}
          paddingX={"var(--app-border-width)"}
        >
          <CardProfileButton
            image={image.data}
            fullName={"Antoine Barbier"}
            initials={"AB"}
            linkTo={"/profile"}
          />

          <NavigationList navigation={navigation} />

          <Stack gap={1}>
            <Button
              color="primary"
              variant="outlined"
              sx={{ marginX: 1 }}
              loading={generateCV.isPending}
              onClick={handleOpenDebugModal}
            >
              Debug
            </Button>
            <Button
              color="primary"
              variant="solid"
              sx={{ marginX: 1 }}
              loading={generateCV.isPending}
              onClick={handleGenerateCV}
            >
              Generate CV
            </Button>
          </Stack>
        </Stack>
      </Sheet>
      <Modal open={isOpenDebugModal} onClose={handleCloseDebugModal}>
        <ModalDialog sx={{ minWidth: "60vw" }}>
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
            <Typography component={"pre"} fontFamily={"monospace"}>
              {JSON.stringify(data.data, null, 2)}
            </Typography>
          </Card>
          <Button
            variant="outlined"
            startDecorator={
              isCopied ? (
                <CheckRounded sx={{ fontSize: "1rem" }} />
              ) : (
                <ContentCopy sx={{ fontSize: "1rem" }} />
              )
            }
            sx={{ position: "sticky", right: "1rem", top: "1rem" }}
            onClick={() =>
              handleCopyToClipboard(JSON.stringify(data.data, null, 2))
            }
          >
            Copier
          </Button>
        </ModalDialog>
      </Modal>
    </>
  );
};
