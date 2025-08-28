"use client";
import { useParams } from "next/navigation";
import { AlarmClock, Check, Copy, Eye, Info, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetMarriageBySlugQuery } from "@/redux/api/marriageApi";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import HeroSection from "@/common/components/common/HeroSection";
import DetailBlock from "@/common/components/common/detailBlock";
import { mapApiResponseToFormFields } from "@/common/utils/dynamic-form/dynamicApiMapper";
import { formConfig } from "./marraige-form-fields";

// Define the type for the mapped response data
type MappedResponseData = {
    title: string;
    data: { label: string; key: string; value: string; status?: string }[];
}[];

export default function MarriageDetail() {
    const [copied, setCopied] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const params = useParams();
    const slug = params.slug;
    const { isLoading, isError, data } = useGetMarriageBySlugQuery({
        id: slug,
    });
    const [response, setResponse] = useState<MappedResponseData>([]);

    useEffect(() => {
        if (!isError && !isLoading && data) {
            const mappedData = mapApiResponseToFormFields(
                data.response[0],
                formConfig
            );
            setResponse(mappedData);
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

    return (
        <>
            <HeroSection
                title='Marriage Detail'
                description='This is the marriage detail of a family member section'
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
                <Card className='py-5 px-5 w-full flex flex-col h-fit min-h-[500px]'>
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
                </Card>
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
        </>
    );
}
