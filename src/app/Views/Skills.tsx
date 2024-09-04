import { SectionPage } from "../../features/cv-resume/containers/SectionPage";

export const Skills = () => {
  return (
    <SectionPage
      sectionKey="skills"
      options={{
        inputType: "textarea",
      }}
    />
  );
};
