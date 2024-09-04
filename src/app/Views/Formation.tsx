import { SectionPage } from "../../features/cv-resume/containers/SectionPage";

export const Formation = () => {
  return (
    <SectionPage
      sectionKey="formation"
      options={{
        inputType: "textarea",
        inputMaxWarningLength: 55,
      }}
    />
  );
};
