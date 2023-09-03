import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Firstname required").max(15, "Must be 15 characters or less"),
  surname: yup.string().required("Lastname required").max(20, "Must be 20 characters or less"),
  email: yup.string().required("Email required").email("Invalid email adress"),
  phone_number: yup.string().required("Phonenumber required").min(10, { message: "Invalid phone number" }),
  country: yup.string().required("Country required"),
  city: yup.string().required("Town required"),
  password: yup.string().required("Password required").min(8, "Must be at least 8 letters or more"),
  rePassword: yup
    .string()
    .required("RePassword required")
    .oneOf([yup.ref("password")], "Passwords aren`t the same"),
  address: yup.string().required("Adress required"),
});
