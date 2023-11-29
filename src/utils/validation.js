import * as yup from "yup";
const validation = () => {
  return yup.object({
    name: yup.string().required("Enter your name"),
    email: yup.string().email("Enter a valid email").required("Enter an email"),
    phoneNumber: yup
      .string()
      .max(10, "Phone number cannot be greater than 10 digits")
      .min(10, "Phone number cannot be less than 10 digits")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .required("Enter a password"),
  });
};

export { validation as validate };
