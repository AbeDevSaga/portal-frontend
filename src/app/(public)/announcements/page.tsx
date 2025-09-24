"use client";
import LandingNavBar from "@/common/components/layout/landingNavBar";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import marriage from "@/public/images/sidebar/marriage.svg";
import { PaginationComponent } from "@/common/components/ui/paginationComponent";
import { Input } from "@/common/components/ui/input";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import ComplaintModal from "@/features/vital-service/components/complaintModal";
import MarriageAvatar from "@/features/vital-service/components/marriageAvatar";
const mockMarriageData = [
  {
    id: 1,
    subcity: "Bole",
    woreda: "08",
    daysRemaining: 15,
    groomName: "Michael Getachew",
    brideName: "Selamawit Abebe",
  },
  {
    id: 2,
    subcity: "Kirkos",
    woreda: "03",
    daysRemaining: 8,
    groomName: "Yonas Tadesse",
    brideName: "Meron Solomon",
  },
  {
    id: 3,
    subcity: "Arada",
    woreda: "01",
    daysRemaining: 12,
    groomName: "Dawit Haile",
    brideName: "Eyerusalem Teshome",
  },
  {
    id: 4,
    subcity: "Lideta",
    woreda: "05",
    daysRemaining: 5,
    groomName: "Samuel Mekonnen",
    brideName: "Hanna Girma",
  },
  {
    id: 5,
    subcity: "Nifas Silk",
    woreda: "09",
    daysRemaining: 1,
    groomName: "Tewodros Assefa",
    brideName: "Lydia Daniel",
  },
  {
    id: 6,
    subcity: "Kolfe",
    woreda: "12",
    daysRemaining: 12,
    groomName: "Biniam Kassahun",
    brideName: "Ruth Samuel",
  },
  {
    id: 7,
    subcity: "Gulele",
    woreda: "07",
    daysRemaining: 5,
    groomName: "Elias Worku",
    brideName: "Sara Michael",
  },
  {
    id: 8,
    subcity: "Yeka",
    woreda: "11",
    daysRemaining: 3,
    groomName: "Nathaniel Alemu",
    brideName: "Deborah Yohannes",
  },
  // Added entries here:
  {
    id: 9,
    subcity: "Addis Ketema",
    woreda: "13",
    daysRemaining: 10,
    groomName: "Abel Tesfaye",
    brideName: "Mahiya Kassa",
  },
  {
    id: 10,
    subcity: "Akaki",
    woreda: "14",
    daysRemaining: 7,
    groomName: "Berhanu Solomon",
    brideName: "Lily Desalegn",
  },
  {
    id: 11,
    subcity: "Kolfe Keranyo",
    woreda: "15",
    daysRemaining: 9,
    groomName: "Getachew Tadesse",
    brideName: "Sara Alemu",
  },
  {
    id: 12,
    subcity: "Kality",
    woreda: "16",
    daysRemaining: 4,
    groomName: "Meles Kidane",
    brideName: "Winta Gebremedhin",
  },
  {
    id: 13,
    subcity: "Yeka",
    woreda: "17",
    daysRemaining: 6,
    groomName: "Solomon Abebe",
    brideName: "Helen Fikadu",
  },
  {
    id: 14,
    subcity: "Gulele",
    woreda: "18",
    daysRemaining: 11,
    groomName: "Tesfaye Alemayehu",
    brideName: "Marta Degu",
  },
  {
    id: 15,
    subcity: "Arada",
    woreda: "19",
    daysRemaining: 2,
    groomName: "Samuel Kiros",
    brideName: "Rahel Mengistu",
  },
];

const subcityWoredaData = {
  "Addis Ketema": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"],
  "Akaky Kaliti": ["01", "02", "03", "04", "05", "06", "07"],
  "Arada": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
  "Bole": ["01", "02", "03", "04", "05", "06", "07", "09", "11", "12", "13", "14"],
  "Gullele": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
  "Kirkos": ["01", "02", "03", "04", "05", "07", "08", "09", "10", "11"],
  "Kolfe Keranio": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
  "Lideta": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
  "Nifas Silk-Lafto": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
  "Yeka": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
}


const AnnouncementPage = () => {
  const [openComplaintModalOpen, setOpenComplaintModal] = useState(false);
  const [selectedMarriage, setSelectedMarriage] = useState<{
    groomName: string;
    brideName: string;
  } | null>(null);
  const [response, setResponse] = useState<any[]>([]);
  const [pageDetail, setPageDetail] = useState({
    pageIndex: 1,
    pageCount: 1,
    pageSize: 10,
  });
  const [subcityValue, setSubcityValue] = useState("");
  const [woredaValue, setWoredaValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>(mockMarriageData);
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
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
      label: "Announcement",
      value: "announcement",
    },
  ];

  // Generate dynamic couple avatar data
  const generateCoupleAvatar = (groomName: string, brideName: string) => [
    {
      image: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 100
      )}.jpg`,
      name: groomName,
    },
    {
      image: `https://randomuser.me/api/portraits/women/${Math.floor(
        Math.random() * 100
      )}.jpg`,
      name: brideName,
    },
  ];

  // Mock data for marriage announcements

  const handleShowAnnouncement = (option: string) => {
    setShowTab(option);
  };

  const handlePageChange = (page: number) => {
    setPageDetail({
      ...pageDetail,
      pageIndex: page,
    });
  };

  // Initialize data on component mount
  useEffect(() => {
    setFilteredData(mockMarriageData);
    setPageDetail((prev) => ({
      ...prev,
      pageCount: Math.ceil(mockMarriageData.length / prev.pageSize),
    }));
  }, []);

  // Manual filter function
  const applyFilters = () => {
    let filtered = mockMarriageData;

    // Apply name filter
    if (nameValue) {
      filtered = filtered.filter(
        (item) =>
          item.groomName.toLowerCase().includes(nameValue.toLowerCase()) ||
          item.brideName.toLowerCase().includes(nameValue.toLowerCase())
      );
    }

    // Apply subcity filter
    if (subcityValue) {
      filtered = filtered.filter((item) => item.subcity === subcityValue);
    }

    // Apply woreda filter
    if (woredaValue) {
      filtered = filtered.filter((item) => item.woreda === woredaValue);
    }

    setFilteredData(filtered);

    // Reset to first page when filters change
    setPageDetail((prev) => ({
      ...prev,
      pageIndex: 1,
      pageCount: Math.ceil(filtered.length / prev.pageSize),
    }));
  };

  // Handle pagination for filtered data
  useEffect(() => {
    const startIndex = (pageDetail.pageIndex - 1) * pageDetail.pageSize;
    const endIndex = startIndex + pageDetail.pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    setResponse(paginatedData);
  }, [pageDetail.pageIndex, pageDetail.pageSize, filteredData]);

  // Handle click outside to close filter
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);
  const handleSubcityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Subcity changed:", e.target.value);
    setSubcityValue(e.target.value);
    // Reset woreda when subcity changes
    setWoredaValue("");
  };

  const handleWoredaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Woreda changed:", e.target.value);
    setWoredaValue(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Name changed:", e.target.value);
    setNameValue(e.target.value);
  };

  // Clear all filters
  const clearFilters = () => {
    setSubcityValue("");
    setWoredaValue("");
    setNameValue("");
    setFilteredData(mockMarriageData);
    setPageDetail((prev) => ({
      ...prev,
      pageIndex: 1,
      pageCount: Math.ceil(mockMarriageData.length / prev.pageSize),
    }));
  };
  return (
    <section
      className="w-full bg-[#073954]/9 bg-cover bg-no-repeat p-4 flex items-start justify-start min-h-screen font-barlow"
      id="announcements"
    >
      <div className="  overflow-clip flex-1 flex flex-col w-full gap-5">
        <div className="w-full lg:px-[66px] mx-auto flex  flex-col flex-1 justify-center gap-5 py-5 overflow-clip">
          <div className="flex justify-between lg:flex-wrap lg:justify-evenly lg:pb-5 w-fit mx-auto lg:gap-16">
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
          {showTab === "announcement" ? (<div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg">
              <div className="text-center">
                <div className="text-6xl text-gray-300 mb-4">📢</div>
                <h3 className="text-3xl font-semibold text-[#073954] mb-2">
                  Announcement
                </h3>
                <p className="text-gray-500 text-lg">
                  No announcements available at this time.
                </p>
              </div>
            </div>):
          (<>
           <div className="w-full flex justify-end relative items-start">
           <div className=" absolute right-0 z-20 -top-10  ">
             {/* Filter Section */}
             {/* show the padding only when the showFilter is true */}
             <div ref={filterRef} className={`border flex justify-center items-center flex-col bg-white  rounded-lg ${showFilter ? "shadow-lg  " : ""}`}>
              {/* if the showFilter is true, then update the background color to #073954 */}
              <Button
                onClick={() => setShowFilter(!showFilter)}
                variant="outline"
                className={`w-full min-w-44    flex  items-center justify-between ${
                  showFilter
                    ? "  bg-gray-100 outline-none    border-gray-300 font-medium"
                    : ""
                }`}
              >
                <p className="text-sm  ">Filter</p>
                <ChevronDownIcon
                  className={`w-4 h-4 ${showFilter ? "rotate-180" : ""}`}
                />
              </Button>
               {showFilter && (
                 <div className="flex max-w-44 px-4 py-2 pb-3 rounded-lg  bg-white min-w-40 mt-2 flex-col w-fit flex-wrap gap-2 items-center justify-center  ">
                  <div className="flex w-full flex-col ">
                    <select
                      name="subcity"
                      id="subcity"
                      onChange={handleSubcityChange}
                      value={subcityValue}
                      className="px-5 py-2 border cursor-pointer border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#073954] focus:border-transparent"
                    >
                      {Object.keys(subcityWoredaData).map((subcity) => (
                        <option key={subcity} value={subcity}>
                          {subcity}
                        </option>
                      ))}
                    </select>
                  </div>

                   {/* Woreda Filter */}
                   <div className="flex w-full flex-col">
                     <select
                       name="woreda"
                       id="woreda"
                       onChange={handleWoredaChange}
                       value={woredaValue}
                       disabled={!subcityValue}
                       className={`px-5 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#073954] focus:border-transparent ${
                         !subcityValue 
                           ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed" 
                           : "border-gray-300 cursor-pointer"
                       }`}
                     >
                       <option value="">All Woredas</option>
                       {subcityValue && subcityWoredaData[subcityValue as keyof typeof subcityWoredaData] && 
                         subcityWoredaData[subcityValue as keyof typeof subcityWoredaData].map((woreda) => (
                           <option key={woreda} value={woreda}>
                             {woreda}
                           </option>
                         ))
                       }
                     </select>
                   </div>

                  {/* Name Filter */}
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Groom or Bride name"
                      value={nameValue}
                      onChange={handleNameChange}
                      className="w-full px-3 py-2 border cursor-pointer border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#073954] focus:border-transparent"
                    />
                  </div>

                   {/* filter button */}
                   <Button 
                     onClick={applyFilters}
                     className="w-full bg-[#073954] text-white"
                   >
                     Filter
                   </Button>
                </div>
              )}
            </div>
          </div>
          </div>

          {/* No Data Message */}
          {filteredData.length === 0 && (
            <div className="flex  flex-col items-center justify-center py-12 bg-white rounded-lg ">
              <div className="text-center">
                <div className="text-6xl text-gray-300 mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Marriage Announcements Found
                </h3>
                <p className="text-gray-500 mb-4">
                  No marriage announcements match your current filter criteria.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-[#073954] hover:bg-[#073954]/90 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}

           {/* Marriage Cards Grid - Only show when there are results */}
           {filteredData.length > 0 && (
             <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
              {response.map((married, index) => (
                 <div
                   key={index}
                   className="pt-3.5 pb-2 px-5 rounded-md shadow-md bg-white "
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
                    <MarriageAvatar
                      coupleAvatar={generateCoupleAvatar(
                        married.groomName,
                        married.brideName
                      )}
                    />
                    <div className="flex w-full justify-between py-0.5 border-y pt-1.5">
                      <div className="leading-tight">
                        <p>Subcity</p>
                        <p className="text-sm font-semibold">
                          {married.subcity}
                        </p>
                      </div>
                      <div className=" leading-none">
                        <p>Woreda</p>
                        <p className="text-sm font-semibold">
                          {married.woreda}
                        </p>
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
                        setSelectedMarriage({
                          groomName: married.groomName,
                          brideName: married.brideName,
                        });
                        setOpenComplaintModal(true);
                      }}
                      size="sm"
                      className="bg-[#073954]"
                    >
                      Give Complaint
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination - Only show when there are results */}
          {filteredData.length > 0 && (
            <div className="flex justify-end w-full max-w-[1200px] mx-auto px-5 z-30">
              <PaginationComponent
                totalItems={filteredData.length}
                itemsPerPage={pageDetail.pageSize}
                onPageChange={handlePageChange}
                currentPage={pageDetail.pageIndex}
                setCurrentPage={handleSetCurrentPage}
              />
            </div>
          )}
          </>)}
        </div>
      </div>

      {openComplaintModalOpen ? (
        <ComplaintModal
          open={openComplaintModalOpen}
          handleCancel={setOpenComplaintModal}
          groomName={selectedMarriage?.groomName}
          brideName={selectedMarriage?.brideName}
        />
      ) : null}
    </section>
  );
};

export default AnnouncementPage;
