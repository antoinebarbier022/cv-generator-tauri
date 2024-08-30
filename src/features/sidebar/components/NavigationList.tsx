import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import { NavLink } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { NavigationType } from "../types/sidebar";

interface Props {
  navigation: NavigationType[];
}
export const NavigationList = (props: Props) => {
  return (
    <List>
      {props.navigation.map((value, index) => (
        <Fragment key={`nav-${index}-${value.to}`}>
          <ListItem sx={{ visibility: value.hide ? "hidden" : "visible" }}>
            <NavLink to={value.to} className={"w-full no-underline"}>
              {({ isActive }) => (
                <ListItemButton
                  tabIndex={-1}
                  selected={isActive}
                  sx={{ borderRadius: "sm" }}
                >
                  <ListItemDecorator>{value.icon}</ListItemDecorator>
                  <ListItemContent>{value.label}</ListItemContent>
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
          {value.divider && <Divider sx={{ marginY: 1.5 }} />}
        </Fragment>
      ))}
    </List>
  );
};
