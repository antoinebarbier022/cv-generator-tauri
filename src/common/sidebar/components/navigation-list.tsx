import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator
} from '@mui/joy'
import { NavLink } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { NavigationType } from '../../../types/sidebar'

interface Props {
  navigation: NavigationType[]
}
export const NavigationList = (props: Props) => {
  return (
    <List
      sx={{
        paddingTop: 1,
        scrollbarGutter: 'stable',
        overscrollBehavior: 'none',
        scrollbarWidth: '0',
        overflow: 'auto',
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
                <NavLink to={value.to} className={'w-full no-underline'}>
                  {({ isActive }) => (
                    <ListItemButton tabIndex={-1} selected={isActive} sx={{ borderRadius: 'sm' }}>
                      <ListItemDecorator>{value.icon}</ListItemDecorator>
                      <ListItemContent>{value.label}</ListItemContent>
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
