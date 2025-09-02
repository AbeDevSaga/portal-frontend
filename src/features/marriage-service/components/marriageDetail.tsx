"use client";
import { useParams } from "next/navigation";
import { AlarmClock, Check, Copy, Eye, Info, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import HeroSection from "@/common/components/common/HeroSection";
import { useGetMarriageBySlugQuery } from "../api/marriageApi";
import { MarriageData } from "../types";
import {
    useGetVitalServiceEventQuery,
    useSubmitResolutionFormMutation,
} from "@/features/application-service/api/applicationApi";
import RejectionModal from "./rejectionModal";
import GeneralInformation from "./generalInformation";
import BridalInformation from "./bridalInformation";
import general from "@/public/images/general.svg";
import witness from "@/public/images/witness.svg";
import marriage from "@/public/images/marraige2.svg";
import generalActive from "@/public/images/generalActive.svg";
import marriageActive from "@/public/images/marraigeActive.svg";
import witnessActive from "@/public/images/witnessActive.svg";
import Image from "next/image";
import WitnessInformation from "./witnessInformation";
import check from "@/public/images/check.svg";
import FileViewer from "@/common/components/common/FileViewer";
import FileViewerModal from "@/common/components/common/FileModalCompoennt";
import { useSubmitCertificateRequestMutation } from "@/features/application-service/api/certificateApi";

const body = {
    request: {
        registrationId: "11111111-2222-3333-4444-555555555555",
        certificateType: "MARRIAGE",
        versionNumber: 1,
        data: {
            wifeFullName: "Martha Bekele",
            husbandFullName: "Samuel Tesfaye",
            dateofBirthMonthHusb: "06",
            dateofDayHusb: "15",
            dateofYearHusb: "1990",
            dateofYearHusb_amh: "1997",
            dateofBirthMonthWife: "09",
            dateofDayWife: "02",
            dateofDayWife_amh: "06",
            dateofYearWife: "1994",
            dateofYearWife_amh: "1999",
            citeznshipHusb: "Ethiopian",
            citeznshipWife: "Ethiopian",
            dateofMarriageMonth: "12",
            dateofMarriageDay: "20",
            dateofMarriageYear: "2020",
            regionCityAdmin: "Addis Ababa",
            zoneCityAdmin: "Bole Sub-city",
            city: "Addis Ababa",
            subCity: "Bole",
            woreda: "05",
            kebele: "12",
            kebele_amh: "12",
            marriageRegDateMonth: "12",
            marriageRegDateDay: "22",
            marriageRegDateYear: "2020",
            certificateIssuedDateMonth: "01",
            certificateIssuedDateDay: "05",
            certificateIssuedDateYear: "2021",
            fullNameOfTheOfficerOfCivilStatus: "Alemu Getachew",
            signature: "Alemu G.",
            marriageRegistrationFormNumber: "MRF-2020-12345",
            marriageRegistrationUniqueIdentificationNumber: "MARR-0000123456",
            wifeBirthRegistrationUniqueIdentificationNumber: "BIRTH-0000987654",
            husbandBirthRegistrationUniqueIdentificationNumber:
                "BIRTH-0000123987",
        },
    },
};

// Define the type for the mapped response data
// type MappedResponseData = {
//     title: string;
//     data: { label: string; key: string; value: string; status?: string }[];
// }[];

export default function MarriageDetail() {
    const [response, setResponse] = useState<MarriageData | null>(null);
    const [openFileModal, setOpenFileModal] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);

    const [copied, setCopied] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const params = useParams();
    const slug = params.slug;
    const { isLoading, isError, data } = useGetMarriageBySlugQuery({
        id: slug,
    });
    const [displayDoc, setDisplayDoc] = useState("");

    useEffect(() => {
        if (!isError && !isLoading && data) {
            setResponse(data.data);
        }
    }, [data]);

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
    ] = useSubmitCertificateRequestMutation();
    const handleRequestCertificate = async () => {
        try {
            const response = await submitCertificateRequest({ data: body });
        } catch (err) {}
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

    const [displayData, setDisplayData] = useState("general");
    const marriageDetailOptions = [
        {
            label: "General Info",
            component: (
                <GeneralInformation
                    data={data?.data || null}
                    status={vitalData ? vitalData.data.status : ""}
                />
            ),
            value: "general",
            image: general.src,
            imageActive: generalActive.src,
        },
        {
            label: "Bridal Info",
            component: <BridalInformation data={data?.data || null} />,
            value: "bridal",
            image: marriage.src,
            imageActive: marriageActive.src,
        },
        {
            label: "Witnessess",
            component: <WitnessInformation data={data?.data || null} />,
            value: "witnessess",
            image: witness.src,
            imageActive: witnessActive.src,
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
                        disabled={resolutionIsLoading}
                    >
                        Validate Application
                    </Button>
                    <Button
                        onClick={() => setOpenRejectModal(true)}
                        disabled={resolutionIsLoading}
                    >
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

    const handleConvertSupportingDocStringToArray = (value: string) => {
        const result = JSON.parse(value);
        return result || [];
    };

    const supportingDocsArray = data?.data?.supporting_doc_url
        ? handleConvertSupportingDocStringToArray(
              data?.data?.supporting_doc_url
          )
        : [];

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
            action: handleRequestCertificate,
        },
        {
            title: "Lost",
            details: [
                "Confirmation letter from woreda police department is required",
            ],
            buttonTitle: "Request Lost Certificate",
            paymentAmount: 250,
            action: handleRequestCertificate,
        },
        {
            title: "Damaged",
            details: ["The Damaged certificate must be presented"],
            buttonTitle: "Request Damaged Certificate",
            paymentAmount: 250,
            action: handleRequestCertificate,
        },
    ];

    return (
        <>
            <HeroSection
                redirectTo='/application'
                title='Marriage Detail'
                description='This is the marriage detail of a family member section'
                action={
                    <div className='space-y-5 space-x-5'>
                        {handleRenderApplicationDecisionButtons(
                            vitalData ? vitalData.data.status : ""
                        )}
                    </div>
                }
            />

            <div className='flex flex-wrap xl:flex-nowrap gap-10'>
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
                    : null}

                {isLoading ? (
                    <div className='flex-1 flex items-center justify-center'>
                        <Loader className='animate-spin' />
                    </div>
                ) : null} */}

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
                                                    ? component.imageActive
                                                    : component.image
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

                            <div className='flex flex-col justify-between w-full shadow-sm'>
                                <p>Attachment</p>
                                <div className='space-y-2'>
                                    {Array.isArray(supportingDocsArray) &&
                                    supportingDocsArray.length > 0
                                        ? supportingDocsArray.map(
                                              (item, index) => (
                                                  <div
                                                      key={index}
                                                      onClick={() => {
                                                          setDisplayDoc(
                                                              item.fileUrl
                                                          );
                                                          setOpenFileModal(
                                                              true
                                                          );
                                                      }}
                                                      className='cursor-pointer shadow-md rounded-sm overflow-clip flex w-full max-w-[300px] border border-[#004EAD]'
                                                  >
                                                      <div className='p-2 w-full text-sm'>
                                                          <p className='line-clamp-1'>
                                                              {item.fileName}
                                                          </p>
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
                                              )
                                          )
                                        : null}
                                </div>

                                {openFileModal ? (
                                    <FileViewerModal
                                        file={displayDoc}
                                        open={openFileModal}
                                        handleCancel={setOpenFileModal}
                                    />
                                ) : null}
                            </div>
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
                                        <Button
                                            onClick={
                                                requirementsandactionItem.action
                                            }
                                            className='bg-[#073954]'
                                        >
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
