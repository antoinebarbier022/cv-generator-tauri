import { Button, Input, Stack, Typography } from '@mui/joy'
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
          color={isError ? 'danger' : 'neutral'}
          placeholder="API KEY"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          endDecorator={
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
          }
        />
      )}
    </Stack>
  )
}
