import { Chip, Input, Stack } from "@mui/joy";
import { UUID } from "crypto";
import { useFormik } from "formik";
import debounce from "just-debounce-it";
import { useCallback } from "react";
import { CV_LANGUAGES } from "../../form/constants/cv-languages";
import { ResumeContentSection, Translation } from "../../storage/types/storage";
import {
  SectionItemLayout,
  SectionItemProps,
} from "../layouts/SectionItemLayout";

interface Props extends SectionItemProps {
  id: UUID;
  content: Translation;
  placeholder: string;
  onSubmit: (values: ResumeContentSection<Translation>) => void;
}

export const SectionItem = ({
  id,
  content,
  placeholder,
  onSubmit,
  ...rest
}: Props) => {
  const formik = useFormik<ResumeContentSection<Translation>>({
    initialValues: {
      id,
      content: content,
      isHidden: rest.isVisible,
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const debouncedSubmit = useCallback(
    debounce(() => formik.submitForm(), 500),
    [2000, formik.submitForm]
  );

  return (
    <SectionItemLayout {...rest}>
      <Stack flex={1} gap={1} marginTop={1}>
        {CV_LANGUAGES.map((lang) => (
          <Input
            key={`content.${lang}`}
            name={`content.${lang}`}
            startDecorator={
              <Chip
                sx={{
                  marginLeft: -0.75,
                }}
              >
                {lang}
              </Chip>
            }
            value={formik.values.content[lang]}
            onChange={(e) => {
              formik.handleChange(e);
              debouncedSubmit();
            }}
            placeholder={placeholder}
          />
        ))}
      </Stack>
    </SectionItemLayout>
  );
};
