import { Button, Stack } from "@mui/joy";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import debounce from "just-debounce-it";
import { ChangeEvent, ChangeEventHandler, useCallback } from "react";
import { Test2 } from "../../components/Test2";

import { PageLayout } from "../../layouts/page-layout";

import { create } from "zustand";

interface Data {
  test1: string;
  test2: string;
}

interface State {
  values: Data;
  setValues: (key: string, value: string) => void;
}

export const useTest2Store = create<State>((set) => ({
  values: {
    test1: "",
    test2: "",
  },
  setValues: (key: string, value: string) => {
    set((state) => ({ values: { ...state.values, [key]: value } }));
  },
}));

export const Test2View = () => {
  const queryClient = useQueryClient();

  const formik = useFormik<Data>({
    initialValues: {
      test1: "",
      test2: "",
    },
    onSubmit: (values) => {
      console.log("envoyé", { values });
    },
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> | undefined =
    useCallback(
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        setTimeout(() => formik.submitForm(), 500);
      }, 2000),
      [2000, formik.submitForm]
    );

  return (
    <PageLayout>
      <Button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["profile"] })}
      >
        Refresh
      </Button>
      {formik.values.test1}
      {formik.values.test2}
      <form>
        <Stack gap={4}>
          <Test2
            name={`test1`}
            defaultValue={formik.values.test1}
            //value={formik.values.test[index]}
            onChange={(e) => {
              handleChange(e);
            }}
            onBlur={formik.handleBlur}
          />
          <Test2
            name={`test2`}
            defaultValue={formik.values.test2}
            //value={formik.values.test[index]}
            onChange={(e) => {
              handleChange(e);
            }}
            onBlur={formik.handleBlur}
          />
        </Stack>
      </form>
    </PageLayout>
  );
};
