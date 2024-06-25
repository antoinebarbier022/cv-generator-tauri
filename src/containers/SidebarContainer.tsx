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
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";

export const SidebarContainer = () => {
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
        <Card>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Avatar size="md">AB</Avatar>
            <Typography level="body-md" textColor={"text.primary"}>
              Antoine Barbier
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

        <Button color="primary" variant="solid" sx={{ marginX: 1 }}>
          CV Generator
        </Button>
      </Stack>
    </Sheet>
  );
};
