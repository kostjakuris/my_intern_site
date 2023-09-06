import { useFormik } from "formik";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import "./signInForm.min.css";
import { useState } from "react";
import Input from "../input/Input";
import { SignInFormData } from "../input/inputVariables";
import { signInSchema } from "../input/SignInValidation";
import { useAppDispatch } from "../../Hook";
import { getData, logIn } from "../../store/auth/opetations";
import SignUp from "../signUpForm/SignUp";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values: SignInFormData) => {
      await dispatch(logIn(values));
      await dispatch(getData());
      navigate("/");
    },
  });

  const dispatch = useAppDispatch();

  return (
    <div className="main-content">
      <Routes>
        <Route path="SignUp" element={<SignUp />} />
      </Routes>
      <div className="form-wrapper-signIn">
        <form onSubmit={handleSubmit} className="signIn__form" autoComplete="off">
          <h2 className="form-wrapper__title-signIn">Welcome back</h2>
          <p className="form-wrapper__info-signIn">Welcome back! Please enter your details </p>
          <div className=" form__email">
            <Input
              id={"email"}
              name={"email"}
              type={"email"}
              placeholder={"Email"}
              className={"email--signIn"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              touched={touched.email}
              errors={errors.email}
            />
          </div>

          <div className="form__password">
            <Input
              id={"password"}
              name={"password"}
              type={hidePassword ? "text" : "password"}
              placeholder={"Password"}
              className={"password--signIn"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              touched={touched.password}
              errors={errors.password}
            />

            <span
              className={hidePassword ? "hiding__icon-signIn disabled" : "hiding__icon-signIn"}
              onClick={() => setHidePassword((prev) => !prev)}
            >
              <img src="img/mdi_eye.jpg" alt="eye" />
            </span>
          </div>

          <button className="submit__button-signIn" type="submit">
            Sign In
          </button>
        </form>
        <div className="account__info">
          <p className="account__info-text">
            Don`t have an account?
            <Link to="/SignUp" className="account__info-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <aside className="aside-content">
        <div className="img__wrapper">
          <img className="aside__img" src="img/twemoji_battery.jpg" alt="battery" />
        </div>
      </aside>
    </div>
  );
};

export default SignIn;
