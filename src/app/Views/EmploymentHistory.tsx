import { SectionPage } from "../../features/cv-resume/containers/SectionPage";

export const EmploymentHistory = () => {
  return (
    <SectionPage
      sectionKey="employment_history"
      options={{
        inputType: "textarea",
        inputMaxWarningLength: 55,
      }}
    />
  );
};
