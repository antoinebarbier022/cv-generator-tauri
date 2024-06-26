import {
  BusinessRounded,
  Construction,
  HomeRepairServiceRounded,
  SchoolRounded,
  TimelineRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";

import { downloadDir, resolveResource } from "@tauri-apps/api/path";
import { Command } from "@tauri-apps/api/shell";
import { Fragment, ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";

export const SidebarContainer = () => {
  const [isLoadingGeneration, setIsLoadingGeneration] = useState(false);

  type NavigationType = {
    label: string;
    icon: ReactNode;
    to: string;
    divider?: boolean;
  };
  const navigation: NavigationType[] = [
    /*{
      icon: <Person />,
      label: "General",
      to: "/profile",
    },*/
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
      divider: true,
    },
    {
      icon: <Construction />,
      label: "CV Configuration",
      to: "/cv-configuration",
    },
  ];
  return (
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
      ></Stack>
      <Stack
        gap={1}
        justifyContent={"space-between"}
        flex={1}
        sx={{
          paddingX: "var(--app-border-width)",
        }}
      >
        <Card
          role="navigation"
          sx={(theme) => ({
            paddingY: 1.5,
            paddingX: 2,
            "&:hover": {
              backgroundColor: `rgba(${theme.vars.palette.primary.lightChannel} / 0.05)`,
            },
            "&:has([aria-current='page'])": {
              backgroundColor: `rgba(${theme.vars.palette.primary.lightChannel} / 0.22)`,
            },
          })}
        >
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Avatar size="md">AB</Avatar>

            <Typography level="body-md" textColor={"text.primary"}>
              <NavLink to="/profile">
                {({ isActive }) => (
                  <Link
                    overlay
                    underline="none"
                    aria-current={isActive ? "page" : undefined}
                  >
                    Antoine Barbier
                  </Link>
                )}
              </NavLink>
            </Typography>
          </Stack>
        </Card>
        <List>
          {navigation.map((value, index) => (
            <Fragment key={`nav-${index}-${value.to}`}>
              <ListItem>
                <NavLink to={value.to} className={"w-full no-underline"}>
                  {({ isActive }) => (
                    <ListItemButton
                      tabIndex={-1}
                      selected={isActive}
                      sx={{ borderRadius: "xs" }}
                    >
                      <ListItemDecorator>{value.icon}</ListItemDecorator>
                      <ListItemContent>{value.label}</ListItemContent>
                    </ListItemButton>
                  )}
                </NavLink>
              </ListItem>
              {value.divider && <Divider sx={{ marginY: 1.5 }} />}
            </Fragment>
          ))}
        </List>

        <Stack gap={1}>
          <Button
            color="primary"
            variant="solid"
            sx={{ marginX: 1 }}
            loading={isLoadingGeneration}
            onClick={async () => {
              setIsLoadingGeneration(true);
              const resourceDataPath = await resolveResource("resources");
              const resourceTemplatePath = await resolveResource(
                "resources/CV_Nom_Prenom_Capability.pptx"
              );

              console.log(resourceDataPath);
              console.log(resourceTemplatePath);
              const command = Command.sidecar("binaries/main", [
                "--data-folder",
                resourceDataPath,
                "--template",
                resourceTemplatePath,
                "--output-folder",
                await downloadDir(),
              ]);
              const output = await command.execute();

              alert(JSON.stringify(output));
              setIsLoadingGeneration(false);
            }}
          >
            Generate CV
          </Button>
        </Stack>
      </Stack>
    </Sheet>
  );
};
