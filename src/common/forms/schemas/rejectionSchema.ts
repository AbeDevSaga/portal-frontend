import * as Yup from "yup";

export const rejectionSchema = Yup.object({
    reason: Yup.string().required("Reason is required"),
});
