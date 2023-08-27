import React from "react";

export type ModalData = {
  active: boolean;
  setActive: (active: boolean) => void;
  children?: React.ReactNode;
};

const ModalFunction = ({ active, setActive, children }: ModalData) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className={active ? "modal__content active" : "modal__content"} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalFunction;
