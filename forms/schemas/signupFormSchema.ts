import * as Yup from "yup";

export const signupEmailSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),

    rememberPassword: Yup.boolean(),
});

export const signupFaydaSchema = Yup.object({
    fayda: Yup.string()
        .matches(/^\d+$/, "Fayda Number must be numeric")
        .required("Fayda Number is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),

    rememberPassword: Yup.boolean(),
});

export const signupPhoneSchema = Yup.object({
    phonenumber: Yup.string()
        .matches(/^\+?\d{9,15}$/, "Invalid phone number")
        .required("Phone number is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),

    rememberPassword: Yup.boolean(),
});
