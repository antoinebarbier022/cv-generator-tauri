import {
  BusinessRounded,
  Construction,
  HomeRepairServiceRounded,
  LanguageRounded,
  SchoolRounded,
  TimelineRounded,
} from "@mui/icons-material";
import { Button, Sheet, Stack } from "@mui/joy";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAskOutputPath } from "../../cv-generation/hooks/useAskOutputPath";
import { useGenerateCV } from "../../cv-generation/hooks/useGenerateCV";
import { useGetDataStorage } from "../../storage/hooks/useGetDataStorage";
import { CardProfileButton } from "../components/CardProfileButton";
import { NavigationList } from "../components/NavigationList";
import { NavigationType } from "../types/sidebar";

export const SidebarContainer = () => {
  const { t } = useTranslation();

  const askOutputPath = useAskOutputPath();
  const generateCV = useGenerateCV();
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

  const handleGenerateCV = () => {
    askOutputPath.mutate(undefined, {
      onSuccess: (data) => {
        if (data) {
          generateCV.mutate(data);
        }
      },
    });
  };

  const navigation: NavigationType[] = [
    {
      icon: <HomeRepairServiceRounded />,
      label: t("sidebar.navigation.skills"),
      to: "/skills",
    },
    {
      icon: <SchoolRounded />,
      label: t("sidebar.navigation.formation"),
      to: "/formation",
    },
    {
      icon: <LanguageRounded />,
      label: t("sidebar.navigation.languages"),
      to: "/languages",
    },
    {
      icon: <TimelineRounded />,
      label: t("sidebar.navigation.employment-history"),
      to: "/employment-history",
    },
    {
      icon: <BusinessRounded />,
      label: t("sidebar.navigation.projects"),
      to: "/projects",
      divider: false,
    },
    {
      icon: <Construction />,
      label: t("sidebar.navigation.cv-configuration"),
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
            image={contentResume.data?.picture}
            fullName={Boolean(fullName) ? fullName : "Profile"}
            linkTo={"/profile"}
          />

          <NavigationList navigation={navigation} />

          <Stack gap={1}>
            <Button
              color="primary"
              variant="solid"
              sx={{ marginX: 1 }}
              loading={generateCV.isPending}
              onClick={handleGenerateCV}
            >
              {t("button.generate-cv.label")}
            </Button>
          </Stack>
        </Stack>
      </Sheet>
    </>
  );
};
