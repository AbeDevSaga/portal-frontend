import * as Yup from "yup";

export const loginEmailSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
    rememberPassword: Yup.boolean(),
});

export const loginFaydaSchema = Yup.object({
    fayda: Yup.string()
        .matches(/^\d+$/, "Fayda Number must be numeric")
        .required("Fayda Number is required"),
    password: Yup.string().required("Password is required"),
    rememberPassword: Yup.boolean(),
});

export const loginPhoneSchema = Yup.object({
    phonenumber: Yup.string()
        .matches(/^\+?\d{9,15}$/, "Invalid phone number")
        .required("Phone number is required"),
    password: Yup.string().required("Password is required"),
    rememberPassword: Yup.boolean(),
});
