import { PropsWithChildren, ReactNode } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AccordionCard } from "../../../components/AccordionCard";

interface Props extends PropsWithChildren {
  index: number;
  draggableId: string;
  title: ReactNode;
  isVisible: boolean;
  isExpanded: boolean;
  onChangeVisibility: (visible: boolean) => void;
  onDelete: () => void;
  onExpandedChange?:
    | ((event: React.SyntheticEvent, expanded: boolean) => void)
    | undefined;
}
export const SectionItem = (props: Props) => {
  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(_provided) => (
        <AccordionCard
          key={props.draggableId}
          ref={_provided.innerRef}
          {..._provided.draggableProps}
          {..._provided.dragHandleProps}
          isHidden={props.isVisible}
          indexCount={props.index}
          isDragIndicator
          title={props.title}
          expanded={props.isExpanded}
          onChangeHidden={props.onChangeVisibility}
          onExpandedChange={props.onExpandedChange}
          onDelete={props.onDelete}
        >
          {props.children}
        </AccordionCard>
      )}
    </Draggable>
  );
};
