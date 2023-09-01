import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;

export const EditUserSchema = yup.object().shape({
  firstname: yup.string().required("Firstname required").max(15, "Must be 15 characters or less"),
  lastname: yup.string().required("Lastname required").max(20, "Must be 20 characters or less"),
  email: yup.string().required("Email required").email("Invalid email adress"),
  country: yup.string().required("Country required"),
  town: yup.string().required("Town required"),
  password: yup
    .string()
    .required("Password required")
    .matches(passwordRules, { message: "Must be at least 1 letter,1 numeric digit and 6 another characters" }),
  adress: yup.string().required("Adress required"),
  role: yup
    .string()
    .oneOf(["Customer", "Device owner", "Regional admin", "Super admin"], "Please select some role")
    .required("Role required"),
});
