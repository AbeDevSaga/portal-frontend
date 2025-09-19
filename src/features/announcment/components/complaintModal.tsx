"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components/ui/button";
import { complaintType } from "../types/type";
import { useFormik } from "formik";
import { complaintSchema } from "@/common/forms/schemas/complaintSchema";
import { useSubmitComplaintMutation } from "../api/announcementApi";
import { format } from "date-fns";
import { toast } from "sonner";
import { showSuccess } from "@/common/components/common/CustomToast";
import { Label } from "@/common/components/ui/label";

const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
];

type ComplaintSubmitionModal = {
    residentId: string;
    reason: string;
    phoneNumber: string;
    idPhoto: null | File;
};
const initialValues = {
    residentId: "",
    reason: "",
    phoneNumber: "",
    idPhoto: null,
};

const today = format(new Date(), "yyyy-MM-dd");
export default function ComplaintModal({
    open,
    handleCancel,
    complaintModalData,
}: {
    open: boolean;
    handleCancel: Dispatch<SetStateAction<boolean>>;
    complaintModalData: complaintType | null;
}) {
    console.log("complaintModalData", complaintModalData);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [submitComplaint, { isLoading, isError, data }] =
        useSubmitComplaintMutation();
    const handleSubmitComplaint = async (data: ComplaintSubmitionModal) => {
        const body = {
            marriageId:
                complaintModalData !== null ? complaintModalData?.id : "",
            objectorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            localization: [
                {
                    languageCode: "en",
                    reason: data.reason,
                    objectionDate: today,
                },
            ],
        };
        const files = data.idPhoto
            ? [{ file: data.idPhoto, type: "ID_PROOF" }]
            : [];

        try {
            console.log("here");
            const response = await submitComplaint({
                data: body,
                files,
            });
            if (!isError) {
                showSuccess("Marriage complaint submitted!");
                handleCancel(false);
            }
        } catch (err) {
            console.log("err", err);
        }
        console.log("complaint dta", data);
    };
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
    } = useFormik<ComplaintSubmitionModal>({
        initialValues: initialValues,
        onSubmit: (data) => handleSubmitComplaint(data),
        validationSchema: complaintSchema,
    });
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;

        if (file && !allowedTypes.includes(file.type)) {
            alert("Only images and PDF files are allowed!");
            e.target.value = ""; // reset file input
            setFieldValue("idPhoto", null);
            return;
        }

        setFieldValue("idPhoto", file);
    };
    return (
        <Dialog open={open} onOpenChange={handleCancel}>
            <DialogContent className='rounded-2xl max-w-3xl px-6 py-8'>
                <DialogHeader className='mb-4 pb-5 border-b'>
                    <DialogTitle className='text-2xl font-bold text-[#073954]'>
                        Complaint
                    </DialogTitle>
                    <DialogDescription className='text-gray-500'>
                        Fill the information for complaining about the marriage
                    </DialogDescription>
                </DialogHeader>

                {/* Profile section */}
                <div className='flex justify-center gap-12 items-center mb-6'>
                    <div className='flex flex-col items-center'>
                        <img
                            src={complaintModalData?.info[0].image}
                            alt='Male'
                            className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-md'
                        />
                        <p className='mt-2 font-medium text-sm text-gray-700'>
                            {complaintModalData?.info[0].name}{" "}
                        </p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img
                            src={complaintModalData?.info[1].image}
                            alt='Female'
                            className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-md'
                        />
                        <p className='mt-2 font-medium text-sm text-gray-700'>
                            {complaintModalData?.info[1].name}{" "}
                        </p>
                    </div>
                </div>

                {/* Form inputs */}
                <form
                    className='grid grid-cols-1 gap-4'
                    onSubmit={handleSubmit}
                >
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <Label>Resident Id</Label>
                            <Input
                                placeholder='Enter your resident ID'
                                name='residentId'
                                value={values["residentId"]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />{" "}
                            {touched.residentId && errors.residentId && (
                                <span className='text-red-500 text-sm'>
                                    {errors.residentId}
                                </span>
                            )}
                        </div>
                        <div className='flex flex-col'>
                            <Label>Phone Number</Label>
                            <Input
                                placeholder='Enter your phone number'
                                name='phoneNumber'
                                value={values["phoneNumber"]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />{" "}
                            {touched.phoneNumber && errors.phoneNumber && (
                                <span className='text-red-500 text-sm'>
                                    {errors.phoneNumber}
                                </span>
                            )}
                        </div>
                        <div>
                            <Label>Resident ID</Label>
                            <Input
                                ref={fileInputRef}
                                type='file'
                                onChange={handleFileChange}
                                multiple={false}
                                accept={allowedTypes.join(",")}
                                className={"cursor-pointer "}
                                onBlur={handleBlur}
                            />{" "}
                            {touched.idPhoto && errors.idPhoto && (
                                <span className='text-red-500 text-sm'>
                                    {errors.idPhoto}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='row-span-2 md:row-span-1'>
                        <Label>Complaint Reason</Label>
                        <Textarea
                            placeholder='Enter your complaint reason'
                            name='reason'
                            value={values["reason"]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />{" "}
                        {touched.reason && errors.reason && (
                            <span className='text-red-500 text-sm'>
                                {errors.reason}
                            </span>
                        )}
                    </div>
                    <div className='flex justify-end mt-6'>
                        <Button
                            disabled={isLoading}
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
}
