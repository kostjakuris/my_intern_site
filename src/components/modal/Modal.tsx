import "./Modal.min.css";
import ModalFunction from "../modal-function/ModalFunction";
import { ModalData } from "../modal-function/ModalFunction";
import ModalProfile from "../modal-function/ModalProfile";
import { FormData } from "../input/inputVariables";
import { useFormik } from "formik";
import { useState } from "react";
import Input from "../input/Input";
import cross from "../../icons/system-uicons_cross.svg";
import { ModalEditSchema } from "../input/ModalEditValidation";

const Modal = ({ active, setActive }: ModalData) => {
  const [hidePassword, setHidePassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      country: "",
      city: "",
      password: "",
      address: "",
    },
    validationSchema: ModalEditSchema,
    onSubmit: (values: FormData) => {
      console.log(values);
    },
  });
  return (
    <ModalFunction
      active={active}
      setActive={setActive}
      activeClassName={"modal__content active"}
      className={"modal__content"}
    >
      <div className="modal__top">
        <h3 className="form-wrapper-modal__title">Edit Profile</h3>
        <span className="cross__wrapper" onClick={() => setActive(false)}>
          <img src="icons/system-uicons_cross.svg" alt="cross" />
        </span>
      </div>
      <div className="form-wrapper-modal ">
        <form onSubmit={formik.handleSubmit}>
          <div className="signUp__form--modal">
            <div className="left__form--modal">
              <div className=" form__firstname ">
                <Input
                  id={"firstname"}
                  name={"firstname"}
                  type={"text"}
                  placeholder={"Firstname"}
                  className={"form firstName"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  touched={formik.touched.name}
                  errors={formik.errors.name}
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
                  value={formik.values.address}
                  touched={formik.touched.address}
                  errors={formik.errors.address}
                />
              </div>
            </div>

            <div className="right__form--modal">
              <div className=" form__lastname">
                <Input
                  id={"lastname"}
                  name={"lastname"}
                  type={"text"}
                  placeholder={"Lastname"}
                  className={"form lastName"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.surname}
                  touched={formik.touched.surname}
                  errors={formik.errors.surname}
                />
              </div>

              <div className=" form__password ">
                <Input
                  id={"password"}
                  name={"password"}
                  type={hidePassword ? "text" : "password"}
                  placeholder={"Password"}
                  className={"form password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  touched={formik.touched.password}
                  errors={formik.errors.password}
                />
                <span
                  className={hidePassword ? "hiding__icon-modal disabled" : "hiding__icon-modal"}
                  onClick={() => setHidePassword((prev) => !prev)}
                >
                  <img src="img/mdi_eye.jpg" alt="eye" />
                </span>
              </div>

              <div className=" form__town ">
                <Input
                  id={"town"}
                  name={"town"}
                  type={"text"}
                  placeholder={"Town"}
                  className={"form town"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  touched={formik.touched.city}
                  errors={formik.errors.city}
                />
              </div>
            </div>
          </div>

          <div className="buttons">
            <button className="cancel__button" onClick={() => setActive(false)}>
              Cancel
            </button>

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
                id={"firstname"}
                name={"firstname"}
                type={"text"}
                placeholder={"Firstname"}
                className={"form-modal firstName"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                touched={formik.touched.name}
                errors={formik.errors.name}
              />
            </div>

            <div className=" form__lastname">
              <Input
                id={"lastname"}
                name={"lastname"}
                type={"text"}
                placeholder={"Lastname"}
                className={"form-modal lastName"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.surname}
                touched={formik.touched.surname}
                errors={formik.errors.surname}
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
                value={formik.values.address}
                touched={formik.touched.address}
                errors={formik.errors.address}
              />
            </div>

            <div className=" form__password-modal ">
              <Input
                id={"password"}
                name={"password"}
                type={hidePassword ? "text" : "password"}
                placeholder={"Password"}
                className={"form-modal password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                touched={formik.touched.password}
                errors={formik.errors.password}
              />
              <span
                className={hidePassword ? "hiding__icon-modal disabled" : "hiding__icon-modal"}
                onClick={() => setHidePassword((prev) => !prev)}
              >
                <img src="img/mdi_eye.jpg" alt="eye" />
              </span>
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
                id={"town"}
                name={"town"}
                type={"text"}
                placeholder={"Town"}
                className={"form-modal town"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                touched={formik.touched.city}
                errors={formik.errors.city}
              />
            </div>
          </div>
          <div className="buttons">
            <button className="cancel__button" onClick={() => setActive(false)}>
              Cancel
            </button>

            <button className="submit__button-modal" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </ModalFunction>
  );
};

export default Modal;
