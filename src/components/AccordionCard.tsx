import { DeleteOutline } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  index: number;
  title: ReactNode;
  expanded?: boolean;
  onExpandedChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  onDelete: () => void;
}

export const AccordionCard = (props: Props) => {
  return (
    <Stack
      direction={"row"}
      flex={1}
      sx={{
        "--project-accordion-summary-height": "3rem",
      }}
      gap={1}
      alignItems={"center"}
    >
      <Typography textColor={"text.tertiary"}>
        #{String(props.index + 1).padStart(2, "0")}
      </Typography>

      <Card sx={{ padding: 0, overflow: "hidden", flex: 1 }}>
        <Stack
          direction={"row-reverse"}
          alignItems={"start"}
          justifyContent={"space-between"}
          gap={1}
        >
          <Stack
            sx={{
              height: "var(--project-accordion-summary-height)",
              marginRight: 1,
            }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <IconButton
              color="neutral"
              size="sm"
              variant="plain"
              onClick={props.onDelete}
              sx={{ width: "fit-content" }}
            >
              <DeleteOutline />
            </IconButton>
          </Stack>
          <Accordion
            sx={{ flex: 1 }}
            expanded={props.expanded}
            onChange={props.onExpandedChange}
          >
            <AccordionSummary
              sx={{
                height: "var(--project-accordion-summary-height)",
              }}
            >
              {props.title}
            </AccordionSummary>
            <AccordionDetails>{props.children}</AccordionDetails>
          </Accordion>
        </Stack>
      </Card>
    </Stack>
  );
};
