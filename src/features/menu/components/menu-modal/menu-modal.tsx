import { Modal, ModalClose, ModalDialog, Stack, Typography } from "@mui/joy";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  open: boolean;
  title?: string;
  onClose: () => void;
}
export const MenuModal = (props: Props) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalDialog
        sx={{ minWidth: { sm: "640px", lg: "60vw" }, maxWidth: { sm: "80vw" } }}
      >
        <ModalClose />
        {props.title && <Typography level="body-lg">{props.title}</Typography>}
        {props.children && <Stack>{props.children}</Stack>}
      </ModalDialog>
    </Modal>
  );
};
