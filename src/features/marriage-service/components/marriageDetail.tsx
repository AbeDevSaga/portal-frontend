"use client";
import { useParams } from "next/navigation";
import { AlarmClock, Check, Copy, Eye, Info, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import HeroSection from "@/common/components/common/HeroSection";
import DetailBlock from "@/common/components/common/detailBlock";
import { mapApiResponseToFormFields } from "@/common/utils/dynamic-form/dynamicApiMapper";
import { formConfig } from "./marraige-form-fields";
import { useGetMarriageBySlugQuery } from "../api/marriageApi";
import MarriageDetailComponent from "./marriageDetailComponent";
import { MarriageData, MarriageResponse } from "../types";
import {
    useGetVitalServiceEventQuery,
    useSubmitResolutionFormMutation,
} from "@/features/application-service/api/applicationApi";
import { useFormik } from "formik";
import RejectionModal from "./rejectionModal";
import GeneralInformation from "./generalInformation";

// Define the type for the mapped response data
// type MappedResponseData = {
//     title: string;
//     data: { label: string; key: string; value: string; status?: string }[];
// }[];

export default function MarriageDetail() {
    const [response, setResponse] = useState<MarriageData | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);

    const [copied, setCopied] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const params = useParams();
    const slug = params.slug;
    const { isLoading, isError, data } = useGetMarriageBySlugQuery({
        id: slug,
    });

    useEffect(() => {
        if (!isError && !isLoading && data) {
            setResponse(data.data);
        }
    }, [data]);

    const requirementsandaction = [
        {
            title: "Correction",
            details: [
                "For Name Change, the person must provide court letter",
                "For age correction if the new age is two years less than or greater than current age, court letter must be provided",
                "For Spelling correction, user consent is enough",
            ],
            buttonTitle: "Request Correction",
            paymentAmount: 250,
        },
        {
            title: "Lost",
            details: [
                "Confirmation letter from woreda police department is required",
            ],
            buttonTitle: "Request Lost Certificate",
            paymentAmount: 250,
        },
        {
            title: "Damaged",
            details: ["The Damaged certificate must be presented"],
            buttonTitle: "Request Damaged Certificate",
            paymentAmount: 250,
        },
    ];
    const handleCopy = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const [
        submitResolutionForm,
        {
            isLoading: resolutionIsLoading,
            isError: resolutionIsError,
            data: resolutionData,
        },
    ] = useSubmitResolutionFormMutation();
    const handleValidateApplication = async (values: {
        status: string;
        reason: string;
    }) => {
        try {
            const data = {
                registration_number: slug,
                reviewerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                approverId: null,
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
            const response = await submitResolutionForm({
                data,
            });
            // if (!isError) {
            //     window.location.reload();
            // }
            console.log(response);
        } catch (error) {}
    };

    const {
        data: vitalData,
        isLoading: isVitalLoading,
        isError: isVitalError,
    } = useGetVitalServiceEventQuery({ id: slug });

    console.log("vital data", vitalData);
    const [displayData, setDisplayData] = useState("general");
    const marriageDetailOptions = [
        {
            label: "General Info",
            component: <GeneralInformation data={null} />,
            value: "general",
        },
        {
            label: "Bridal Info",
            component: <></>,
            value: "bridal",
        },
        {
            label: "Witness",
            component: <></>,
            value: "witness",
        },
    ];

    const handleRenderApplicationDecisionButtons = (status: string) => {
        if (status === "SUBMITTED")
            return (
                <>
                    <Button
                        onClick={() =>
                            handleValidateApplication({
                                status: "UNDER_REVIEW",
                                reason: "",
                            })
                        }
                    >
                        Validate Application
                    </Button>
                    <Button onClick={() => setOpenRejectModal(true)}>
                        Reject Application
                    </Button>
                </>
            );
        if (status === "UNDER_REVIEW")
            return (
                <>
                    <Button
                        onClick={() =>
                            handleValidateApplication({
                                status: "APPROVED",
                                reason: "",
                            })
                        }
                    >
                        Approve Application
                    </Button>
                    <Button onClick={() => setOpenRejectModal(true)}>
                        Reject Application
                    </Button>
                </>
            );
        if (status === "APPROVED")
            return (
                <div className='flex flex-wrap items-center gap-3'>
                    <div className='px-5 text-center py-2 rounded-sm bg-green-400/50'>
                        APPROVED
                    </div>

                    <Button
                        className='bg-[#073954]'
                        onClick={() => setShowTimer(true)}
                    >
                        Request Certificate
                    </Button>
                </div>
            );
        if (status === "REJECTED")
            return (
                <div className='px-5 text-center py-2 rounded-sm bg-red-400/50'>
                    REJECTED
                </div>
            );
        return null;
    };

    return (
        <>
            <HeroSection
                title='Marriage Detail'
                description='This is the marriage detail of a family member section'
                action={
                    <>
                        {handleRenderApplicationDecisionButtons(
                            vitalData ? vitalData.data.status : ""
                        )}
                    </>
                }
            />
            <Card className='space-x-2 w-fit bg-gray-200 py-4 px-10'>
                {marriageDetailOptions.map((component) => (
                    <Button
                        onClick={() => setDisplayData(component.value)}
                        key={component.value}
                        variant={
                            component.value === displayData ? "default" : "bare"
                        }
                    >
                        {component.label}{" "}
                    </Button>
                ))}
            </Card>

            {
                marriageDetailOptions.find((item) => item.value === displayData)
                    ?.component
            }
            <div className='flex flex-wrap xl:flex-nowrap gap-10'>
                <div className='grid grid-cols-2 gap-5 w-full'>
                    <Card className='py-5 px-5 w-full flex flex-col h-fit'>
                        {response && response !== null ? (
                            <MarriageDetailComponent
                                title='Husband Information'
                                id={response.husband}
                            />
                        ) : null}
                        {isLoading ? (
                            <div className='flex-1 flex items-center justify-center'>
                                <Loader className='animate-spin' />
                            </div>
                        ) : null}
                    </Card>
                    <Card className='py-5 px-5 w-full flex flex-col h-fit'>
                        {response ? (
                            <MarriageDetailComponent
                                title='Wife Information'
                                id={response.wife}
                            />
                        ) : null}
                        {isLoading ? (
                            <div className='flex-1 flex items-center justify-center'>
                                <Loader className='animate-spin' />
                            </div>
                        ) : null}
                    </Card>
                    <Card className='py-5 px-5 w-full flex flex-col h-fit'>
                        {response ? (
                            <MarriageDetailComponent
                                title='Husband Witness One Information'
                                id={response.husbandWetnessOne}
                            />
                        ) : null}
                        {isLoading ? (
                            <div className='flex-1 flex items-center justify-center'>
                                <Loader className='animate-spin' />
                            </div>
                        ) : null}
                    </Card>
                    <Card className='py-5 px-5 w-full flex flex-col h-fit'>
                        {response ? (
                            <MarriageDetailComponent
                                title='Husband Witness Two Information'
                                id={response.husbandWetnessTwo}
                            />
                        ) : null}
                        {isLoading ? (
                            <div className='flex-1 flex items-center justify-center'>
                                <Loader className='animate-spin' />
                            </div>
                        ) : null}
                    </Card>

                    <Card className='py-5 px-5 w-full flex flex-col h-fit'>
                        {response ? (
                            <MarriageDetailComponent
                                title='Wife Witness One Information'
                                id={response.wifeWetnessOne}
                            />
                        ) : null}
                        {isLoading ? (
                            <div className='flex-1 flex items-center justify-center'>
                                <Loader className='animate-spin' />
                            </div>
                        ) : null}
                    </Card>
                    <Card className='py-5 px-5 w-full flex flex-col h-fit'>
                        {response ? (
                            <MarriageDetailComponent
                                title='Wife Witness One Information'
                                id={response.wifeWetnessTwo}
                            />
                        ) : null}
                        {isLoading ? (
                            <div className='flex-1 flex items-center justify-center'>
                                <Loader className='animate-spin' />
                            </div>
                        ) : null}
                    </Card>
                </div>
                {/* {!isError &&
                    !isLoading &&
                    response.length !== 0 &&
                    data !== null &&
                    data !== undefined
                        ? response.map((item, index) => (
                              <div className='py-5' key={item.title + index}>
                                  <DetailBlock blockData={item} />
                              </div>
                          ))
                        : null} */}

                {isLoading ? (
                    <div className='flex-1 flex items-center justify-center'>
                        <Loader className='animate-spin' />
                    </div>
                ) : null}
                <div className='w-fit min-w-[350px] 2xl:min-w-[500px] flex-1 flex flex-col md:flex-row xl:flex-col gap-5'>
                    {showTimer ? (
                        <Card
                            className='p-5'
                            style={{
                                padding: "1.25rem",
                                background:
                                    "linear-gradient(to right, #2A7299, #0c4A6B)",
                                color: "white",
                                borderRadius: "0.5rem",
                            }}
                        >
                            <p className='font-semibold'>Payment information</p>
                            <div className='p-5 flex'>
                                <div className='w-full space-y-3 border-r'>
                                    <Button
                                        className='flex gap-2 items-center backdrop-blur-md'
                                        variant='ghost'
                                    >
                                        <p>payment slip</p>
                                        <Eye />
                                    </Button>
                                    <Button
                                        className='flex gap-2 items-center bg-white/20'
                                        onClick={() =>
                                            handleCopy("copied value")
                                        }
                                    >
                                        <p>1211112321321</p>
                                        {!copied ? (
                                            <Copy size={20} />
                                        ) : (
                                            <Check size={20} />
                                        )}
                                    </Button>
                                </div>
                                <div className='min-w-fit flex flex-col items-center px-3'>
                                    <AlarmClock />
                                    <p className='text-[#FEC95B] text-5xl font-semibold mt-2'>
                                        19:24:51
                                    </p>
                                    <p className='text-sm'>
                                        Payment time countdown
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ) : null}
                    <Card className='p-5 space-y-2'>
                        <p className='text-lg font-semibold text-[#073954]'>
                            Requirements and Actions
                        </p>
                        <div className='space-y-3'>
                            {requirementsandaction.map(
                                (requirementsandactionItem) => (
                                    <Card
                                        key={requirementsandactionItem.title}
                                        className='p-3 space-y-3 bg-[#E8EEFD] border border-[#204D66] text-[#073954]'
                                    >
                                        <p className='font-semibold mb-3'>
                                            {requirementsandactionItem.title}
                                        </p>
                                        <div className='space-y-1.5'>
                                            {requirementsandactionItem.details.map(
                                                (detailsItem) => (
                                                    <div
                                                        key={detailsItem}
                                                        className='flex gap-2 items-center'
                                                    >
                                                        <div>
                                                            <Check size={24} />
                                                        </div>
                                                        <p>{detailsItem}</p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className='rounded-sm px-5 flex items-center gap-2 bg-[#FFF6E0] py-2'>
                                            <div>
                                                <Info
                                                    fill='orange'
                                                    color='white'
                                                />
                                            </div>
                                            <p className=''>
                                                You are asked to pay{" "}
                                                {
                                                    requirementsandactionItem.paymentAmount
                                                }{" "}
                                                Br for this service
                                            </p>
                                        </div>{" "}
                                        <Button className='bg-[#073954]'>
                                            {
                                                requirementsandactionItem.buttonTitle
                                            }
                                        </Button>
                                    </Card>
                                )
                            )}
                        </div>
                    </Card>{" "}
                </div>
            </div>
            <RejectionModal
                open={openRejectModal}
                handleCancel={setOpenRejectModal}
            />
        </>
    );
}
