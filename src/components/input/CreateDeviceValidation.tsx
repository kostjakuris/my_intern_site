import * as yup from "yup";

export const CreateDeviceSchema = yup.object().shape({
  name: yup.string().required("name required").max(15, "Must be 15 characters or less"),
  device_type: yup.string().required("Device type required").max(15, "Must be 15 characters or less"),
  email: yup.string().required("Email required").email("Invalid email adress"),
  country: yup.string().required("Country required"),
  city: yup.string().required("Town required"),
  address: yup.string().required("Address required").max(15, "Must be 15 characters or less"),
  serial_number: yup.string().required("Serial number required").max(15, "Must be 15 characters or less"),
});
