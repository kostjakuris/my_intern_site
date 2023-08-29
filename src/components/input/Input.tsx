import React from "react";
const Input = ({ ...props }) => {
  return (
    <div>
      <input {...props} />
      {props.touched && props.errors ? <div className="form__label">{props.errors}</div> : null}
    </div>
  );
};

export default Input;
