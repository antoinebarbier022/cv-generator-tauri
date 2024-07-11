import { Avatar, Card, Link, Stack, Typography } from "@mui/joy";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { NavLink } from "react-router-dom";

interface Props {
  fullName: string;
  linkTo: string;
  image: string | undefined;
}
export const CardProfileButton = (props: Props) => {
  return (
    <Card
      role="navigation"
      sx={(theme) => ({
        paddingY: 1.5,
        paddingX: 2,
        "&:hover": {
          backgroundColor: `rgba(${theme.vars.palette.primary.lightChannel} / 0.05)`,
        },
        "&:has([aria-current='page'])": {
          backgroundColor: `rgba(${theme.vars.palette.primary.lightChannel} / 0.22)`,
        },
      })}
    >
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <Avatar
          variant="outlined"
          src={
            props.image
              ? `${convertFileSrc(props.image)}?removeCache=${new Date()}`
              : undefined
          }
          size="md"
        />

        <Typography level="body-md" textColor={"text.primary"}>
          <NavLink to={props.linkTo}>
            {({ isActive }) => (
              <Link
                component={Typography}
                overlay
                underline="none"
                aria-current={isActive ? "page" : undefined}
              >
                {props.fullName ?? "Profile"}
              </Link>
            )}
          </NavLink>
        </Typography>
      </Stack>
    </Card>
  );
};
