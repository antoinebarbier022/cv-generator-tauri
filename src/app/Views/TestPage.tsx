import { Button, Container, Stack, Typography } from "@mui/joy";
import { appDataDir } from "@tauri-apps/api/path";
import { Store } from "tauri-plugin-store-api";

export const TestPage = () => {
  const handleSubmit = async () => {
    const store = new Store("user-data.json");
    console.log(store);

    await store.set("fullName", { value: "Antoine Barbier" });
    const appDataDirPath = await appDataDir();
    console.log(appDataDirPath);
    const val = await store.get<{ value: number }>("fullName");

    if (val) {
      console.log(val);
    } else {
      console.log("val is null");
    }

    await store.save();
  };

  return (
    <Stack component={Container} gap={4}>
      <Typography>Test page</Typography>
      <Button onClick={handleSubmit}>Test</Button>
    </Stack>
  );
};
