import { DeleteOutline, DragIndicatorRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import { forwardRef, PropsWithChildren, ReactNode } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

interface Props extends PropsWithChildren {
  indexCount: number;
  title: ReactNode;
  expanded?: boolean;
  isNew?: boolean;
  isDragIndicator?: boolean;
  isIndexIndicator?: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
  snapshot?: DraggableStateSnapshot;
  onExpandedChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  onDelete: () => void;
}

export const AccordionCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      indexCount,
      title,
      expanded,
      isNew,
      isDragIndicator,
      isIndexIndicator,
      onExpandedChange,
      onDelete,
      dragHandleProps,
      snapshot,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Stack
        ref={ref}
        {...props}
        direction={"row"}
        flex={1}
        sx={{
          "--project-accordion-summary-height": "3rem",
          paddingY: 0.5,
        }}
        gap={1}
        alignItems={"center"}
      >
        {isIndexIndicator && (
          <Typography textColor={"text.tertiary"} level="body-md">
            {String(indexCount + 1).padStart(2, "0")}
          </Typography>
        )}

        <Card
          color={isNew ? "primary" : undefined}
          sx={{ padding: 0, overflow: "hidden", flex: 1 }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            flex={1}
            paddingLeft={0.5}
            gap={0.5}
          >
            {isDragIndicator && (
              <Stack alignItems={"center"} paddingLeft={0.5}>
                <DragIndicatorRounded />
              </Stack>
            )}

            <Accordion
              sx={{ flex: 1 }}
              expanded={expanded}
              onChange={onExpandedChange}
            >
              <AccordionSummary
                slotProps={{
                  button: {
                    sx: {
                      borderRadius: "sm",
                    },
                  },
                }}
                sx={{
                  height: "var(--project-accordion-summary-height)",
                  paddingY: 1,
                }}
              >
                {title}
              </AccordionSummary>
              <AccordionDetails>{children}</AccordionDetails>
            </Accordion>
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
                onClick={onDelete}
                sx={{ width: "fit-content" }}
              >
                <DeleteOutline />
              </IconButton>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  }
);
