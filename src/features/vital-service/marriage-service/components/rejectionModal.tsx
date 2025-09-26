import { Button } from "@/common/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { rejectionSchema } from "@/common/forms/schemas/rejectionSchema";
import { useSubmitResolutionFormMutation } from "@/features/application-service/api/applicationApi";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

const RejectionModal = ({
    open,
    handleCancel,
}: {
    open: boolean;
    handleCancel: Dispatch<SetStateAction<boolean>>;
}) => {
    const [
        submitResolutionForm,
        {
            isLoading: resolutionIsLoading,
            isError: resolutionIsError,
            data: resolutionData,
        },
    ] = useSubmitResolutionFormMutation();
    const params = useParams();
    const slug = params.slug;

    const handleValidateApplication = async (values: {
        status: string;
        reason: string;
    }) => {
        try {
            const data = {
                registration_number: slug,
                reviewerId: null,
                approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                status: values.status,
                localisation: [
                    {
                        languageCode: "en",
                        reviewDate: "2025-08-29T18:13:13.672Z",
                        approvedDate: null,
                        reviewerNotes: values.reason,
                        approverNotes: null,
                    },
                ],
            };
            console.log("data", data);

            const response = await submitResolutionForm({
                data,
            });
            if (!resolutionIsError) {
                handleCancel(true);
                window.location.reload();
            }
            console.log("response", response);
        } catch (error) {
            console.log("error", error);
        }
    };
    const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
        useFormik({
            initialValues: {
                reason: "",
                status: "REJECTED",
            },
            onSubmit: (data) => handleValidateApplication(data),
            validationSchema: rejectionSchema,
        });
    return (
        <Dialog open={open} onOpenChange={handleCancel}>
            <DialogContent className='rounded-2xl max-w-3xl px-6 py-8'>
                <DialogHeader className='mb-4 pb-5 border-b'>
                    <DialogTitle className='text-2xl font-bold text-[#073954]'>
                        Reject Application
                    </DialogTitle>
                    <DialogDescription className='text-gray-500'>
                        Provide Reason for rejection the application.
                    </DialogDescription>
                </DialogHeader>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className='row-span-2 md:row-span-1'>
                        <Textarea
                            placeholder='Enter your reason'
                            onChange={handleChange}
                            name='reason'
                            value={values["reason"]}
                        />
                        {touched.reason && errors.reason && (
                            <p className='text-sm text-red-500 mt-1'>
                                {errors.reason}
                            </p>
                        )}
                    </div>
                    <div className='flex justify-end mt-6'>
                        <Button
                            type='submit'
                            className='px-6 py-2 bg-[#073954]'
                        >
                            Submit
                        </Button>
                    </div>
                </form>

                {/* Submit button */}
            </DialogContent>
        </Dialog>
    );
};

export default RejectionModal;
