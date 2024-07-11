import {
  BusinessRounded,
  Construction,
  HomeRepairServiceRounded,
  LanguageRounded,
  SchoolRounded,
  TimelineRounded,
} from "@mui/icons-material";
import { Button, Sheet, Stack } from "@mui/joy";

import { useMemo, useState } from "react";
import { useGenerateCV } from "../../cv-generation/hooks/useGenerateCV";
import { DebugModal } from "../../debug/components/DebugModal";
import { useGetDataStorage } from "../../storage/hooks/useGetDataStorage";
import { useGetImageProfileStorage } from "../../storage/hooks/useGetImageProfileStorage";
import { CardProfileButton } from "../components/CardProfileButton";
import { NavigationList } from "../components/NavigationList";
import { NavigationType } from "../types/sidebar";

export const SidebarContainer = () => {
  const generateCV = useGenerateCV();

  const image = useGetImageProfileStorage();
  const contentResume = useGetDataStorage();

  const fullName = useMemo(() => {
    const firstname = contentResume.data?.firstname;
    const lastname = contentResume.data?.lastname;
    if (Boolean(firstname) && Boolean(lastname)) {
      return `${contentResume.data?.firstname} ${contentResume.data?.lastname}`;
    } else if (Boolean(firstname)) {
      return `${contentResume.data?.firstname}`;
    } else if (Boolean(lastname)) {
      return `${contentResume.data?.lastname}`;
    } else {
      return "";
    }
  }, [contentResume.data?.firstname, contentResume.data?.lastname]);

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
      icon: <LanguageRounded />,
      label: "Languages",
      to: "/languages",
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
            fullName={Boolean(fullName) ? fullName : "Your Profile"}
            linkTo={"/profile"}
          />

          <NavigationList navigation={navigation} />

          <Stack gap={1}>
            <Button
              color="primary"
              variant="outlined"
              sx={{ marginX: 1 }}
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
      <DebugModal open={isOpenDebugModal} onClose={handleCloseDebugModal} />
    </>
  );
};
