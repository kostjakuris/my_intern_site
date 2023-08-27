import { useFormik } from "formik";
import { Link } from "react-router-dom";
import "./signInForm.min.css";
import { useState } from "react";
import { validate } from "../input/InputValidation";
import Input from "../input/Input";

const SignIn = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <main className="main">
      <div className="main-content">
        <div className="form-wrapper-signIn">
          <form className="signIn__form" onSubmit={formik.handleSubmit}>
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
