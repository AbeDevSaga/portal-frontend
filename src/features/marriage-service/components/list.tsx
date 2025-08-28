"use client";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useGetMarriagesListQuery } from "@/redux/api/marriageApi";

import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { DataTable } from "@/common/components/common/CrrsaTable";
import SelectComponent from "@/common/components/common/SelectComponent";
import { Marriagecolumns } from "./tableColumns";

export default function MarriageList() {
    const [response, setResponse] = useState([]);
    const t = useTranslations();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
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

    const filterOptions = [
        { value: "new", label: t("New") as string },
        { value: "correction", label: t("Correction") as string },
        { value: "lost", label: t("Lost") as string },
        { value: "damaged", label: t("Damaged") as string },
    ];
    const filterStatus = ["all", "completed", "rejected", "inprogress"];
    const handlePagination = (index: number, size: number) => {
        console.log("index", index, "size", size);
        setPageDetail({
            ...pageDetail,
            pageIndex: index,
            pageSize: size,
        });
    };

    const { data, isLoading, isError } = useGetMarriagesListQuery({
        page: pageDetail.pageIndex + 1,
        perPage: pageDetail.pageSize,
    });

    useEffect(() => {
        if (!isError && !isLoading && data) {
            setResponse(data.response);
            setPageDetail({
                ...pageDetail,
                pageCount: data.metadata.totalPages,
            });
            console.log("data", data.response);
        }
    }, [data]);

    return (
        <>
            <Card className='py-8 px-5 space-y-8 w-full'>
                <div className='flex flex-wrap gap-5 justify-between items-center'>
                    <div>
                        <p className='font-bold text-2xl text-[#073954]'>
                            Marriage
                        </p>
                        <p className='text-lg text-[#073954]/40'>
                            This is the Marriage registration and certificate
                            seciton
                        </p>
                    </div>
                    <div className='flex flex-wrap items-center gap-2 min-w-fit'>
                        <div className='py-2 px-3 rounded-md border-2 border-[#e4e4e4] gap-4 w-fit flex flex-wrap'>
                            {filterStatus.map((filterStatusOption) => (
                                <Button
                                    onClick={() =>
                                        setSearchParams(
                                            filterStatusOption,
                                            "status"
                                        )
                                    }
                                    className={`${
                                        statusValue === filterStatusOption
                                            ? "bg-[#2C566A] shadow-md"
                                            : "bg-transparent border-none shadow-none text-primary hover:text-secondary"
                                    }`}
                                    key={filterStatusOption}
                                    size='lg'
                                >
                                    <p className='capitalize py-2'>
                                        {filterStatusOption}
                                    </p>
                                </Button>
                            ))}
                        </div>
                        <div>
                            <SelectComponent
                                options={filterOptions}
                                onChange={handleSelectType}
                                value={typeValue}
                            />
                        </div>
                        <Button
                            className='flex items-center gap-1.5 !h-full primary-button'
                            asChild
                        >
                            <Link href='/users/features/marriage-registration/new'>
                                <Plus />
                                Register Marriage
                            </Link>
                        </Button>
                    </div>
                </div>
                <DataTable
                    columns={Marriagecolumns}
                    data={response}
                    handlePagination={handlePagination}
                    tablePageSize={pageDetail.pageSize}
                    totalPageCount={pageDetail.pageCount}
                    currentIndex={pageDetail.pageIndex}
                />
            </Card>
        </>
    );
}
