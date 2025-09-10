"use client";
import LandingNavBar from "@/common/components/layout/landingNavBar";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import React, { useEffect, useState } from "react";
import ellipse from "@/public/images/Ellipse-25.svg";
import looper from "@/public/images/Looper-bg.svg";
import Image from "next/image";
import marriage from "@/public/images/sidebar/marriage.svg";
import { PaginationComponent } from "@/common/components/ui/paginationComponent";
import { useGetListQuery } from "@/features/list/api/listApi";
import MarriageAvatar from "./marriageAvatar";
import ComplaintModal from "./complaintModal";

const AnnouncementPage = () => {
  const [openComplaintModalOpen, setOpenComplaintModal] = useState(false);
  const [response, setResponse] = useState<any[]>([]);
  const [pageDetail, setPageDetail] = useState({
    pageIndex: 1,
    pageCount: 1,
    pageSize: 10,
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
  const coupleAvatar = [
    {
      image: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 100
      )}.jpg`,
      name: "Abebe kebede",
    },
    {
      image: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 110
      )}.jpg`,
      name: "Abebe kebede",
    },
  ];

  const handleShowAnnouncement = (option: string) => {
    setShowTab(option);
  };
  const handlePageChange = async (page: number) => {
    // setIsLoading(true);
    try {
      const response = await fetch(`/api/data?page=${page}`);
      const newData = await response.json();
      // setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setIsLoading(false);
    }
  };
  const { isLoading, isError, data } = useGetListQuery({
    page: pageDetail.pageIndex + 1,
    perPage: pageDetail.pageSize,
    type: "MARRIAGE",
    languageCode: "en",
  });

  useEffect(() => {
    if (!isError && !isLoading && data) {
      setResponse(data.data);
      setPageDetail({
        ...pageDetail,
        pageCount: data.total_page,
      });
      console.log("data", data);
    }
  }, [data]);

  return (
    <section
      className="w-full bg-[#073954]/10 bg-cover bg-no-repeat p-4 flex items-center justify-center min-h-screen font-barlow"
      id="announcements"
    >
      <div className="w-full overflow-clip flex-1 flex flex-col w-full gap-5">
        <div className="absolute h-full w-full z-10 md:bottom-40 lg:left-[15rem]">
          <div className="flex-1 relative h-full w-full min-h-[70vh] lg:min-h-[125vh]">
            <Image src={looper.src} alt="looper" fill></Image>
          </div>
        </div>
        <div className="absolute bottom-10 md:-bottom-36 right-[20rem] w-[125vw] z-10 h-[800px]">
          <div className="flex-1 relative h-full w-full ">
            <Image src={ellipse.src} alt="ellipse" fill></Image>
          </div>
        </div>

        <div className="w-full lg:px-[66px] mx-auto flex flex-col flex-1 justify-center gap-10 lg:gap-20 py-5 relative overflow-clip">
          <div className="flex justify-between lg:flex-wrap lg:justify-evenly pb-2 lg:pb-5 w-fit mx-auto lg:gap-16">
            {tabOptions.map((option) => (
              <div key={option.label}>
                <Button
                  variant="ghost"
                  onClick={() => handleShowAnnouncement(option.value)}
                >
                  <p className="capitalize text-sm lg:text-xl">
                    {option.label}
                  </p>
                </Button>
                {showTab === option.value ? (
                  <div className="w-full py-1 bg-[#073954] rounded-full"></div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
            {response.map((married, index) => (
              <Card
                key={index}
                className="pt-3.5 pb-2 px-5 rounded-md shadow-md bg-[#FFFFFF]"
              >
                <div className="px-5 space-y-2 pb-3 border-b">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={marriage}
                      alt="marriage"
                      width={20}
                      height={20}
                    />
                    <p className="text-xl font-semibold text-yellow-500">
                      To be Married
                    </p>
                  </div>
                </div>
                <div className="px-5 space-y-2.5">
                  <MarriageAvatar coupleAvatar={coupleAvatar} />
                  <div className="flex w-full justify-between py-0.5 border-y pt-1.5">
                    <div className="leading-tight">
                      <p>Subcity</p>
                      <p className="text-sm font-semibold">{married.subcity}</p>
                    </div>
                    <div className=" leading-none">
                      <p>Woreda</p>
                      <p className="text-sm font-semibold">{married.woreda}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-between items-center py-0.5">
                  <div>
                    <p className="text-2xl font-semibold px-5 text-yellow-500">
                      {married.daysRemaining} days
                    </p>
                    <p className="text-xs">Remaining Complaint Days</p>
                  </div>
                  <Button
                    onClick={() => {
                      setOpenComplaintModal(true);
                    }}
                    size="sm"
                    className="bg-[#073954]"
                  >
                    Give Complaint
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex justify-end w-full max-w-[1700px] mx-auto px-5 z-30">
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
        />
      ) : null}
      {/* <Footer /> */}
    </section>
  );
};

export default AnnouncementPage;
