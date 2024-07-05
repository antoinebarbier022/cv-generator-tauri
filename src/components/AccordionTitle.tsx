import { Typography } from "@mui/joy";

interface Props {
  content: string;
  placeholder: string;
  index: number;
}
export const AccordionTitle = (props: Props) => {
  return (
    <Typography level="title-md" fontWeight={"400"}>
      {props.content || (
        <span className="text-gray-400 italic">{props.placeholder}</span>
      )}
    </Typography>
  );
};
