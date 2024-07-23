import { MenuModal } from "../../components/menu-modal/menu-modal";

interface Props {
  open: boolean;
  onClose: () => void;
}
export const MenuModalReset = (props: Props) => {
  return (
    <MenuModal
      open={props.open}
      onClose={props.onClose}
      title="Menu Modal Reset"
    ></MenuModal>
  );
};
