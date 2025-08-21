"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    AlarmClock,
    Check,
    ChevronLeft,
    Copy,
    Eye,
    FileText,
    Info,
    Plus,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { stat } from "fs";
import PdfDetailBlock from "../components/pdfDetailBlock";
import StatusLog from "../components/statusLog";
import TotalRaisedIssue from "../components/totalRaisedIssue";
import { title } from "process";
import { useState } from "react";
import DetailBlock from "../components/detailBlock";
import placeholderimage from "@/public/images/placeholder-man.png";
import HeroSection from "@/components/common/HeroSection";

export default function Home({ params }: any) {
    const t = useTranslations();
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [showTimer, setShowTimer] = useState(false);
    const basicInformation = {
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
                label: "Mother's Nationality",
                key: "",
                value: "Ethiopian",
            },
            {
                label: "Father's Name",
                key: "",
                value: "Abebe Biru Damtew",
            },
            {
                label: "Father's Nationality",
                key: "",
                value: "Ethiopian",
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
    };
    const applicationInformation = {
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
        ],
        status: "rejected",
    };
    const legalInformation = {
        title: "Legal Information",
        data: [
            {
                label: "Digital Registration No.",
                key: "",
                value: "IN-2025-0001",
            },
            {
                label: "Passport No.",
                key: "",
                value: "328213123123",
            },
            {
                label: "FIN",
                key: "",
                value: "123412341234",
            },
            {
                label: "Driver's License No.",
                key: "",
                value: "2025-07-06",
            },
            {
                label: "Martial Status",
                key: "",
                value: "Single",
            },
        ],
    };
    const birthInformation = {
        title: "Birth Information",
        data: [
            {
                label: "Country of Birth",
                key: "",
                value: "Ethiopia",
            },
            {
                label: "Region",
                key: "",
                value: "Addis Ababa",
            },
            {
                label: "Zone / Subcity",
                key: "",
                value: "Bole",
            },
            {
                label: "Woreda",
                key: "",
                value: "02",
            },
            {
                label: "Kebele",
                key: "",
                value: "08",
            },
            {
                label: "Specific Location",
                key: "",
                value: "Bole Brass",
            },
            {
                label: "Birth Date",
                key: "",
                value: "11 Feb, 2002",
            },
        ],
    };
    const educationAndWorkInformation = {
        title: "Education and Work Information",
        data: [
            {
                label: "Education Level",
                key: "",
                value: "10th Grade",
            },
            {
                label: "Occupation Type",
                key: "",
                value: "- -",
            },
            {
                label: "Work Place Name",
                key: "",
                value: "- -",
            },
        ],
    };
    const statusLogs = [
        {
            image: "https://github.com/shadcn.png",
            name: "Leul sisay",
            status: "Verified",
            date: "Feburary 24, 2024 - 12:05 AM",
        },
        {
            image: "https://github.com/shadcn.png",
            name: "Leul sisay",
            status: "Verified",
            date: "Feburary 24, 2024 - 12:05 AM",
        },
        {
            image: "https://github.com/shadcn.png",
            name: "Leul sisay",
            status: "Verified",
            date: "Feburary 24, 2024 - 12:05 AM",
        },
    ];
    const pdfDetail = {
        title: "Attachment",
        data: {
            title: "Health_center_doc.pdf",
            url: "abck",
        },
    };
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

    return (
        <>
            <HeroSection
                title='Birth Detail'
                description='This is the birth detail of a family member section'
                action={
                    <Button
                        className='bg-[#073954]'
                        onClick={() => setShowTimer(true)}
                    >
                        Request Certificate
                    </Button>
                }
            />

            <div className='flex flex-wrap xl:flex-nowrap gap-10'>
                <Card className='py-5 px-5 w-full h-fit'>
                    <div className='grid lg:grid-cols-3 pb-5 border-b gap-10'>
                        <div className='flex items-center justify-center'>
                            <Avatar className='w-[140px] h-[140px] mx-auto lg:mx-0'>
                                <AvatarImage
                                    src={placeholderimage.src}
                                />
                                <AvatarFallback>
                                    CN
                                </AvatarFallback>
                            </Avatar>{" "}
                        </div>
                        <DetailBlock
                            blockData={basicInformation}
                        />
                        <DetailBlock
                            blockData={applicationInformation}
                            hasStatus={true}
                        />
                    </div>
                    <div className='grid md:grid-cols-2 py-5 border-b gap-10'>
                        <DetailBlock
                            blockData={legalInformation}
                        />
                        <DetailBlock
                            blockData={birthInformation}
                        />
                    </div>
                    <div className='grid md:grid-cols-2 py-5 gap-10'>
                        <DetailBlock
                            blockData={
                                educationAndWorkInformation
                            }
                        />
                        <PdfDetailBlock blockData={pdfDetail} />
                    </div>
                </Card>
                <div className='w-fit min-w-[350px] 2xl:min-w-[500px] flex-1 flex flex-col md:flex-row xl:flex-col gap-5'>
                    {/* <StatusLog statusData={statusLogs} />
                                    <TotalRaisedIssue /> */}
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
                            <p className='font-semibold'>
                                Payment information
                            </p>
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
                                            handleCopy(
                                                "copied value"
                                            )
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
                                        key={
                                            requirementsandactionItem.title
                                        }
                                        className='p-3 space-y-3 bg-[#E8EEFD] border border-[#204D66] text-[#073954]'
                                    >
                                        <p className='font-semibold mb-3'>
                                            {
                                                requirementsandactionItem.title
                                            }
                                        </p>
                                        <div className='space-y-1.5'>
                                            {requirementsandactionItem.details.map(
                                                (
                                                    detailsItem
                                                ) => (
                                                    <div
                                                        key={
                                                            detailsItem
                                                        }
                                                        className='flex gap-2 items-center'
                                                    >
                                                        <div>
                                                            <Check
                                                                size={
                                                                    24
                                                                }
                                                            />
                                                        </div>
                                                        <p>
                                                            {
                                                                detailsItem
                                                            }
                                                        </p>
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
                                                You are asked to
                                                pay{" "}
                                                {
                                                    requirementsandactionItem.paymentAmount
                                                }{" "}
                                                Br for this
                                                service
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
        </>
    );
}
