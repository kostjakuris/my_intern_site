import { useFormik } from "formik";
import { Routes, Route, Link } from "react-router-dom";
import "./signUpForm.min.css";
import { useState } from "react";
import Input from "../input/Input";
import SignIn from "../signInForm/SignIn";
import { FormData, HookData } from "../input/inputVariables";
import { useAppDispatch } from "../../Hook";
import { signUpSchema } from "../input/SignUpValidation";
import axios from "axios";
import { register } from "../../store/auth/opetations";
import { useNavigate } from "react-router-dom";
import Layout from "../nav/Layout";

const SignUp = ({ ...props }: HookData) => {
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(false);
  const [hideRePassword, setHideRePassword] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone_number: "",
      country: "",
      city: "",
      password: "",
      rePassword: "",
      address: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values: FormData) => {
      await dispatch(register(values));
    },
  });

  const dispatch = useAppDispatch();

  return (
    <main className="main">
      <div className="main-content">
        <div className="form-wrapper-signUp ">
          <form onSubmit={handleSubmit}>
            <h2 className="form-wrapper-signUp__title">Sign Up</h2>
            <p className="form-wrapper-signUp__info">Please enter your details to continue</p>
            <div className="signUp__form">
              <div className="left__form">
                <div className=" form__firstname ">
                  <Input
                    id={"name"}
                    name={"name"}
                    type={"text"}
                    placeholder={"Firstname"}
                    className={"form--signUp firstName"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    touched={touched.name}
                    errors={errors.name}
                  />
                </div>

                <div className=" form__email-signUp ">
                  <Input
                    id={"email"}
                    name={"email"}
                    type={"email"}
                    placeholder={"Email"}
                    className={"form--signUp email"}
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
                    className={"form--signUp country"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                    touched={touched.country}
                    errors={errors.country}
                  />
                </div>

                <div className=" form__password-signUp ">
                  <Input
                    id={"password"}
                    name={"password"}
                    type={hidePassword ? "text" : "password"}
                    placeholder={"Password"}
                    className={"form--signUp password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    touched={touched.password}
                    errors={errors.password}
                  />
                  <span
                    className={hidePassword ? "hiding__icon-signUp disabled" : "hiding__icon-signUp"}
                    onClick={() => setHidePassword((prev) => !prev)}
                  >
                    <img src="img/mdi_eye.jpg" alt="eye" />
                  </span>
                </div>
                <div className=" form__adress ">
                  <Input
                    id={"address"}
                    name={"address"}
                    type={"text"}
                    placeholder={"Adress"}
                    className={"form--signUp adress"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    touched={touched.address}
                    errors={errors.address}
                  />
                </div>
              </div>

              <div className="right__form">
                <div className=" form__lastname">
                  <Input
                    id={"surname"}
                    name={"surname"}
                    type={"text"}
                    placeholder={"Lastname"}
                    className={"form--signUp lastName"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.surname}
                    touched={touched.surname}
                    errors={errors.surname}
                  />
                </div>

                <div className=" form__phoneNumber ">
                  <Input
                    id={"phone_number"}
                    name={"phone_number"}
                    type={"tel"}
                    placeholder={"Phone number"}
                    className={"form--signUp phoneNumber"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone_number}
                    touched={touched.phone_number}
                    errors={errors.phone_number}
                  />
                </div>

                <div className=" form__town ">
                  <Input
                    id={"city"}
                    name={"city"}
                    type={"text"}
                    placeholder={"Town"}
                    className={"form--signUp town"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    touched={touched.city}
                    errors={errors.city}
                  />
                </div>

                <div className=" form__rePassword-signUp ">
                  <Input
                    id={"rePassword"}
                    name={"rePassword"}
                    type={hideRePassword ? "text" : "password"}
                    placeholder={"Re-password"}
                    className={"form--signUp rePassword"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rePassword}
                    touched={touched.rePassword}
                    errors={errors.rePassword}
                  />
                  <span
                    className={hideRePassword ? "hiding__icon-signUp disabled" : "hiding__icon-signUp"}
                    //* prev-prevState(состояние до активации setState(предидущее состояние))
                    onClick={() => setHideRePassword((prev) => !prev)}
                  >
                    <img src="img/mdi_eye.jpg" alt="eye" />
                  </span>
                </div>
              </div>
            </div>

            <button className="submit__button-signUp" type="submit">
              Sign Up
            </button>
          </form>
          <div className="account__info-signUp">
            <p className="account__info-signUp-text">
              Already have an account?
              <Link to="/SignIn" className="account__info-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="form-wrapper-signUp--mobile ">
          <form onSubmit={handleSubmit}>
            <h2 className="form-wrapper-signUp__title">Sign Up</h2>
            <p className="form-wrapper-signUp__info">Please enter your details to continue</p>
            <div className="signUp__form">
              <div className=" form__firstname ">
                <Input
                  id={"name"}
                  name={"name"}
                  type={"text"}
                  placeholder={"Firstname"}
                  className={"form--signUp firstName"}
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
                  className={"form--signUp lastName"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.surname}
                  touched={touched.surname}
                  errors={errors.surname}
                />
              </div>

              <div className=" form__email-signUp ">
                <Input
                  id={"email"}
                  name={"email"}
                  type={"email"}
                  placeholder={"Email"}
                  className={"form--signUp email"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  touched={touched.email}
                  errors={errors.email}
                />
              </div>

              <div className=" form__phoneNumber ">
                <Input
                  id={"phone_number"}
                  name={"phone_number"}
                  type={"tel"}
                  placeholder={"Phone number"}
                  className={"form--signUp phoneNumber"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_number}
                  touched={touched.phone_number}
                  errors={errors.phone_number}
                />
              </div>

              <div className=" form__adress ">
                <Input
                  id={"address"}
                  name={"address"}
                  type={"text"}
                  placeholder={"Adress"}
                  className={"form--signUp adress"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  touched={touched.address}
                  errors={errors.address}
                />
              </div>

              <div className=" form__country ">
                <Input
                  id={"country"}
                  name={"country"}
                  type={"text"}
                  placeholder={"Country"}
                  className={"form--signUp country"}
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
                  className={"form--signUp town"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  touched={touched.city}
                  errors={errors.city}
                />
              </div>

              <div className=" form__password-signUp ">
                <Input
                  id={"password"}
                  name={"password"}
                  type={hidePassword ? "text" : "password"}
                  placeholder={"Password"}
                  className={"form--signUp password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  touched={touched.password}
                  errors={errors.password}
                />
                <span
                  className={hidePassword ? "hiding__icon-signUp disabled" : "hiding__icon-signUp"}
                  onClick={() => setHidePassword((prev) => !prev)}
                >
                  <img src="img/mdi_eye.jpg" alt="eye" />
                </span>
              </div>

              <div className=" form__rePassword-signUp ">
                <Input
                  id={"rePassword"}
                  name={"rePassword"}
                  type={hideRePassword ? "text" : "password"}
                  placeholder={"Re-password"}
                  className={"form--signUp rePassword"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.rePassword}
                  touched={touched.rePassword}
                  errors={errors.rePassword}
                />
                <span
                  className={hideRePassword ? "hiding__icon-signUp disabled" : "hiding__icon-signUp"}
                  onClick={() => setHideRePassword((prev) => !prev)}
                >
                  <img src="img/mdi_eye.jpg" alt="eye" />
                </span>
              </div>
            </div>

            <button className="submit__button-signUp" type="submit">
              Sign Up
            </button>
          </form>
          <div className="account__info-signUp">
            <p className="account__info-signUp-text">
              Already have an account?
              <Link to="/SignIn" className="account__info-signUp-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
        <aside className="aside-content--signUp">
          <div className="img__wrapper">
            <img className="aside__img" src="img/twemoji_battery.jpg" alt="batery" />
          </div>
        </aside>
      </div>
    </main>
  );
};

export default SignUp;
