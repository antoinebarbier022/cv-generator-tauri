import { Alert, Container, Divider, Stack, Typography } from "@mui/joy";
import { PropsWithChildren, ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

interface Props extends PropsWithChildren {
  title: string;
  endDecorator?: ReactNode;
}
export const PageLayout = ({ title, endDecorator, children }: Props) => {
  const fallbackRender = ({ error }: FallbackProps) => {
    return (
      <Alert color="danger">
        <Stack gap={1}>
          <p className="m-0">Something went wrong...</p>
          <pre className="m-0">{error.message}</pre>
        </Stack>
      </Alert>
    );
  };

  return (
    <Stack component={Container} gap={4}>
      <Stack gap={1}>
        <Stack>
          <Typography level="h2">{title}</Typography>
          {endDecorator}
        </Stack>

        <Divider></Divider>
      </Stack>
      <ErrorBoundary fallbackRender={fallbackRender}>{children}</ErrorBoundary>
    </Stack>
  );
};
