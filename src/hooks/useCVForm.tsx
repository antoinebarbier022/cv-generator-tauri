import {
  BaseDirectory,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { appDataDir } from "@tauri-apps/api/path";
import { useFormik } from "formik";
import debounce from "just-debounce-it";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserData } from "../pages/TestPage";

export const useCVForm = () => {
  const [searchParams] = useSearchParams();

  const FILE = `data.json`;

  const emptyInitialValues: UserData = {
    firstname: "",
    lastname: "",
    email: "",
    role: {
      en: "",
      fr: "",
    },
    grade: "",
    entity: "",
    team: "",
    description: {
      en: "",
      fr: "",
    },
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
    exists(FILE, { dir: BaseDirectory.AppData }).then((exist) => {
      if (!exist) {
        setInitialValues(emptyInitialValues);
      } else {
        readTextFile(FILE, { dir: BaseDirectory.AppData }).then((data) => {
          setInitialValues(JSON.parse(data));
        });
      }
    });
  }, [FILE, searchParams]);

  const formik = useFormik<UserData>({
    initialValues: initialValues ?? emptyInitialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      //alert(JSON.stringify(values, null, 2));
      await writeTextFile(
        { path: FILE, contents: JSON.stringify(values) },
        { dir: BaseDirectory.AppData }
      );
      const data: UserData = JSON.parse(
        await readTextFile(FILE, { dir: BaseDirectory.AppData })
      );
      const appDataDirPath = await appDataDir();
      console.log(appDataDirPath);
      console.log(data);
    },
  });

  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const debouncedSubmit = useCallback(
    debounce(
      () =>
        formik.submitForm().then(() => setLastSaved(new Date().toISOString())),
      2000
    ),
    [2000, formik.submitForm]
  );

  useEffect(() => {
    if (initialValues !== null && formik.values !== initialValues) {
      debouncedSubmit();
    }
  }, [debouncedSubmit, formik.values]);

  return { formik, initialValues, lastSaved };
};
