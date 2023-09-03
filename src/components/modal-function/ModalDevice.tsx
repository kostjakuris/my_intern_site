import React from "react";
import { useFormik } from "formik";
import { DeviceFormData } from "../input/inputVariables";
import { EditUserSchema } from "../input/EditUserValidation";
import cross from "../../icons/system-uicons_cross.svg";
import Input from "../input/Input";

export type DeviceModalData = {
  active: boolean;
  setActive: (active: boolean) => void;
};

const ModalDevice = ({ ...props }: DeviceModalData) => {
  const formik = useFormik({
    initialValues: {
      deviceName: "",
      deviceType: "",
      email: "",
      country: "",
      city: "",
      adress: "",
    },
    validationSchema: EditUserSchema,
    onSubmit: (values: DeviceFormData) => {
      console.log(values);
    },
  });
  return (
    <div>
      <div className="modal__top">
        <h3 className="form-wrapper-modal__title">Edit Device</h3>
        <span className="cross__wrapper" onClick={() => props.setActive(false)}>
          <img src="icons/system-uicons_cross.svg" alt="cross" />
        </span>
      </div>
      <div className="form-wrapper-modal ">
        <form onSubmit={formik.handleSubmit}>
          <div className="signUp__form--modal">
            <div className="left__form--modal">
              <div className=" form__firstname ">
                <Input
                  id={"deviceName"}
                  name={"deviceName"}
                  type={"text"}
                  placeholder={"Device Name"}
                  className={"form firstName"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deviceName}
                  touched={formik.touched.deviceName}
                  errors={formik.errors.deviceName}
                />
              </div>

              <div className=" form__email ">
                <Input
                  id={"email"}
                  name={"email"}
                  type={"email"}
                  placeholder={"Email"}
                  className={"form email"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  touched={formik.touched.email}
                  errors={formik.errors.email}
                />
              </div>

              <div className=" form__country ">
                <Input
                  id={"country"}
                  name={"country"}
                  type={"text"}
                  placeholder={"Country"}
                  className={"form country"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  touched={formik.touched.country}
                  errors={formik.errors.country}
                />
              </div>

              <div className=" form__adress ">
                <Input
                  id={"adress"}
                  name={"adress"}
                  type={"text"}
                  placeholder={"Adress"}
                  className={"form adress"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.adress}
                  touched={formik.touched.adress}
                  errors={formik.errors.adress}
                />
              </div>
            </div>

            <div className="right__form--modal">
              <div className=" form__lastname">
                <Input
                  id={"deviceType"}
                  name={"deviceType"}
                  type={"text"}
                  placeholder={"Device Type"}
                  className={"form lastName"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deviceType}
                  touched={formik.touched.deviceType}
                  errors={formik.errors.deviceType}
                />
              </div>

              <div className=" form__town ">
                <Input
                  id={"city"}
                  name={"city"}
                  type={"text"}
                  placeholder={"City"}
                  className={"form town"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  touched={formik.touched.city}
                  errors={formik.errors.city}
                />
              </div>
              <div className=" form__serialNumber ">
                <Input
                  id={"serialNumber"}
                  name={"town"}
                  type={"text"}
                  placeholder={"Serial Number"}
                  className={"form serialNumber"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.serialNumber}
                  touched={formik.touched.serialNumber}
                  errors={formik.errors.serialNumber}
                />
              </div>
            </div>
          </div>

          <div className="buttons">
            <button className="cancel__button">Cancel</button>

            <button className="submit__button-modal" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="form-wrapper-modal--mobile ">
        <form onSubmit={formik.handleSubmit}>
          <div className="signUp__form--modal">
            <div className=" form__firstname ">
              <Input
                id={"deviceName"}
                name={"deviceName"}
                type={"text"}
                placeholder={"Device Name"}
                className={"form-modal firstName"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.deviceName}
                touched={formik.touched.deviceName}
                errors={formik.errors.deviceName}
              />
            </div>

            <div className=" form__lastname">
              <Input
                id={"deviceType"}
                name={"deviceType"}
                type={"text"}
                placeholder={"Device Type"}
                className={"form-modal lastName"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.deviceType}
                touched={formik.touched.deviceType}
                errors={formik.errors.deviceType}
              />
            </div>

            <div className=" form__email-modal ">
              <Input
                id={"email"}
                name={"email"}
                type={"email"}
                placeholder={"Email"}
                className={"form-modal email"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                touched={formik.touched.email}
                errors={formik.errors.email}
              />
            </div>

            <div className=" form__adress-modal ">
              <Input
                id={"adress"}
                name={"adress"}
                type={"text"}
                placeholder={"Adress"}
                className={"form-modal adress"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.adress}
                touched={formik.touched.adress}
                errors={formik.errors.adress}
              />
            </div>

            <div className=" form__country ">
              <Input
                id={"country"}
                name={"country"}
                type={"text"}
                placeholder={"Country"}
                className={"form-modal country"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                touched={formik.touched.country}
                errors={formik.errors.country}
              />
            </div>

            <div className=" form__town ">
              <Input
                id={"city"}
                name={"city"}
                type={"text"}
                placeholder={"City"}
                className={"form-modal town"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                touched={formik.touched.city}
                errors={formik.errors.city}
              />
            </div>
            <div className=" form__town ">
              <Input
                id={"serialNumber"}
                name={"serialNumber"}
                type={"text"}
                placeholder={"Serial Number"}
                className={"form-modal town"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.serialNumber}
                touched={formik.touched.serialNumber}
                errors={formik.errors.serialNumber}
              />
            </div>
          </div>

          <div className="buttons">
            <button className="cancel__button">Cancel</button>

            <button className="submit__button-modal" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalDevice;
