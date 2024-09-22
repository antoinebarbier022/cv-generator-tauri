import { Avatar, Card, Link, Stack, Typography } from '@mui/joy'
import { convertFileSrc } from '@tauri-apps/api/core'
import { NavLink, useNavigate } from 'react-router-dom'

import luffyHatImage from '@/assets/images/luffy-hat.png'

interface Props {
  isCollapseSidebar?: boolean
  fullName: string
  subtile?: string
  linkTo: string
  image: string | undefined
}
export const ProfileButtonCard = (props: Props) => {
  const navigate = useNavigate()
  return (
    <Card
      role="navigation"
      sx={(theme) => ({
        position: 'sticky',
        top: 0,
        paddingY: 1.5,
        paddingX: props.isCollapseSidebar ? 0.75 : 2,
        transition: 'padding 100ms linear',
        border: 'none',
        backgroundColor: `transparent`,

        '&:hover': {
          backgroundColor: `rgba(${theme.vars.palette.primary.lightChannel} / 0.15)`
        },
        "&:has([aria-current='page'])": {
          backgroundColor: `rgba(${theme.vars.palette.primary.lightChannel} / 0.22)`
        }
      })}
    >
      <Stack direction={'row'} gap={2.1} alignItems={'center'}>
        <NavLink to={props.linkTo}>
          {({ isActive }) => (
            <Link
              component={Typography}
              onClick={() => navigate(props.linkTo, { replace: true })}
              overlay
              sx={{ position: 'relative' }}
              underline="none"
              aria-current={isActive ? 'page' : undefined}
            >
              {/** Luffy hat */}
              <Stack
                display={'none'}
                component={'img'}
                src={luffyHatImage}
                sx={{ rotate: '40deg' }}
                className="absolute right-[-50%] top-[-40%] w-[50px]  z-10"
              />
              <Avatar
                variant="soft"
                src={
                  props.image
                    ? `${convertFileSrc(props.image)}?removeCache=${new Date()}`
                    : undefined
                }
                size="sm"
              />
            </Link>
          )}
        </NavLink>

        <Stack>
          <Typography
            level="body-md"
            minWidth={'160px'}
            lineHeight={'1.25rem'}
            textColor={'text.primary'}
            className="!line-clamp-2"
          >
            <NavLink to={props.linkTo} tabIndex={-1}>
              {({ isActive }) => (
                <Link
                  component={Typography}
                  tabIndex={-1}
                  overlay
                  underline="none"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {props.fullName}
                </Link>
              )}
            </NavLink>
          </Typography>
          {props.subtile && (
            <Typography
              level="body-xs"
              lineHeight={'1rem'}
              fontWeight={'300'}
              textColor={'text.secondary'}
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {props.subtile}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}
