"use client";
import { useParams } from "next/navigation";
import { AlarmClock, Check, Copy, Eye, Info, Loader } from "lucide-react";
import { useEffect, useState } from "react";
// import { mapApiResponseToFormFields } from "@/common/utils/dynamic-form/dynamicApiMapper";
// import { birthFormConfig } from "./birth-form-fields";
import HeroSection from "@/common/components/common/HeroSection";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import DetailBlock from "@/common/components/common/detailBlock";
import { useGetBirthBySlugQuery } from "../api/birthApi";
import { BirthResponse } from "../types";
import {
    useGetVitalServiceEventQuery,
    useSubmitResolutionFormMutation,
} from "@/features/application-service/api/applicationApi";
import Image from "next/image";
import FileViewerModal from "@/common/components/common/FileModalCompoennt";
import check from "@/public/images/check.svg";
import ChildGeneralInformation from "./ChildGeneralInformation";
import general from "@/public/images/general.svg";
import generalActive from "@/public/images/generalActive.svg";
import FatherGeneralInformation from "./FatherGeneralInformation";
import MotherGeneralInformation from "./MotherGeneralInformation";
import { useSubmitBirthCertificateRequestMutation } from "@/features/application-service/api/certificateApi";

// Define the type for the mapped response data
// type MappedResponseData = {
//     title: string;
//     data: { label: string; key: string; value: string; status?: string }[];
// }[];

const body = {
    request: {
        registrationId: "11111111-2222-3333-4444-555555555555",
        certificateType: "BIRTH",
        versionNumber: 1,
        data: {
            childName: "John Doe",
            childName_amh: "ጆን ዶ",
            fatherName: "Michael Doe",
            fatherName_amh: "ሚካኤል ዶ",
            grandFatherName: "Michael",
            grandFatherName_amh: "ሚካኤ",
            dobDay: "15",
            dobMonth: "Aug",
            dobYear: "2025",
            dobDay_amh: "15",
            dobMonth_amh: "Aug",
            dobYear_amh: "2025",
            sex: "Male",
            sex_amh: "ወንድ",
            placeOfBirth: "Addis Ababa",
            placeOfBirth_amh: "አዲስ አበባ",
            citizenship: "Ethiopian",
            citizenship_amh: "ኢትዮጵያዊ",
            motherFullName: "Anna Doe",
            motherFullName_amh: "አና ዶ",
            motherCitizenship: "Ethiopian",
            motherCitizenship_amh: "ኢትዮጵያዊ",
            fatherFullName: "Michael Doe",
            fatherFullName_amh: "ሚካኤል ዶ",
            fatherCitizenship: "Ethiopian",
            fatherCitizenship_amh: "ኢትዮጵያዊ",
            birthRegFormNo: "12345",
            birthRegUIN: "BRU-2025-001",
            birthRegDateDay: "16",
            birthRegDateDay_amh: "፲፮",
            birthRegDateMonth: "Aug",
            birthRegDateMonth_amh: "ነሐሴ",
            birthRegDateYear: "2025",
            birthRegDateYear_amh: "2017",
            officerFullName: "Registrar Kassa",
            officerFullName_amh: "ካሳ መዝገብ",
            certIssuedDateDay: "20",
            certIssuedDateDay_amh: "፳",
            certIssuedDateMonth: "Aug",
            certIssuedDateMonth_amh: "ነሐሴ",
            certIssuedDateYear: "2025",
            certIssuedDateYear_amh: "2017",
            birthRegUin: "bc-100001",
        },
    },
};

export default function BirthDetail() {
    const [response, setResponse] = useState<BirthResponse | null>(null);
    const [openFileModal, setOpenFileModal] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const params = useParams();
    const slug = params.slug;
    const { isLoading, isError, data } = useGetBirthBySlugQuery({
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
        submitCertificateRequest,
        {
            isLoading: certificateIsLoading,
            isError: certificateIsError,
            data: certificateData,
        },
    ] = useSubmitBirthCertificateRequestMutation();
    const handleRequestCertificate = async () => {
        try {
            const response = await submitCertificateRequest({ data: body });
        } catch (err) {}
    };

    const {
        data: vitalData,
        isLoading: isVitalLoading,
        isError: isVitalError,
    } = useGetVitalServiceEventQuery({ id: slug });
    const [displayData, setDisplayData] = useState("child");
    const marriageDetailOptions = [
        {
            label: "Child Info",
            component: (
                <ChildGeneralInformation
                    data={data?.data || null}
                    status={vitalData ? vitalData.data.registrationStatus : ""}
                />
            ),
            value: "child",
            image: general.src,
            imageActive: generalActive.src,
        },
        {
            label: "Father Info",
            component: (
                <FatherGeneralInformation fatherData={data?.data || null} />
            ),
            value: "father",
            image: general.src,
            imageActive: generalActive.src,
        },
        {
            label: "Mother Info",
            component: (
                <MotherGeneralInformation motherData={data?.data || null} />
            ),
            value: "mother",
            image: general.src,
            imageActive: generalActive.src,
        },
    ];
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
        const data = {
            registration_number: slug,
            reviewerId:
                values.status === "UNDER_REVIEW"
                    ? "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                    : null,
            approverId:
                values.status === "APPROVED"
                    ? "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                    : null,
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
        try {
            const response = await submitResolutionForm({
                data,
            });
            if (!resolutionIsError) {
                window.location.reload();
            }
            console.log(response);
        } catch (error) {}
    };

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
                        disabled={resolutionIsLoading}
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
                        disabled={resolutionIsLoading}
                    >
                        Approve Application
                    </Button>
                    <Button
                        onClick={() => setOpenRejectModal(true)}
                        disabled={resolutionIsLoading}
                    >
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
                        onClick={() => handleRequestCertificate()}
                        disabled={resolutionIsLoading}
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
                redirectTo='/application'
                title='Birth Detail'
                description='This is the birth detail of a new birth registration section'
                action={
                    <div className='space-y-5 space-x-5'>
                        {handleRenderApplicationDecisionButtons(
                            vitalData ? vitalData.data.status : ""
                        )}
                    </div>
                }
            />

            <div className='flex flex-wrap xl:flex-nowrap gap-10'>
                {isLoading ? (
                    <Card className='flex-1 flex items-center justify-center min-h-[350px] h-fit'>
                        <Loader className='animate-spin' />
                    </Card>
                ) : null}

                {!isError && !isLoading ? (
                    <div className='grid grid-cols-2 gap-5 w-full h-fit'>
                        <Card className='p-5 pb-10 space-y-5 w-full col-span-2 h-fit'>
                            <Card className='md:space-x-2 w-full md:w-fit bg-gray-200 py-2 px-5 rounded-sm flex flex-col md:flex-row'>
                                {marriageDetailOptions.map((component) => (
                                    <Button
                                        onClick={() =>
                                            setDisplayData(component.value)
                                        }
                                        key={component.value}
                                        variant={
                                            component.value === displayData
                                                ? "default"
                                                : "bare"
                                        }
                                        className='w-full px-10 py-2.5 flex items-center gap-2'
                                    >
                                        <Image
                                            src={
                                                component.value === displayData
                                                    ? component?.imageActive
                                                    : component?.image
                                            }
                                            width={25}
                                            height={25}
                                            alt={component.label}
                                        />
                                        {component.label}
                                    </Button>
                                ))}
                            </Card>

                            {
                                marriageDetailOptions.find(
                                    (item) => item.value === displayData
                                )?.component
                            }

                            {/* <div className='flex flex-col justify-between w-full shadow-sm'>
                                <p>Attachment</p>
                                <div
                                    onClick={() => setOpenFileModal(true)}
                                    className='cursor-pointer shadow-md rounded-sm overflow-clip flex w-full max-w-[300px] border border-[#004EAD]'
                                >
                                    <div className='p-2 w-full'>
                                        <p>file name</p>
                                        <p>2mb</p>
                                    </div>
                                    <div className='bg-[#4CAF50] p-5'>
                                        <Image
                                            src={check.src}
                                            width={30}
                                            height={30}
                                            alt='check'
                                        />
                                    </div>
                                </div>
                                {openFileModal ? (
                                    <FileViewerModal
                                        file={data.data.supporting_doc_url}
                                        open={openFileModal}
                                        handleCancel={setOpenFileModal}
                                    />
                                ) : null}
                            </div> */}
                        </Card>
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
                {/* <Card className='py-5 px-5 w-full flex flex-col h-fit min-h-[500px]'>
                    {!isError &&
                        !isLoading &&
                        response.length !== 0 &&
                        data !== null &&
                        data !== undefined
                        ? response.map((item, index) => (
                            <div className='py-5' key={item.title + index}>
                                <DetailBlock blockData={item} />
                            </div>
                        ))
                        : null}

                    {isLoading ? (
                        <div className='flex-1 flex items-center justify-center'>
                            <Loader className='animate-spin' />
                        </div>
                    ) : null}
                </Card> */}
                {/* <div className='w-fit min-w-[350px] 2xl:min-w-[500px] flex-1 flex flex-col md:flex-row xl:flex-col gap-5'>
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
                </div> */}
            </div>
        </>
    );
}
