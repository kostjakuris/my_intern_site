import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;

export const signInSchema = yup.object().shape({
  email: yup.string().required("Email required").email("Invalid email adress"),
  password: yup
    .string()
    .required("Password required")
    .matches(passwordRules, { message: "Must be at least 1 letter,1 numeric digit and 6 another characters" }),
});
