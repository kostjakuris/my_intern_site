import { useFormik } from "formik";
import { Link } from "react-router-dom";
import "./signInForm.min.css";
import { useState } from "react";
import Input from "../input/Input";
import { SignInFormData } from "../input/inputVariables";
import { signInSchema } from "../input/SignInValidation";
import axios from "axios";
const SignIn = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: () => {
      onSubmitSignIn();
    },
  });

  async function onSubmitSignIn() {
    try {
      const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/auth/login", {
        email: values.email,
        password: values.password,
      });
      return respons;
    } catch (e: any) {
      return e.message;
    }
  }

  return (
    <main className="main">
      <div className="main-content">
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
