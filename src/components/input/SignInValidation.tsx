import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().required("Email required").email("Invalid email adress"),
  password: yup.string().required("Password required").min(8, "Must be at least 8 letters or more"),
});
