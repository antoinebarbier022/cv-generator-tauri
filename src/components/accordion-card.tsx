import { DeleteOutline, DragIndicatorRounded } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  IconButton,
  Stack,
  Switch,
  Typography
} from '@mui/joy'
import { forwardRef, PropsWithChildren, ReactNode, useState } from 'react'
import { DraggableProvidedDragHandleProps, DraggableStateSnapshot } from 'react-beautiful-dnd'

interface Props extends PropsWithChildren {
  indexCount: number
  title: ReactNode
  isExpanded?: boolean
  isEmpty?: boolean
  isHidden?: boolean
  isNew?: boolean
  isDragIndicator?: boolean
  isIndexIndicator?: boolean
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined
  snapshot?: DraggableStateSnapshot
  onExpandedChange?: (event: React.SyntheticEvent, expanded: boolean) => void
  onDelete: () => void
  onChangeHidden: (value: boolean) => void
}

export const AccordionCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      indexCount,
      title,
      isExpanded,
      isEmpty,
      isNew,
      isHidden,
      isDragIndicator,
      isIndexIndicator,
      onExpandedChange,
      onChangeHidden,
      onDelete,
      dragHandleProps,
      snapshot,
      children,
      ...props
    },
    ref
  ) => {
    const [displayChildren, setDisplayChildren] = useState(isExpanded)

    const handleExpandedChange = (event: React.SyntheticEvent, expanded: boolean) => {
      if (onExpandedChange) {
        onExpandedChange(event, expanded)

        if (!expanded) {
          setTimeout(() => {
            setDisplayChildren(false)
          }, 500)
        } else {
          setDisplayChildren(true)
        }
      }
    }

    const handleDelete = onDelete
    return (
      <Stack
        ref={ref}
        {...props}
        direction={'row'}
        flex={1}
        sx={{
          '--project-accordion-summary-height': '3rem',
          paddingY: 0.5
        }}
        gap={1}
        alignItems={'center'}
      >
        {isIndexIndicator && (
          <Typography textColor={'text.tertiary'} level="body-md">
            {String(indexCount + 1).padStart(2, '0')}
          </Typography>
        )}

        {isDragIndicator && (
          <Stack
            alignSelf={'start'}
            alignItems={'center'}
            height={'var(--project-accordion-summary-height)'}
            justifyContent={'center'}
            //paddingLeft={0.5}
          >
            <DragIndicatorRounded />
          </Stack>
        )}

        <Card
          color={isNew ? 'primary' : undefined}
          sx={{
            padding: 0,
            overflow: 'hidden',
            flex: 1,
            backgroundPosition: 'top',
            backgroundRepeat: 'repeat',
            backgroundImage: isHidden
              ? `repeating-linear-gradient(
              -45deg,
              #f3f3f3,
              #f3f3f3 10px,
              #ececec 10px,
              #ececec 20px
            )`
              : undefined,
            border: 'none'
          }}
          className="has-[.AccordionSummary:hover]:bg-[--joy-palette-neutral-100]"
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flex={1}
            paddingLeft={1}
            gap={1}
          >
            <Stack justifyContent={'center'} sx={{ alignSelf: 'start', height: '3rem' }}>
              <Switch
                checked={!isHidden}
                onChange={(event) => onChangeHidden(!event.target.checked)}
              />
            </Stack>

            <Accordion sx={{ flex: 1 }} expanded={isExpanded} onChange={handleExpandedChange}>
              <AccordionSummary
                slotProps={{
                  button: {
                    sx: {
                      borderRadius: 'sm'
                    }
                  }
                }}
                className="AccordionSummary"
                sx={{
                  opacity: isHidden ? 0.55 : 1,
                  height: 'var(--project-accordion-summary-height)',
                  paddingY: 1
                }}
              >
                {title}
              </AccordionSummary>
              <AccordionDetails>{(displayChildren || isExpanded) && children}</AccordionDetails>
            </Accordion>
            <Stack
              direction={'row'}
              sx={{
                height: 'var(--project-accordion-summary-height)',
                marginRight: 1
              }}
              gap={1}
              alignSelf={'start'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <IconButton
                color="neutral"
                size="sm"
                variant="plain"
                onClick={handleDelete}
                sx={{ width: 'fit-content' }}
              >
                <DeleteOutline />
              </IconButton>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    )
  }
)
