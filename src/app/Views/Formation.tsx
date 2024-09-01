import { SectionPage } from "../../features/sections/containers/SectionPage";

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
