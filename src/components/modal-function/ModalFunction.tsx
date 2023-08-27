import React from "react";

export type ModalData = {
  active: boolean;
  setActive: (active: boolean) => void;
  children?: React.ReactNode;
  activeClassName: string;
  className: string;
};

const ModalFunction = ({ active, setActive, children, activeClassName, className }: ModalData) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className={active ? activeClassName : className} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalFunction;
