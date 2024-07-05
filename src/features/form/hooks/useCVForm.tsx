import { useFormik } from "formik";
import debounce from "just-debounce-it";
import { useCallback, useEffect } from "react";

import { useGetDataStorage } from "../../storage/hooks/useGetDataStorage";
import { useSetDataStorage } from "../../storage/hooks/useSetDataStorage";
import { UserData } from "../../storage/types/storage";

export const useCVForm = () => {
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

  const userData = useGetDataStorage();
  const dataMutation = useSetDataStorage();

  const formik = useFormik<UserData>({
    initialValues: userData.data ?? emptyInitialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dataMutation.mutate({ values });
    },
  });

  const debouncedSubmit = useCallback(
    debounce(() => formik.submitForm(), 2000),
    [2000, formik.submitForm]
  );

  useEffect(() => {
    if (userData.data !== undefined && formik.values !== userData.data) {
      debouncedSubmit();
    }
  }, [debouncedSubmit, formik.values]);

  return { formik, userData };
};
