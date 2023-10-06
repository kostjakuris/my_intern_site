import * as yup from "yup";

export const CreateDeviceSchema = yup.object().shape({
    name : yup.string().required("name required"),
    device_type : yup.string().required("Device type required"),
    email : yup.string().required("Email required").email("Invalid email address"),
    country : yup.string().required("Country required"),
    city : yup.string().required("Town required"),
    address : yup.string().required("Address required"),
    serial_number : yup.string().required("Serial number required"),
});
