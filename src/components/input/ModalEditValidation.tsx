import * as yup from "yup";

export const ModalEditSchema = yup.object().shape({
  firstname: yup.string().required("Firstname required").max(15, "Must be 15 characters or less"),
  lastname: yup.string().required("Lastname required").max(20, "Must be 20 characters or less"),
  email: yup.string().required("Email required").email("Invalid email adress"),
  country: yup.string().required("Country required"),
  town: yup.string().required("Town required"),
  password: yup.string().required("Password required").min(8, "Must be at least 8 letters or more"),
  adress: yup.string().required("Adress required"),
});
