import { FormData } from "./inputVariables";

export const validate = (values: FormData) => {
  const errors: FormData = {};

  if (!values.firstname) {
    errors.firstname = "Firstname required";
  } else if (values.firstname.length > 15) {
    errors.firstname = "Must be 15 characters or less";
  }

  if (!values.lastname) {
    errors.lastname = "Lastname required";
  } else if (values.lastname.length > 20) {
    errors.lastname = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Phonenumber required";
  } else if (values.phoneNumber.length !== 10) {
    errors.phoneNumber = "Must be only 10 numbers in phone number";
  }

  if (!values.country) {
    errors.country = "Country required";
  } else if (values.country.length > 20) {
    errors.country = "Must be 20 characters or less";
  }

  if (!values.town) {
    errors.town = "Town required";
  } else if (values.town.length > 20) {
    errors.town = "Must be 20 characters or less";
  }

  if (!values.password) {
    errors.password = "Password required";
  } else if (values.password.length < 8) {
    errors.password = "Must be at least 8 characters or more";
  }

  if (!values.rePassword) {
    errors.rePassword = "Password required";
  } else if (values.password !== values.rePassword) {
    errors.rePassword = "Passwords aren`t the same";
  }

  if (!values.adress) {
    errors.adress = "Adress required";
  }

  return errors;
};
