import { useFormik } from "formik";
import debounce from "just-debounce-it";
import { useCallback, useEffect } from "react";

import { emptyInitialContentResume } from "../../../constants/emptyInitialContentResume";
import { UserData } from "../types/storage";
import { useGetDataStorage } from "./useGetDataStorage";
import { useSetDataStorage } from "./useSetDataStorage";

export const useFormCV = () => {
  const userData = useGetDataStorage();
  const dataMutation = useSetDataStorage();

  const formik = useFormik<UserData>({
    initialValues: userData.data ?? emptyInitialContentResume,
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
