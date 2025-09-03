import * as Yup from "yup";

export const complaintSchema = Yup.object().shape({
    residentId: Yup.string()
        .required("Resident ID is required")
        .matches(
            /^URID\d{16}$/,
            "Resident ID must start with 'URID' followed by 16 digits"
        ),
    phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(
            /^(09\d{8}|07\d{8}|\+2519\d{8}|\+2517\d{8})$/,
            "Phone number must start with 09, 07, +2519, or +2517 and be followed by 8 digits"
        ),
    reason: Yup.string()
        .required("Reason is required")
        .min(10, "Reason must be at least 10 characters"),
    idPhoto: Yup.mixed<File>()
        .nullable()
        .test(
            "fileType",
            "Only PNG, JPEG, JPG, and PDF files are allowed",
            (value) => {
                if (!value) return true; // Allow null
                const allowedTypes = [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                    "application/pdf",
                ];
                return allowedTypes.includes(value.type);
            }
        )
        .test("fileSize", "File size must be less than 5MB", (value) => {
            if (!value) return true; // Allow null
            return value.size <= 5 * 1024 * 1024;
        }),
});
