import { useFormik } from "formik";
import React, { useState } from "react";
import Input from "../input/Input";
import { ModalCreateSchema } from "../input/ModalCreateValidation";
import Select from "../input/Select";
import { useAppDispatch } from "../../Hook";
import { ValuesData } from "../input/inputVariables";

export type ModalProfileData = {
  active: boolean;
  setActive: (active: boolean) => void;
  children?: React.ReactNode;
  activeClassName: string;
  title?: string;
  setName: (value: string) => void;
  setSurname: (value: string) => void;
  setEmail: (value: string) => void;
  setCountry: (value: string) => void;
  setCity: (value: string) => void;
  setPassword: (value: string) => void;
  setRole: (value: string) => void;
  setAddress: (value: string) => void;
  onCreateUserSubmit: (values: ValuesData) => void;
};

const ModalProfile = ({ ...props }: ModalProfileData) => {
  const [hidePassword, setHidePassword] = useState(false);
  const dispatch = useAppDispatch();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      country: "",
      city: "",
      password: "",
      address: "",
      role: "",
      phone_number: "098765434",
    },
    validationSchema: ModalCreateSchema,
    onSubmit: async () => {
      props.onCreateUserSubmit(values);
    },
  });

  props.setName(values.name);
  props.setSurname(values.surname);
  props.setEmail(values.email);
  props.setRole(values.role);
  props.setPassword(values.password);
  props.setAddress(values.address);
  props.setCountry(values.country);
  props.setCity(values.city);

  return (
    <div>
      <div className="modal__top">
        <h3 className="form-wrapper-modal__title">{props.title}</h3>
        <span className="cross__wrapper" onClick={() => props.setActive(false)}>
          <img src="icons/system-uicons_cross.svg" alt="cross" />
        </span>
      </div>
      <div className="form-wrapper-modal ">
        <form onSubmit={handleSubmit}>
          <div className="signUp__form--modal">
            <div className="left__form--modal">
              <div className=" form__firstname ">
                <Input
                  id={"name"}
                  name={"name"}
                  type={"text"}
                  placeholder={"Firstname"}
                  className={"form firstName"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  touched={touched.name}
                  errors={errors.name}
                />
              </div>

              <div className=" form__email ">
                <Input
                  id={"email"}
                  name={"email"}
                  type={"email"}
                  placeholder={"Email"}
                  className={"form email"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  touched={touched.email}
                  errors={errors.email}
                />
              </div>

              <div className=" form__country ">
                <Input
                  id={"country"}
                  name={"country"}
                  type={"text"}
                  placeholder={"Country"}
                  className={"form country"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                  touched={touched.country}
                  errors={errors.country}
                />
              </div>

              <div className=" form__adress ">
                <Input
                  id={"address"}
                  name={"address"}
                  type={"text"}
                  placeholder={"Adress"}
                  className={"form adress"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  touched={touched.address}
                  errors={errors.address}
                />
              </div>
            </div>

            <div className="right__form--modal">
              <div className=" form__lastname">
                <Input
                  id={"surname"}
                  name={"surname"}
                  type={"text"}
                  placeholder={"Lastname"}
                  className={"form lastName"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.surname}
                  touched={touched.surname}
                  errors={errors.surname}
                />
              </div>

              <div className=" form__password ">
                <Input
                  id={"password"}
                  name={"password"}
                  type={hidePassword ? "text" : "password"}
                  placeholder={"Password"}
                  className={"form password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  touched={touched.password}
                  errors={errors.password}
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
                  id={"city"}
                  name={"city"}
                  type={"text"}
                  placeholder={"Town"}
                  className={"form town"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  touched={touched.city}
                  errors={errors.city}
                />
              </div>
              <div className=" form__select--desktop ">
                <Select
                  id={"role"}
                  name={"role"}
                  type={"text"}
                  placeholder={"Role"}
                  className={"form role"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.role}
                  touched={touched.role}
                  errors={errors.role}
                >
                  <option value="" disabled defaultValue={"Role"} className="date-pagination__option">
                    Role
                  </option>
                  <option value="customer" className="date-pagination__option">
                    Customer
                  </option>
                  <option value="device_owner" className="date-pagination__option">
                    Device owner
                  </option>
                  <option value="regional_admin" className="date-pagination__option">
                    Regional admin
                  </option>
                  <option value="super_admin" className="date-pagination__option">
                    Super admin
                  </option>
                </Select>
              </div>
            </div>
          </div>

          <div className="buttons">
            <button className="cancel__button" onClick={() => props.setActive(false)}>
              Cancel
            </button>

            <button className="submit__button-modal" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="form-wrapper-modal--mobile ">
        <form onSubmit={handleSubmit}>
          <div className="signUp__form--modal">
            <div className=" form__firstname ">
              <Input
                id={"name"}
                name={"name"}
                type={"text"}
                placeholder={"Firstname"}
                className={"form-modal firstName"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                touched={touched.name}
                errors={errors.name}
              />
            </div>

            <div className=" form__lastname">
              <Input
                id={"surname"}
                name={"surname"}
                type={"text"}
                placeholder={"Lastname"}
                className={"form-modal lastName"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.surname}
                touched={touched.surname}
                errors={errors.surname}
              />
            </div>

            <div className=" form__email-modal ">
              <Input
                id={"email"}
                name={"email"}
                type={"email"}
                placeholder={"Email"}
                className={"form-modal email"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                touched={touched.email}
                errors={errors.email}
              />
            </div>

            <div className=" form__adress-modal ">
              <Input
                id={"address"}
                name={"address"}
                type={"text"}
                placeholder={"Adress"}
                className={"form-modal adress"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                touched={touched.address}
                errors={errors.address}
              />
            </div>

            <div className=" form__password-modal ">
              <Input
                id={"password"}
                name={"password"}
                type={hidePassword ? "text" : "password"}
                placeholder={"Password"}
                className={"form-modal password"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                touched={touched.password}
                errors={errors.password}
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
                touched={touched.country}
                errors={errors.country}
              />
            </div>
            <div className=" form__town ">
              <Input
                id={"city"}
                name={"city"}
                type={"text"}
                placeholder={"Town"}
                className={"form-modal town"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                touched={touched.city}
                errors={errors.city}
              />
            </div>

            <div className=" form__select ">
              <Select
                id={"role"}
                name={"role"}
                type={"text"}
                placeholder={"Role"}
                className={"form-modal role"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.role}
                touched={touched.role}
                errors={errors.role}
              >
                <option value="" disabled defaultValue={"Role"} className="date-pagination__option">
                  Role
                </option>
                <option value="customer" className="date-pagination__option">
                  Customer
                </option>
                <option value="device_owner" className="date-pagination__option">
                  Device owner
                </option>
                <option value="regional_admin" className="date-pagination__option">
                  Regional admin
                </option>
                <option value="super_admin" className="date-pagination__option">
                  Super admin
                </option>
              </Select>
            </div>
          </div>
          <div className="buttons">
            <button className="cancel__button" onClick={() => props.setActive(false)}>
              Cancel
            </button>

            <button className="submit__button-modal" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProfile;
