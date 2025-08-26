"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./pagination";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    onPageChange?: (page: number) => void;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export function PaginationComponent({
    totalItems,
    itemsPerPage,
    onPageChange,
    currentPage,
    setCurrentPage,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxVisiblePages = 3;

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        onPageChange?.(page);
    };

    const getVisiblePages = () => {
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePages = getVisiblePages();

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                        }}
                        href='#'
                        aria-disabled={currentPage === 1}
                    />
                </PaginationItem>

                {visiblePages[0] > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(1);
                                }}
                                href='#'
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {visiblePages[0] > 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </>
                )}

                {visiblePages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                            }}
                            href='#'
                            isActive={page === currentPage}
                            className={
                                page === currentPage
                                    ? "bg-[#2f6778] text-white"
                                    : ""
                            }
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {visiblePages[visiblePages.length - 1] < totalPages && (
                    <>
                        {visiblePages[visiblePages.length - 1] <
                            totalPages - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(totalPages);
                                }}
                                href='#'
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                        }}
                        href='#'
                        aria-disabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
