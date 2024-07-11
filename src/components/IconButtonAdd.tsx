import { AddRounded } from "@mui/icons-material";
import { IconButton } from "@mui/joy";

interface Props {
  disabled?: boolean;
  onClick: () => void;
}
export const IconButtonAdd = (props: Props) => {
  return (
    <IconButton
      size="sm"
      variant="solid"
      color="primary"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <AddRounded />
    </IconButton>
  );
};
