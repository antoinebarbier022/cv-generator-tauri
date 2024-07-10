import { Alert, Container, Divider, Stack, Typography } from "@mui/joy";
import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

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
      <ErrorBoundary
        fallback={<Alert color="danger">Something went wrong</Alert>}
      >
        {children}
      </ErrorBoundary>
    </Stack>
  );
};
