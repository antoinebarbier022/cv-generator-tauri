import { SectionPage } from "../../features/sections/containers/SectionPage";

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
