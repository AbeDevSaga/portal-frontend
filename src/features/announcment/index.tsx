"use client";
import LandingNavBar from "@/common/components/layout/landingNavBar";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import React, { useEffect, useState } from "react";
import ComplaintModal from "./components/complaintModal";
import MarriageAvatar from "./components/marriageAvatar";
import ellipse from "@/public/images/Ellipse-25.svg";
import looper from "@/public/images/Looper-bg.svg";
import Image from "next/image";
import { PaginationComponent } from "@/common/components/ui/paginationComponent";
import { useGetListQuery } from "@/features/list/api/listApi";
import MarriageCard from "./components/MarriageCard";
import { useGetVitalServiceEventQuery } from "../application-service/api/applicationApi";
import { complaintType } from "./types/type";

const Announcement = () => {
    const [openComplaintModalOpen, setOpenComplaintModal] = useState(false);
    const [complaintModalData, setComplaintModalData] =
        useState<complaintType | null>(null);
    const [pageDetail, setPageDetail] = useState({
        pageIndex: 1,
        pageCount: 1,
        pageSize: 8,
    });
    const handleSetCurrentPage = (index: number) => {
        setPageDetail({
            ...pageDetail,
            pageIndex: index,
        });
    };
    const [showTab, setShowTab] = useState("marriage");
    const tabOptions = [
        {
            label: "Marriage",
            value: "marriage",
        },
        {
            label: "Vacancy",
            value: "vacancy",
        },
        {
            label: "Announcement",
            value: "announcement",
        },
    ];
    const marriageData = [
        {
            subcity: "Bole Subcity",
            woreda: "02",
            daysRemaining: "5",
            id: 123,
        },
        {
            subcity: "Bole Subcity",
            woreda: "02",
            daysRemaining: "5",
            id: 123,
        },
        {
            subcity: "Bole Subcity",
            woreda: "02",
            daysRemaining: "5",
            id: 123,
        },
        {
            subcity: "Bole Subcity",
            woreda: "02",
            daysRemaining: "5",
            id: 123,
        },
    ];

    const handleShowAnnouncement = (option: string) => {
        setShowTab(option);
    };
    const handlePageChange = async (page: number) => {
        // setIsLoading(true);
        try {
            // const response = await fetch(`/api/data?page=${page}`);
            // const newData = await response.json();
            // setData(newData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // setIsLoading(false);
        }
    };
    const { isLoading, isError, data } = useGetListQuery({
        page: pageDetail.pageIndex,
        perPage: pageDetail.pageSize,
        type: "MARRIAGE",
        languageCode: "en",
    });

    useEffect(() => {
        if (!isError && !isLoading && data) {
            setPageDetail({
                ...pageDetail,
                pageCount: data.total_page,
            });
            console.log("data", data);
        }
    }, [data]);

    return (
        <div
            className='min-h-screen bg-cover bg-no-repeat font-barlow flex-1 flex flex-col pb-5 w-full items-center'
            id='home'
        >
            <LandingNavBar />
            <div className='relative overflow-clip flex-1 flex flex-col w-full gap-5 pb-5'>
                <div className='absolute h-full w-full z-10 md:bottom-40 lg:left-[15rem]'>
                    <div className='flex-1 relative h-full w-full min-h-[70vh] lg:min-h-[125vh]'>
                        <Image src={looper.src} alt='looper' fill></Image>
                    </div>
                </div>
                <div className='absolute bottom-10 md:-bottom-36 right-[20rem] w-[125vw] z-10 h-[800px]'>
                    <div className='flex-1 relative h-full w-full '>
                        <Image src={ellipse.src} alt='ellipse' fill></Image>
                    </div>
                </div>

                <div className='z-30 w-full max-w-[1700px] mx-auto flex flex-col flex-1 justify-center gap-10 lg:gap-20 px-5 relative overflow-clip'>
                    <div className='flex justify-between lg:flex-wrap lg:justify-evenly pb-2 lg:pb-5 w-fit mx-auto lg:gap-16'>
                        {tabOptions.map((option) => (
                            <div key={option.label}>
                                <Button
                                    variant='ghost'
                                    onClick={() =>
                                        handleShowAnnouncement(option.value)
                                    }
                                >
                                    <p className='capitalize text-sm lg:text-xl'>
                                        {option.label}
                                    </p>
                                </Button>
                                {showTab === option.value ? (
                                    <div className='w-full py-1 bg-[#073954] rounded-full'></div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                    <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-10'>
                        {data !== null && data !== undefined
                            ? data?.data?.map((married, index) => (
                                  <MarriageCard
                                      key={married.registrationFormNumber}
                                      setOpenComplaintModal={
                                          setOpenComplaintModal
                                      }
                                      setComplaintModalData={
                                          setComplaintModalData
                                      }
                                      data={married}
                                      isLoading={isLoading}
                                  />
                              ))
                            : null}
                    </div>
                </div>
                <div className='flex justify-end w-full max-w-[1700px] mx-auto px-5 z-30'>
                    <PaginationComponent
                        totalItems={pageDetail.pageCount * pageDetail.pageSize}
                        itemsPerPage={pageDetail.pageSize}
                        onPageChange={handlePageChange}
                        currentPage={pageDetail.pageIndex}
                        setCurrentPage={handleSetCurrentPage}
                    />
                </div>
            </div>

            {openComplaintModalOpen ? (
                <ComplaintModal
                    open={openComplaintModalOpen}
                    handleCancel={setOpenComplaintModal}
                    complaintModalData={complaintModalData}
                />
            ) : null}
            {/* <Footer /> */}
        </div>
    );
};

export default Announcement;
