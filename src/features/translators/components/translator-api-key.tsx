import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import { Button, IconButton, Input, Stack, Typography } from '@mui/joy'
import { useState } from 'react'

interface Props {
  isActive: boolean
  isLoading: boolean
  isError: boolean
  apiKeyToShow: string
  onSubmit: (value: string) => void
  onDelete: () => void
}
export const TranslatorApiKey = ({
  isActive,
  isLoading,
  isError,
  apiKeyToShow,
  onSubmit,
  onDelete
}: Props) => {
  const [value, setValue] = useState('')
  const [isVisible, setInputVisibility] = useState(false)
  return (
    <Stack direction={'row'} justifyContent={'space-between'} gap={2}>
      {isActive ? (
        <Stack
          direction={'row'}
          gap={4}
          flex={1}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography sx={{ textAlign: 'end', outline: 'none', border: 'none' }}>
            {apiKeyToShow}
          </Typography>
          <Button size="sm" color="danger" onClick={onDelete}>
            Supprimer
          </Button>
        </Stack>
      ) : (
        <Input
          size="sm"
          type={isVisible ? 'text' : 'password'}
          color={isError ? 'danger' : 'neutral'}
          placeholder="API KEY"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          endDecorator={
            <Stack direction={'row'} gap={2}>
              <IconButton
                variant="plain"
                color={'neutral'}
                sx={{ borderRadius: '100px' }}
                onMouseDown={() => {
                  setInputVisibility(true)
                }}
                onMouseUp={() => {
                  setInputVisibility(false)
                }}
              >
                {isVisible ? <VisibilityRounded /> : <VisibilityOffRounded />}
              </IconButton>
              <Button
                color={isError ? 'danger' : 'neutral'}
                loading={isLoading}
                variant="soft"
                onClick={() => {
                  onSubmit(value)
                }}
              >
                OK
              </Button>
            </Stack>
          }
        />
      )}
    </Stack>
  )
}
