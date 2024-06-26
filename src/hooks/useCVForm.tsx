import {
  BaseDirectory,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { appDataDir } from "@tauri-apps/api/path";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { UserData } from "../pages/TestPage";
export const useCVForm = () => {
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
  return { formik, initialValues };
};
