import { Button, Stack } from "@mui/joy";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Test } from "../../components/Test";
import { PageLayout } from "../../layouts/page-layout";

export const TestView = () => {
  const [array] = useState(
    Array.from({ length: 1000 }, (_, index) => `${index + 1}`)
  );
  const queryClient = useQueryClient();

  return (
    <PageLayout>
      <Button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["profile"] })}
      >
        Refresh
      </Button>

      <Stack gap={4}>
        {array.map((_, index) => (
          <Test key={index} />
        ))}
      </Stack>
    </PageLayout>
  );
};
