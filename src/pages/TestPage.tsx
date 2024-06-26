import { Container, Stack, Typography } from "@mui/joy";
import { appDataDir } from "@tauri-apps/api/path";
import { Store } from "tauri-plugin-store-api";

export interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  grade: string;
  entity: string;
  team: string;
  description: string;
  linkedin: string;
  twitter: string;
  github: string;
  formations: string[];
  employment_history: string[];
  articles_and_others: string[];
  sectors: string[];
  skills: string[];
  languages: string[];
  experiences: UserDataExperience[];
}

export interface UserDataExperience {
  program: string;
  client: string;
  role: string;
  date: string;
  context: string;
  contribution: string;
}

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
    </Stack>
  );
};
