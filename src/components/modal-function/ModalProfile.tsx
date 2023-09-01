import { useFormik } from "formik";
import { useState } from "react";
import Input from "../input/Input";
import cross from "../../icons/system-uicons_cross.svg";
import { FormData } from "../input/inputVariables";
import { ModalCreateSchema } from "../input/ModalCreateValidation";
import Select from "../input/Select";

export type ModalProfileData = {
  active: boolean;
  setActive: (active: boolean) => void;
  children?: React.ReactNode;
  activeClassName: string;
  userRole?: string;
};

const ModalProfile = ({ ...props }: ModalProfileData) => {
  const [hidePassword, setHidePassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      country: "",
      town: "",
      password: "",
      adress: "",
      role: "",
    },
    validationSchema: ModalCreateSchema,
    onSubmit: (values: FormData) => {
      console.log(values);
    },
  });

  return (
    <div>
      <div className="modal__top">
        <h3 className="form-wrapper-modal__title">Edit user</h3>
        <span className="cross__wrapper" onClick={() => props.setActive(false)}>
          <img src={cross} alt="cross" />
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
                  value={formik.values.firstname}
                  touched={formik.touched.firstname}
                  errors={formik.errors.firstname}
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
                  id={"lastname"}
                  name={"lastname"}
                  type={"text"}
                  placeholder={"Lastname"}
                  className={"form lastName"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                  touched={formik.touched.lastname}
                  errors={formik.errors.lastname}
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
                  value={formik.values.town}
                  touched={formik.touched.town}
                  errors={formik.errors.town}
                />
              </div>
              <div className=" form__select--desktop ">
                <Select
                  id={"role"}
                  name={"role"}
                  type={"text"}
                  placeholder={"Role"}
                  className={"form role"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                  touched={formik.touched.role}
                  errors={formik.errors.role}
                >
                  <option value="" disabled selected className="date-pagination__option">
                    Role
                  </option>
                  <option value="Customer" className="date-pagination__option">
                    Customer
                  </option>
                  <option value="Device owner" className="date-pagination__option">
                    Device owner
                  </option>
                  <option value="Regional admin" className="date-pagination__option">
                    Regional admin
                  </option>
                  <option value="Super admin" className="date-pagination__option">
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
                value={formik.values.firstname}
                touched={formik.touched.firstname}
                errors={formik.errors.firstname}
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
                value={formik.values.lastname}
                touched={formik.touched.lastname}
                errors={formik.errors.lastname}
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
                value={formik.values.town}
                touched={formik.touched.town}
                errors={formik.errors.town}
              />
            </div>

            <div className=" form__select ">
              <Select
                id={"role"}
                name={"role"}
                type={"text"}
                placeholder={"Role"}
                className={"form-modal role"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                touched={formik.touched.role}
                errors={formik.errors.role}
              >
                <option value="" disabled selected className="date-pagination__option">
                  Role
                </option>
                <option value="Customer" className="date-pagination__option">
                  Customer
                </option>
                <option value="Device owner" className="date-pagination__option">
                  Device owner
                </option>
                <option value="Regional admin" className="date-pagination__option">
                  Regional admin
                </option>
                <option value="Super admin" className="date-pagination__option">
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
