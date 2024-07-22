import { useFormik } from "formik";
import debounce from "just-debounce-it";
import { useCallback, useEffect, useMemo } from "react";

import { DropResult } from "react-beautiful-dnd";
import { emptyInitialContentResume } from "../../../constants/emptyInitialContentResume";
import { reorderListSection } from "../../../utils/drag-and-drop.utils";
import { ResumeContentSection, Translation, UserData } from "../types/storage";
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

  type ResumeSectionFieldName =
    | "employment_history"
    | "skills"
    | "languages"
    | "formation"
    | "experiences";

  const handleAddItemSection = ({
    fieldName,
  }: {
    fieldName: ResumeSectionFieldName;
  }) => {
    const fieldValue = () => {
      switch (fieldName) {
        case "employment_history":
        case "skills":
        case "languages":
        case "formation":
        default:
          return {
            id: crypto.randomUUID(),
            content: { fr: "", en: "" },
          } as ResumeContentSection<Translation>;
      }
    };

    formik.setFieldValue(fieldName, [
      fieldValue(),
      ...(formik.values[fieldName] ?? []),
    ]);
    formik.submitForm();
  };

  const dragEnded = (result: DropResult, fieldName: ResumeSectionFieldName) => {
    if (!result.destination) {
      return;
    }

    const items = reorderListSection(
      formik.values[fieldName],
      result.source.index,
      result.destination.index
    );

    formik.setFieldValue(fieldName, items);
    formik.submitForm();
  };

  const handleDeleteItemSection = ({
    fieldName,
    idSelected,
  }: {
    fieldName: ResumeSectionFieldName;
    idSelected: string;
  }) => {
    formik.setFieldValue(fieldName, [
      ...(formik.values[fieldName]?.filter((v) => v.id !== idSelected) ?? []),
    ]);
    formik.submitForm();
  };

  const debouncedSubmit = useCallback(
    debounce(() => formik.submitForm(), 500),
    [2000, formik.submitForm]
  );

  useEffect(() => {
    if (userData.data !== undefined && formik.values !== userData.data) {
      debouncedSubmit();
    }
  }, [debouncedSubmit, formik.values]);

  return {
    formik,
    userData,
    handleAddItemSection,
    handleDeleteItemSection,
    dragEnded,
  };
};
