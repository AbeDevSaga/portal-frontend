"use client";
import LandingNavBar from "@/common/components/layout/landingNavBar";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import { Input } from "@/common/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useFormik } from "formik";
import React, { useState } from "react";
import DetailBlock from "../homedetails/components/detailBlock";
import { BadgeAlert, BadgeCheck, BadgeX, Loader } from "lucide-react";
import Image from "next/image";
import ellipse from "@/public/images/Ellipse-25.svg";
import looper from "@/public/images/Looper-bg.svg";
import placeholderimage from "@/public/images/placeholder-man.png";

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [showResponse, setShowResponse] = useState(false);
    const data = {
        basicInformation: {
            title: "Basic Information",
            data: [
                {
                    label: "Registration No.-",
                    key: "",
                    value: "AA0000000212",
                },
                {
                    label: "Full Name",
                    key: "",
                    value: "Dawit Abebe Biru",
                },
                {
                    label: "Mother's Name",
                    key: "",
                    value: "Selam Mesfin Tesfaye",
                },

                {
                    label: "Sex",
                    key: "",
                    value: "Male",
                },
                {
                    label: "Phone Number",
                    key: "",
                    value: "+251912345678",
                },
                {
                    label: "Nationality",
                    key: "",
                    value: "Ethiopian",
                },
            ],
        },
        applicationInformation: {
            title: "Application",
            data: [
                {
                    label: "Service-",
                    key: "",
                    value: "Birth",
                },
                {
                    label: "Service Type",
                    key: "",
                    value: "New",
                },
                {
                    label: "Appointment Date-",
                    key: "",
                    value: "22 Aug, 2025",
                },
            ],
        },
    };
    const handleSubmitStatusCheck = () => {
        setLoading(true);
        setTimeout(() => {
            setShowResponse(true);
            setLoading(false);
        }, 2000);
    };
    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            aaId: "",
        },
        onSubmit: handleSubmitStatusCheck,
    });

    const statusComponent = (status: string) => {
        if (status === "approved")
            return (
                <div className='flex rounded-full gap-1.5 place-self-end items-center bg-[#D9F0E0] text-[#03AD00] font-semibold w-fit px-5 py-0.5'>
                    <BadgeCheck fill='#03AD00' color='white' />
                    <p>Approved</p>
                </div>
            );
        if (status === "rejected")
            return (
                <div className='flex rounded-full gap-1.5 place-self-end items-center bg-[#FFCDCD] text-[#FF0000] font-semibold w-fit px-5 py-0.5'>
                    <BadgeX fill='#FF0000' color='white' /> <p>Rejected</p>
                </div>
            );
        if (status === "pending")
            return (
                <div className='flex rounded-full gap-1.5 place-self-end items-center bg-[#FEE3AC] text-[#FDB114] font-semibold w-fit px-5 py-0.5'>
                    <BadgeAlert fill='#FDB114' color='white' /> <p>Pending</p>
                </div>
            );
    };
    return (
        <div
            className='min-h-screen bg-cover bg-no-repeat font-barlow flex flex-col'
            id='home'
        >
            <LandingNavBar />
            <div className='relative overflow-clip w-full flex flex-col flex-1'>
                <div className='absolute h-full w-full z-10 bottom-40 left-[15rem]'>
                    <div className='flex-1 relative h-full w-full min-h-[125vh]'>
                        <Image src={looper.src} alt='looper' fill></Image>
                    </div>
                </div>
                <div className='absolute -bottom-36 right-[20rem] w-[125vw] z-10 h-[800px]'>
                    <div className='flex-1 relative h-full w-full '>
                        <Image src={ellipse.src} alt='ellipse' fill></Image>
                    </div>
                </div>
                <div className='max-w-[1500px] mx-auto space-y-20 py-32 relative overflow-clip z-30'>
                    <p className='text-center text-3xl lg:text-7xl font-bold text-[#073954]'>
                        Application Status
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className='max-w-fit w-full mx-auto bg-white'
                    >
                        <div className='flex shadow-md rounded-md w-full p-2 items-center'>
                            <Input
                                name='aaId'
                                value={values.aaId}
                                onChange={handleChange}
                                className='ring-0 border-none focus:!ring-0 active:ring-none shadow-none !text-xl h-12 md:min-w-[350px]'
                            />
                            <Button
                                type='submit'
                                className='!h-12 px-10 md:min-w-[200px] bg-[#073954]'
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader className='animate-spin' />
                                ) : (
                                    "Check Status"
                                )}
                            </Button>
                        </div>
                    </form>
                    {errors["aaId"] ? (
                        <p className='text-red-500'>{errors["aaId"]}</p>
                    ) : null}

                    {!showResponse ||
                    loading ||
                    data === null ||
                    data === undefined ? null : (
                        <Card className='px-5 space-y-8 w-fit shadow-lg py-10 mx-auto'>
                            <div className='grid lg:grid-cols-3 pb-5 gap-5 w-fit'>
                                <div className='flex items-center justify-center'>
                                    <Avatar className='w-[140px] h-[140px] mx-auto lg:mx-0 flex items-center justify-center rounded-full text-center'>
                                        <AvatarImage
                                            src={placeholderimage.src}
                                        />
                                        <AvatarFallback className='text-center'>
                                            CN
                                        </AvatarFallback>
                                    </Avatar>{" "}
                                </div>
                                <DetailBlock
                                    blockData={data.basicInformation}
                                />
                                <div className='flex flex-col justify-between w-fit'>
                                    <DetailBlock
                                        blockData={data.applicationInformation}
                                    />
                                    {statusComponent("pending")}
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
