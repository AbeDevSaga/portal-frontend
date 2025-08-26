export const signupEmailInitialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
};
export const signupEmail = [
    {
        label: "Register as",
        name: "role",
        type: "select",
        required: true,
        options: [{ value: "admin", label: "Admin" }],
    },
    {
        label: "email",
        name: "email",
        type: "email",
        required: true,
        placeholder: "enter-email",
    },
    {
        label: "password",
        name: "password",
        type: "password",
        required: true,
        placeholder: "enter-password",
    },
    {
        label: "confirm-password",
        name: "confirmPassword",
        type: "password",
        required: true,
        placeholder: "confirm-password",
    },
];

export const signupFaydaInitialValues = {
    fayda: "",
    password: "",
    confirmPassword: "",
    role: "",
};
export const signupFayda = [
    {
        label: "Register as",
        name: "role",
        type: "select",
        required: true,
        options: [{ value: "admin", label: "Admin" }],
    },
    {
        label: "fayda-number",
        name: "fayda",
        type: "text",
        required: true,
        placeholder: "Enter your Fayda Number",
    },
    {
        label: "password",
        name: "password",
        type: "password",
        required: true,
        placeholder: "enter-password",
    },
    {
        label: "confirm-password",
        name: "confirmPassword",
        type: "password",
        required: true,
        placeholder: "confirm-password",
    },
];

export const signupPhoneInitialValues = {
    phonenumber: "",
    password: "",
    confirmPassword: "",
    role: "",
};
export const signupPhone = [
    {
        label: "Register as",
        name: "role",
        type: "select",
        required: true,
        options: [{ value: "admin", label: "Admin" }],
    },
    {
        label: "phone-number",
        name: "phonenumber",
        type: "text",
        required: true,
        placeholder: "enter-phone",
    },
    {
        label: "password",
        name: "password",
        type: "password",
        required: true,
        placeholder: "enter-password",
    },
    {
        label: "confirm-password",
        name: "confirmPassword",
        type: "password",
        required: true,
        placeholder: "confirm-password",
    },
];
