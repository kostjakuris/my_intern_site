import { useFormik } from "formik";
import { Link } from "react-router-dom";
import "./signInForm.min.css";
import { useState } from "react";

import Input from "../input/Input";
import { FormData } from "../input/inputVariables";
const validate = (values: FormData) => {
  const errors: FormData = {};

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password required";
  } else if (values.password.length < 8) {
    errors.password = "Must be at least 8 characters or more";
  }
};
const SignIn = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values: FormData) => {
      console.log(values);
    },
  });

  return (
    <main className="main">
      <div className="main-content">
        <div className="form-wrapper-signIn">
          <form onSubmit={formik.handleSubmit} className="signIn__form">
            <h2 className="form-wrapper__title-signIn">Welcome back</h2>
            <p className="form-wrapper__info-signIn">Welcome back! Please enter your details </p>
            <div className=" form__email">
              <Input
                id={"email"}
                name={"email"}
                type={"email"}
                placeholder={"Email"}
                className={"email--signIn"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                touched={formik.touched.email}
                errors={formik.errors.email}
              />
            </div>

            <div className="form__password">
              <Input
                id={"password"}
                name={"password"}
                type={hidePassword ? "text" : "password"}
                placeholder={"Password"}
                className={"password--signIn"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                touched={formik.touched.password}
                errors={formik.errors.password}
              />
              <span
                className={hidePassword ? "hiding__icon-signIn disabled" : "hiding__icon-signIn"}
                onClick={() => setHidePassword((prev) => !prev)}
              >
                <img src="img/mdi_eye.jpg" alt="eye" />
              </span>
            </div>

            <button className="submit__button-signIn" type="submit" onClick={(e) => e.preventDefault}>
              Sign In
            </button>
          </form>
          <div className="account__info">
            <p className="account__info-text">
              Don`t have an account?
              <Link to="/SignUp.tsx" className="account__info-link">
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
    </main>
  );
};

export default SignIn;
