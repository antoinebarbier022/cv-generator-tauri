import { Typography } from "@mui/joy";

interface Props {
  path: string;
}
export const CurrentPowerpointPath = ({ path }: Props) => {
  return <Typography>{path}</Typography>;
};
