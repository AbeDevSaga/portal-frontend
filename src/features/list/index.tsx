"use client";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { TableColumns } from "./components/tableColumns";
// import { useGetBirthsListQuery } from "@/redux/api/birthApi";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { DataTable } from "@/common/components/common/CrrsaTable";
import SelectComponent from "@/common/components/common/SelectComponent";
import { useGetListQuery } from "./api/listApi";
import RequestTypeDropdown from "./components/RequestTypeDropdown";

export default function List() {
  const [response, setResponse] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState<any[]>([]);

  const t = useTranslations();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [requestType, setRequestType] = useState("");
  const typeValue = searchParams.get("type") || "";
  const statusValue = searchParams.get("status") || "all";

  const [pageDetail, setPageDetail] = useState({
    pageIndex: 0,
    pageCount: 1,
    pageSize: 10,
  });
  const setSearchParams = useCallback(
    (pn: number | string | null, paramType: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (pn === null || pn === "" || typeof pn === "undefined") {
        params.delete(paramType);
      } else {
        params.set(paramType, String(pn));
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );
  const handleSelectType = (selected: string) => {
    setSearchParams(selected, "type");
  };

  const requstOptions = [
    { value: "BIRTH", label: t("BIRTH") as string },
    { value: "MARRIAGE", label: t("MARRIAGE") as string },
    { value: "DIVORCE", label: t("DIVORCE") as string },
    { value: "NON_MARRIAGE", label: t("NON_MARRIAGE") as string },
    { value: "DEATH", label: t("DEATH") as string },
  ];
  const filterOptions = [
    { value: "new", label: t("New") as string },
    { value: "correction", label: t("Correction") as string },
    { value: "lost", label: t("Lost") as string },
    { value: "damaged", label: t("Damaged") as string },
  ];
  const filterStatus = [
    { value: "all", label: t("All") as string },
    { value: "approved", label: t("Approved") as string },
    { value: "rejected", label: t("Rejected") as string },
    { value: "submitted", label: t("Submitted") as string },
    { value: "under_review", label: t("Under Review") as string },
  ];
  const handlePagination = (index: number, size: number) => {
    console.log("index", index, "size", size);
    setPageDetail({
      ...pageDetail,
      pageIndex: index,
      pageSize: size,
    });
  };

  // const { data, isLoading, isError } = useGetBirthsListQuery({
  //     page: pageDetail.pageIndex + 1,
  //     perPage: pageDetail.pageSize,
  // });
  const { isLoading, isError, data } = useGetListQuery({
    page: pageDetail.pageIndex + 1,
    perPage: pageDetail.pageSize,
    type: requestType,
    languageCode: "en",
  });

  useEffect(() => {
    if (!isError && !isLoading && data) {
      setResponse(data.data);
      setPageDetail({
        ...pageDetail,
        pageCount: data.total_page,
      });
      //   console.log("data", data);
    }
  }, [data, isError, isLoading]);

  // Apply status filter on already fetched data
  useEffect(() => {
    if (statusValue === "all") {
      setFilteredResponse(response);
    } else {
      setFilteredResponse(
        response.filter((item: any) => {
          const apiStatus = item.status?.toUpperCase();
          const filterStatus = statusValue.toUpperCase();
          return apiStatus === filterStatus;
        })
      );
    }
  }, [statusValue, response]);

  return (
    <>
      <Card className="py-8 px-5 space-y-8 w-full">
        <div className="flex flex-wrap gap-5 justify-between items-center">
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <p className="font-bold text-2xl text-[#073954]">
                Civil Service Requests
              </p>
              <p className="text-lg text-[#073954]/40">
                This is the list of service requests
              </p>
            </div>

            <Button
              className="flex items-center gap-1.5 !h-full primary-button"
              asChild
            >
              <Link href="/application/newRequest" className="h-full">
                <Plus />
                New View Request
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-2 min-w-fit">
            <div className="py-2 px-3 rounded-md border-2 border-[#e4e4e4] gap-4 w-fit flex flex-wrap">
              {filterStatus.map((filterStatusOption) => (
                <Button
                  onClick={() =>
                    setSearchParams(filterStatusOption.value, "status")
                  }
                  className={`${
                    statusValue === filterStatusOption.value
                      ? "bg-[#2C566A] shadow-md"
                      : "bg-transparent border-none shadow-none text-primary hover:text-secondary"
                  }`}
                  key={filterStatusOption.value}
                  size="lg"
                >
                  <p className="capitalize py-2">{filterStatusOption.label}</p>
                </Button>
              ))}
            </div>
            <div>
              <RequestTypeDropdown
                requestOptions={requstOptions}
                selectedRequest={requestType}
                setSelectedRequest={setRequestType}
              />
            </div>
            <div>
              <SelectComponent
                options={filterOptions}
                onChange={handleSelectType}
                value={typeValue}
              />
            </div>
          </div>
        </div>

        <DataTable
          columns={TableColumns}
          data={filteredResponse}
          handlePagination={handlePagination}
          tablePageSize={pageDetail.pageSize}
          totalPageCount={pageDetail.pageCount}
          currentIndex={pageDetail.pageIndex}
        />
      </Card>
    </>
  );
}
