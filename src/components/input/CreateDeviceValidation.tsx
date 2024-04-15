import * as yup from "yup";

export const CreateDeviceSchema = yup.object().shape({
    name : yup.string().required("name required"),
    device_type : yup.string().required("Device type required"),
    owner_id : yup.string().required("Owner id required"),
    country : yup.string().required("Country required"),
    city : yup.string().required("Town required"),
    address : yup.string().required("Address required"),
    serial_number : yup.string().required("Serial number required"),
});
