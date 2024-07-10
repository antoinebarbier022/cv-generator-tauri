import { Alert, Container, Divider, Stack, Typography } from "@mui/joy";
import { PropsWithChildren, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props extends PropsWithChildren {
  title: string;
  endDecorator?: ReactNode;
}
export const PageLayout = ({ title, endDecorator, children }: Props) => {
  return (
    <Stack component={Container} gap={4}>
      <Stack gap={1}>
        <Stack>
          <Typography level="h2">{title}</Typography>
          {endDecorator}
        </Stack>

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
