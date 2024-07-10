import { Typography } from "@mui/joy";

interface Props {
  program: string;
  client: string;
  date: string;
}
export const ProjectTitle = (props: Props) => {
  return (
    <Typography
      level="title-md"
      fontWeight={"400"}
      sx={{
        display: "-webkit-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {props.program || <span className="text-gray-400 italic">Program</span>} -{" "}
      {props.client || <span className="text-gray-400 italic">Client</span>} -{" "}
      {props.date || <span className="text-gray-400 italic">Date</span>}
    </Typography>
  );
};
