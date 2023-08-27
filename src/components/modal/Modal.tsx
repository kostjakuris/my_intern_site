import "./Modal.min.css";
import ModalFunction from "../modal-function/ModalFunction";
import { ModalData } from "../modal-function/ModalFunction";
import ModalProfile from "../modal-function/ModalProfile";

const Modal = ({ active, setActive }: ModalData) => {
  return (
    <ModalFunction
      active={active}
      setActive={setActive}
      activeClassName={"modal__content active"}
      className={"modal__content"}
    >
      <ModalProfile
        active={active}
        setActive={setActive}
        activeClassName={"modal__content active"}
        className={"modal__content"}
      />
    </ModalFunction>
  );
};

export default Modal;
