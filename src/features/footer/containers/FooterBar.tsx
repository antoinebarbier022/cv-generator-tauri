import { Divider, Sheet, Stack, Typography } from "@mui/joy";
import { useWarningsStore } from "../../cv-resume/stores/useWarningsStore";
import { CurrentPowerpointPath } from "../components/CurrentPowerpointPath";
import { LastUpdate } from "../components/LastUpdate";
import { WarningsCounter } from "../components/WarningsCounter";

export const FooterBar = () => {
  const options = {
    showErrors: true,
    showLastUpdate: false,
    showPathFile: false,
  };
  const { countWarnings } = useWarningsStore();

  return (
    <Stack
      direction={"row"}
      component={Sheet}
      variant="solid"
      gap={1}
      justifyContent={"end"}
      sx={{
        width: "calc(100%)",
        position: "absolute",
        bottom: 0,
        //left: "calc(var(--app-sidebar-width))",
        paddingRight: "calc(0.5rem + var(--app-border-width)) ",
        py: 0.5,
        background: "transparent",
      }}
      invertedColors
    >
      <Stack
        component={Typography}
        level="body-xs"
        fontWeight={400}
        textColor={"text.secondary"}
        direction={"row"}
        sx={{ cursor: "default" }}
        gap={1.5}
      >
        {}
        <CurrentPowerpointPath path="/Users/antoinebarbier/Downloads/CV_Barbier_Antoine_CDT.pptx" />

        <Divider orientation="vertical" />
        <LastUpdate date={new Date()} />
        <Divider orientation="vertical" />
        <WarningsCounter count={countWarnings} />
      </Stack>
    </Stack>
  );
};
