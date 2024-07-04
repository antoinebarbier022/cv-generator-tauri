import { AddRounded, DeleteOutline } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Button,
  Card,
  Chip,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { FormikProps } from "formik";
import { useState } from "react";
import { CV_LANGUAGES } from "../../constants/languages";
import { UserData, UserDataExperience } from "../../pages/TestPage";

interface Props {
  formik: FormikProps<UserData>;
}

export const ProjectsForm = ({ formik }: Props) => {
  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    number | null
  >(0);
  return (
    <Stack component="form" gap={4} onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
        <AccordionGroup disableDivider>
          <Stack gap={1}>
            {formik.values.experiences?.map((field, index) => (
              <Stack
                direction={"row"}
                key={index}
                sx={{
                  "--project-accordion-summary-height": "3rem",
                }}
                gap={1}
                alignItems={"center"}
              >
                <Typography textColor={"text.tertiary"}>
                  #{String(index + 1).padStart(2, "0")}
                </Typography>

                <Card sx={{ padding: 0, overflow: "hidden", flex: 1 }}>
                  <Stack
                    direction={"row-reverse"}
                    alignItems={"start"}
                    justifyContent={"space-between"}
                    gap={1}
                  >
                    <Stack
                      sx={{
                        height: "var(--project-accordion-summary-height)",
                        marginRight: 1,
                      }}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <IconButton
                        color="neutral"
                        size="sm"
                        variant="plain"
                        onClick={() =>
                          formik.setFieldValue("experiences", [
                            ...(formik.values.experiences?.filter(
                              (_, i) => i !== index
                            ) ?? []),
                          ])
                        }
                        sx={{ width: "fit-content" }}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Stack>
                    <Accordion
                      sx={{ flex: 1 }}
                      expanded={indexExpandedAccordion === index}
                      onChange={(_, expanded) => {
                        setIndexExpandedAccordion(expanded ? index : null);
                      }}
                    >
                      <AccordionSummary
                        sx={{
                          height: "var(--project-accordion-summary-height)",
                        }}
                      >
                        <Stack
                          direction={"row"}
                          justifyContent={"center"}
                          gap={1}
                        >
                          <Typography level="title-md" fontWeight={"400"}>
                            {field.program || (
                              <span className="text-gray-400 italic">
                                Program
                              </span>
                            )}{" "}
                            -{" "}
                            {field.client || (
                              <span className="text-gray-400 italic">
                                Client
                              </span>
                            )}{" "}
                            -{" "}
                            {field.date || (
                              <span className="text-gray-400 italic">Date</span>
                            )}
                          </Typography>
                        </Stack>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack
                          component={"fieldset"}
                          gap={2}
                          sx={{ position: "relative", flex: 1, border: "none" }}
                        >
                          <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                            <FormControl sx={{ flex: 1 }}>
                              <FormLabel>Program</FormLabel>
                              <Input
                                size="sm"
                                name={`experiences[${index}].program`}
                                placeholder="Program"
                                value={field.program}
                                onChange={formik.handleChange}
                                autoComplete="off"
                                error={
                                  formik.touched.experiences &&
                                  Boolean(formik.errors.experiences)
                                }
                              />
                            </FormControl>
                            <FormControl sx={{ flex: 1 }}>
                              <FormLabel>Client</FormLabel>
                              <Input
                                size="sm"
                                name={`experiences[${index}].client`}
                                placeholder="Client"
                                value={field.client}
                                onChange={formik.handleChange}
                                autoComplete="off"
                                error={
                                  formik.touched.experiences &&
                                  Boolean(formik.errors.experiences)
                                }
                              />
                            </FormControl>
                            <FormControl sx={{ flex: 1 }}>
                              <FormLabel>Date</FormLabel>
                              <Input
                                size="sm"
                                name={`experiences[${index}].date`}
                                placeholder="Date"
                                value={field.date}
                                onChange={formik.handleChange}
                                autoComplete="off"
                                error={
                                  formik.touched.experiences &&
                                  Boolean(formik.errors.experiences)
                                }
                              />
                            </FormControl>
                          </Stack>

                          <FormControl>
                            <FormLabel>Context</FormLabel>
                            <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                              {CV_LANGUAGES.map((lang) => (
                                <Textarea
                                  key={`experiences[${index}].context.${lang}`}
                                  name={`experiences[${index}].context.${lang}`}
                                  size="sm"
                                  startDecorator={<Chip size="sm">{lang}</Chip>}
                                  placeholder="Context"
                                  value={field.context[lang]}
                                  onChange={formik.handleChange}
                                  autoComplete="off"
                                  minRows={2}
                                  maxRows={4}
                                  error={
                                    formik.touched.experiences &&
                                    Boolean(formik.errors.experiences)
                                  }
                                />
                              ))}
                            </Stack>
                          </FormControl>
                          <FormControl>
                            <FormLabel>Contribution</FormLabel>
                            <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                              {CV_LANGUAGES.map((lang) => (
                                <Textarea
                                  key={`experiences[${index}].contribution.${lang}`}
                                  name={`experiences[${index}].contribution.${lang}`}
                                  startDecorator={<Chip size="sm">{lang}</Chip>}
                                  size="sm"
                                  placeholder="Contribution"
                                  value={field.contribution[lang]}
                                  onChange={formik.handleChange}
                                  autoComplete="off"
                                  minRows={3}
                                  maxRows={6}
                                  error={
                                    formik.touched.experiences &&
                                    Boolean(formik.errors.experiences)
                                  }
                                />
                              ))}
                            </Stack>
                          </FormControl>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </Stack>
                </Card>
              </Stack>
            ))}
            <Button
              size="sm"
              variant="outlined"
              startDecorator={<AddRounded />}
              disabled={Boolean(formik.errors.experiences)}
              sx={{
                position: "fixed",
                top: "2rem",
                right: "2rem",
              }}
              onClick={() =>
                formik.setFieldValue("experiences", [
                  ...(formik.values.experiences ?? []),
                  {
                    client: "",
                    program: "",
                    role: "",
                    date: "",
                    context: {
                      en: "",
                      fr: "",
                    },
                    contribution: {
                      en: "",
                      fr: "",
                    },
                  } as UserDataExperience,
                ])
              }
            >
              Add Project
            </Button>
          </Stack>
        </AccordionGroup>
      </Stack>
    </Stack>
  );
};
