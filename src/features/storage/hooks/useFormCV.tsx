import { useFormik } from "formik";
import debounce from "just-debounce-it";
import { useCallback, useEffect, useMemo } from "react";

import { emptyInitialContentResume } from "../../../constants/emptyInitialContentResume";
import { UserData } from "../types/storage";
import { useGetDataStorage } from "./useGetDataStorage";
import { useSetDataStorage } from "./useSetDataStorage";

export const useFormCV = () => {
  const userData = useGetDataStorage();
  const dataMutation = useSetDataStorage();

  const initialValues = useMemo(() => userData.data, [userData.data]);

  const formik = useFormik<UserData>({
    initialValues: initialValues ?? emptyInitialContentResume,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      dataMutation.mutate({ values });
    },
  });

  const debouncedSubmit = useCallback(
    debounce(() => formik.submitForm(), 500),
    [2000, formik.submitForm]
  );

  useEffect(() => {
    if (userData.data !== undefined && formik.values !== userData.data) {
      debouncedSubmit();
    }
  }, [debouncedSubmit, formik.values]);

  return { formik, userData };
};
