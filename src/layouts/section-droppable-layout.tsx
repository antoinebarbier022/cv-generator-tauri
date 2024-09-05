import { Stack, Typography } from '@mui/joy'
import { PropsWithChildren, ReactNode } from 'react'
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd'

import { IconButtonAdd } from '@/components/IconButtonAdd'
import { PageLayout } from '@/layouts/page-layout'

interface Props extends PropsWithChildren {
  title: string | undefined
  chip: string | undefined
  droppableId: string
  isEmpty?: boolean
  isError: boolean
  isLoading: boolean
  emptyContent?: ReactNode
  onDragEnd: OnDragEndResponder
  onAddItem: () => void
}
export const SectionDroppableLayout = (props: Props) => {
  return (
    <DragDropContext onDragEnd={props.onDragEnd}>
      <Droppable droppableId={props.droppableId}>
        {(provided) => (
          <PageLayout
            ref={provided.innerRef}
            {...provided.droppableProps}
            title={props.title}
            chip={props.chip}
            endDecorator={<IconButtonAdd onClick={props.onAddItem} />}
          >
            <Stack gap={2}>
              {props.isLoading && <Typography>Loading...</Typography>}
              {props.isError && <Typography>Error.</Typography>}
              {props.isEmpty && props.emptyContent ? props.emptyContent : props.children}
            </Stack>
          </PageLayout>
        )}
      </Droppable>
    </DragDropContext>
  )
}
