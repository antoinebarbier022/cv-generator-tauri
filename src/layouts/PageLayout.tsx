import { Container, Divider, Stack, Typography } from "@mui/joy";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}
export const PageLayout = ({ title, children }: Props) => {
  return (
    <Stack component={Container} gap={4}>
      <Stack gap={1}>
        <Typography level="h2">{title}</Typography>
        <Divider></Divider>
      </Stack>
      {children}
    </Stack>
  );
};
