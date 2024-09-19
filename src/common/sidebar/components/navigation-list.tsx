import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator
} from '@mui/joy'
import { NavLink, useNavigate } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { NavigationType } from '../../../types/sidebar'

interface Props {
  navigation: NavigationType[]
}
export const NavigationList = (props: Props) => {
  const navigate = useNavigate()
  return (
    <List
      sx={{
        my: '-6px',
        py: '6px',
        scrollbarGutter: 'stable',
        overscrollBehavior: 'none',
        scrollbarWidth: '0',
        overflow: 'auto',
        mx: '-6px',
        px: '6px',
        '::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      {props.navigation.map(
        (value, index) =>
          !value.hide && (
            <Fragment key={`nav-${index}-${value.to}`}>
              <ListItem>
                <NavLink to={value.to} tabIndex={-1} className={'w-full no-underline'}>
                  {({ isActive }) => (
                    <ListItemButton
                      onClick={() => {
                        if (value.to) {
                          navigate(value.to)
                        }
                      }}
                      selected={isActive}
                      sx={{ borderRadius: 'sm' }}
                    >
                      <ListItemDecorator>{value.icon}</ListItemDecorator>
                      <ListItemContent sx={{ whiteSpace: 'nowrap' }}>{value.label}</ListItemContent>
                    </ListItemButton>
                  )}
                </NavLink>
              </ListItem>
              {value.divider && <Divider sx={{ marginY: 1.5 }} />}
            </Fragment>
          )
      )}
    </List>
  )
}
