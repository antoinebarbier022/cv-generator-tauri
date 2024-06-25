import { Alert, Button, Container, Stack, Typography } from "@mui/joy";
import {
  BaseDirectory,
  exists,
  readBinaryFile,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { appDataDir, downloadDir, resolveResource } from "@tauri-apps/api/path";
import { Command } from "@tauri-apps/api/shell";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Store } from "tauri-plugin-store-api";
import { UserForm } from "../components/UserForm";

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
  const [message, setMessage] = useState("");

  useEffect(() => {
    exists("user-data.json", { dir: BaseDirectory.AppData }).then((exist) => {
      if (!exist) {
        setInitialValues(emptyInitialValues);
      } else {
        readTextFile("user-data.json", { dir: BaseDirectory.AppData }).then(
          (data) => {
            setInitialValues(JSON.parse(data));
          }
        );
      }
    });
  }, []);

  const [error, setError] = useState("");

  const [, setFile] = useState<Uint8Array | null>(null);

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

  const emptyInitialValues: UserData = {
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    grade: "",
    entity: "",
    team: "",
    description: "",
    linkedin: "",
    twitter: "",
    github: "",
    formations: [],
    employment_history: [],
    articles_and_others: [],
    sectors: [],
    skills: [],
    languages: [],
    experiences: [],
  };
  const [initialValues, setInitialValues] = useState<UserData | null>(null);

  const formik = useFormik<UserData>({
    initialValues: initialValues ?? emptyInitialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      await writeTextFile(
        { path: "user-data.json", contents: JSON.stringify(values) },
        { dir: BaseDirectory.AppData }
      );
      const data: UserData = JSON.parse(
        await readTextFile("user-data.json", { dir: BaseDirectory.AppData })
      );
      const appDataDirPath = await appDataDir();
      console.log(appDataDirPath);
      console.log(data);
    },
  });

  if (!initialValues) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Stack component={Container} gap={4}>
      <UserForm formik={formik} />

      <Button
        onClick={async () => {
          const resourceDataPath = await resolveResource("resources");
          const resourceTemplatePath = await resolveResource(
            "resources/CV_Nom_Prenom_Capability.pptx"
          );

          console.log(resourceDataPath);
          console.log(resourceTemplatePath);
          const command = Command.sidecar("binaries/main", [
            "--data-folder",
            resourceDataPath,
            "--template",
            resourceTemplatePath,
            "--output-folder",
            await downloadDir(),
          ]);
          const output = await command.execute();
          const test = await readBinaryFile(
            resourceDataPath + "/test_presentation.pptx"
          );

          setFile(test);
          console.log(test);
          setMessage(output.stdout);
          setError(output.stderr);
          console.log(output);
        }}
      >
        Test Python script
      </Button>
      {message && <Alert color="success">{message} </Alert>}
      {error && <Alert color="danger">{error}</Alert>}
    </Stack>
  );
};
