import {
  BusinessRounded,
  Construction,
  HomeRepairServiceRounded,
  Person,
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
import { useState } from "react";

export const SidebarContainer = () => {
  const [isLoadingGeneration, setIsLoadingGeneration] = useState(false);
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
        gap={2}
        justifyContent={"space-between"}
        flex={1}
        sx={{
          paddingX: "var(--app-border-width)",
        }}
      >
        <Card
          sx={(theme) => ({
            "&:hover": {
              backgroundColor: `rgba(${theme.vars.palette.primary.lightChannel} / 0.1)`,
            },
          })}
        >
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Avatar size="md">AB</Avatar>

            <Typography level="body-md" textColor={"text.primary"}>
              <Link
                component="button"
                onClick={() => {
                  alert("profile");
                }}
                overlay
                underline="none"
              >
                Antoine Barbier
              </Link>
            </Typography>
          </Stack>
        </Card>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Person />
              </ListItemDecorator>
              <ListItemContent>General</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <HomeRepairServiceRounded />
              </ListItemDecorator>
              <ListItemContent>Skills</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <SchoolRounded />
              </ListItemDecorator>
              <ListItemContent>Formations</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <TimelineRounded />
              </ListItemDecorator>
              <ListItemContent>Employment History</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <BusinessRounded />
              </ListItemDecorator>
              <ListItemContent>Projects</ListItemContent>
            </ListItemButton>
          </ListItem>

          <Divider sx={{ marginY: 2 }} />

          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Construction />
              </ListItemDecorator>
              <ListItemContent>CV Configuration</ListItemContent>
            </ListItemButton>
          </ListItem>
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
