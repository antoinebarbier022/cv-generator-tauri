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
import {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useRef,
  useState,
} from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

import { confirm } from "@tauri-apps/api/dialog";

interface Props extends PropsWithChildren {
  indexCount: number;
  title: ReactNode;
  expanded?: boolean;
  isEmpty?: boolean;
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
      isEmpty,
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
    const [displayChildren, setDisplayChildren] = useState(expanded);
    const timerRef = useRef<number | null>(null);
    const handleExpandedChange = (
      event: React.SyntheticEvent,
      expanded: boolean
    ) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        console.log("Timer annulé");
      }
      if (onExpandedChange) {
        onExpandedChange(event, expanded);
        if (!expanded) {
          timerRef.current = window.setTimeout(() => {
            setDisplayChildren(false);
          }, 500);
        } else {
          setDisplayChildren(true);
        }
      }
    };

    const handleDelete = async () => {
      if (isEmpty) {
        onDelete();
      } else {
        const confirmed = await confirm(
          "This action cannot be reverted. Are you sure?",
          { title: `Delete item`, type: "warning" }
        );
        if (confirmed) {
          onDelete();
        }
      }
    };
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
              <Stack
                alignItems={"center"}
                height={"var(--project-accordion-summary-height)"}
                justifyContent={"center"}
                paddingLeft={0.5}
              >
                <DragIndicatorRounded />
              </Stack>
            )}

            <Accordion
              sx={{ flex: 1 }}
              expanded={expanded}
              onChange={handleExpandedChange}
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
              <AccordionDetails>{displayChildren && children}</AccordionDetails>
            </Accordion>
            <Stack
              sx={{
                height: "var(--project-accordion-summary-height)",
                marginRight: 1,
              }}
              alignSelf={"start"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <IconButton
                color="neutral"
                size="sm"
                variant="plain"
                onClick={handleDelete}
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
