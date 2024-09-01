import { Chip, Input, Stack, Textarea, Typography } from "@mui/joy";
import { UUID } from "crypto";
import { useFormik } from "formik";
import debounce from "just-debounce-it";
import { Fragment, useCallback } from "react";
import { AccordionTitle } from "../../../components/AccordionTitle";
import { CV_LANGUAGES } from "../../form/constants/cv-languages";
import { ResumeContentSection, Translation } from "../../storage/types/storage";
import {
  SectionItemLayout,
  SectionItemProps,
} from "../layouts/SectionItemLayout";

interface Props extends Omit<SectionItemProps, "title"> {
  id: UUID;
  maxWarningLength?: number;
  titlePlaceholder?: string;
  content: Translation;
  placeholder: string;
  inputType?: "input" | "textarea";
  onSubmit: (values: ResumeContentSection<Translation>) => void;
}

export const SectionItem = ({
  id,
  inputType = "input",
  titlePlaceholder,
  maxWarningLength,
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
    <SectionItemLayout
      title={
        <AccordionTitle
          isWarningIcon={Boolean(
            (formik.values.content.fr && !formik.values.content.en) ||
              (!formik.values.content.fr && formik.values.content.en)
          )}
          content={
            Boolean(formik.values.content.fr)
              ? formik.values.content.fr
              : formik.values.content.en
          }
          placeholder={titlePlaceholder}
        />
      }
      {...rest}
    >
      <Stack flex={1} gap={1} marginTop={1}>
        {CV_LANGUAGES.map((lang) => (
          <Fragment key={`content.${lang}`}>
            {inputType === "input" && (
              <Input
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
            )}
            {inputType === "textarea" && (
              <Textarea
                name={`content.${lang}`}
                startDecorator={<Chip>{lang}</Chip>}
                value={formik.values.content[lang]}
                minRows={2}
                maxRows={2}
                onChange={(e) => {
                  formik.handleChange(e);
                  debouncedSubmit();
                }}
                placeholder={placeholder}
                slotProps={{
                  endDecorator: {
                    sx: {
                      alignSelf: "flex-end",
                    },
                  },
                }}
                endDecorator={
                  maxWarningLength && (
                    <Typography
                      level="body-xs"
                      textColor={"neutral.500"}
                      sx={{ ml: "auto" }}
                    >
                      <Typography
                        textColor={
                          content[lang].length > maxWarningLength
                            ? "danger.400"
                            : "neutral.400"
                        }
                      >
                        {content[lang].length}
                      </Typography>{" "}
                      / {maxWarningLength}
                    </Typography>
                  )
                }
              />
            )}
          </Fragment>
        ))}
      </Stack>
    </SectionItemLayout>
  );
};
