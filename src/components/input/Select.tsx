import React from "react";
const Select = ({ ...props }) => {
  return (
    <div>
      <select {...props} />
      {props.touched && props.errors ? <div className="form__label">{props.errors}</div> : null}
    </div>
  );
};

export default Select;
