"use client";
import { Button } from "@/common/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import {
    Select as Dropdown,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/common/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/common/components/ui/table";
// import { exportToCSV } from "@/config/utils/export";
import microsoftExcel from "@/public/images/Microsoft-Excel.png";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
} from "@radix-ui/react-tooltip";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
// import { downloadCsv } from "./ExportCsv";
import { sanitizeInput } from "../../utils/validations/sanitizer";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

type FormSubmitHandler = React.FormEvent<HTMLFormElement>;
type FilterConfig = {
    label: string;
    value: string;
    type: "input" | "dropdown" | any;
    displayArray?: any[];
};
type DynamicTableProps<T> = {
    data: T[];
    columns: ColumnDef<T>[];
    loading: boolean;
    handleFecthByPaginationAndFilter: (
        pageIndex: number,
        pageSize: number,
        filterColumn: any,
        filterInputValue: any
        // filterStatusColumnInput: boolean
    ) => void;
    totalPageCount: number;
    dynamicTableName: string;
    showFilter?: boolean;
    showExportFeature?: boolean;
    totalCount?: number;
    showTotalCount?: boolean;
    filterConfigs?: FilterConfig[];
};

export const DynamicTable = <T,>({
    data,
    columns,
    loading,
    handleFecthByPaginationAndFilter,
    dynamicTableName,
    totalPageCount,
    showFilter,
    showExportFeature,
    totalCount,
    showTotalCount,
    filterConfigs,
}: DynamicTableProps<T>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});
    const [showToolTip, setShowToolTip] = useState(false);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isRtl, setIsRtl] = useState(false);
    const [customPlaceholder, setCustomPlaceholder] = useState("Please Select");

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        manualPagination: true, // Enable manual pagination
        pageCount: totalPageCount,
    });

    const [filterColumn, setFilterColumn] = useState(null);
    const [filterInputValue, setFilterInputValue] = useState(null);
    // const [filterStatusColumnInput, setFilterStatusColumnInput] =
    //     useState(true);
    const [selectedFilter, setSelectedFilter] = useState<FilterConfig | null>(
        null
    );
    useEffect(() => {
        handleFecthByPaginationAndFilter(
            table.getState().pagination.pageIndex,
            table.getState().pagination.pageSize,
            filterColumn,
            filterInputValue
            // filterStatusColumnInput
        );
    }, [
        table.getState().pagination.pageIndex,
        table.getState().pagination.pageSize,
    ]);

    const [formLoading, setFormLoading] = useState(false);
    const handleFormSubmit = (e?: FormSubmitHandler) => {
        console.log("eeeeeeeeeeeee", e);
        if (!e) {
            setFormLoading(true);
            handleFecthByPaginationAndFilter(
                0,
                table.getState().pagination.pageSize,
                null,
                ""
            );
            setFormLoading(false);
            return;
        }
        e.preventDefault();
        setFormLoading(true);
        handleFecthByPaginationAndFilter(
            0,
            table.getState().pagination.pageSize,
            filterColumn,
            filterInputValue
        );
        setFormLoading(false);
    };

    const handleExport = () => {
        if (table.getIsSomeRowsSelected()) {
            setShowToolTip(false);
        } else {
            setShowToolTip(true);
            setTimeout(() => setShowToolTip(false), 70000);
        }
        const selectedRows = table
            .getSelectedRowModel()
            .rows.map((row) => row._valuesCache);
        const visibleColumns = table
            .getAllColumns()
            .filter((column) => column.getIsVisible());
        const visibleColumnData = visibleColumns
            .filter(
                (column) => column.id !== "select" && column.id !== "actions"
            )
            .map((column) => ({
                id: column.id,
                header: column.columnDef.header,
            }));
        // downloadCsv(`${dynamicTableName}.csv`, visibleColumnData, selectedRows);
    };

    const handleFilterTypeChange = async (filterType: any) => {
        console.log("filter valueeeeeeeeeeeeee", filterType);

        if (!filterType) {
            setSelectedFilter(null);
            setFilterColumn(null);
            setFilterInputValue(null);
            handleFormSubmit();
            return;
        }
        console.log(11111);

        const filter = filterConfigs?.find(
            (f) => f.value === filterType?.value
        );
        setSelectedFilter(filter || null);
        setFilterColumn(filterType);
        setFilterInputValue(null);
    };

    const handleInputChange = (value: any) => {
        setFilterInputValue(value);
    };

    const handleSelectChange = (value: any) => {
        setFilterInputValue(value);
    };

    return (
        <div className='m-4'>
            <div className='flex flex-col w-full'>
                <div className='grid grid-cols-3 w-full'>
                    <div>
                        <div className='grid grid-cols-3 w-full'>
                            {showTotalCount && (
                                <div className='bg-[#f9fafb] p-2 shadow-md border-l-2 border-t-2 border-r-2'>
                                    <p className='text-md font-medium text-gray-900'>
                                        Total: {totalCount}
                                    </p>
                                </div>
                            )}
                            <div className=''></div>
                            <div className=''></div>
                        </div>
                    </div>
                    <div>
                        {showFilter !== false ? (
                            <form
                                className='flex items-center gap-2'
                                onSubmit={(e) => handleFormSubmit(e)}
                            >
                                <div className='w-72'>
                                    <Select
                                        styles={{
                                            menuPortal: (base) => ({
                                                ...base,
                                                zIndex: 9999,
                                            }),
                                        }}
                                        menuPortalTarget={document.body}
                                        menuShouldScrollIntoView={false}
                                        menuPlacement={"bottom"}
                                        blurInputOnSelect={true}
                                        placeholder={`${customPlaceholder} Filter Type`}
                                        components={animatedComponents}
                                        // isLoading={loadingDropDown}
                                        isClearable={isClearable}
                                        isRtl={isRtl}
                                        isSearchable={isSearchable}
                                        options={filterConfigs}
                                        getOptionLabel={(option: any) =>
                                            option.label
                                        }
                                        getOptionValue={(option: any) => option}
                                        onChange={(data) => {
                                            handleFilterTypeChange(data);
                                        }}
                                    />
                                </div>
                                {selectedFilter &&
                                selectedFilter.type === "input" ? (
                                    <Input
                                        placeholder={`Enter ${selectedFilter.label}`}
                                        value={filterInputValue ?? undefined}
                                        onChange={(e) =>
                                            handleInputChange(e.target.value)
                                        }
                                        className='max-w-sm bg-white'
                                    />
                                ) : (
                                    <>
                                        {selectedFilter &&
                                        selectedFilter.type === "dropdown" ? (
                                            <div className='w-full'>
                                                <Select
                                                    styles={{
                                                        menuPortal: (base) => ({
                                                            ...base,
                                                            zIndex: 9999,
                                                        }),
                                                    }}
                                                    menuPortalTarget={
                                                        document.body
                                                    }
                                                    menuShouldScrollIntoView={
                                                        false
                                                    }
                                                    menuPlacement={"bottom"}
                                                    blurInputOnSelect={true}
                                                    placeholder={`${customPlaceholder} ${selectedFilter.label}`}
                                                    components={
                                                        animatedComponents
                                                    }
                                                    // isLoading={loadingDropDown}
                                                    isClearable={isClearable}
                                                    isRtl={isRtl}
                                                    isSearchable={isSearchable}
                                                    options={
                                                        selectedFilter.displayArray
                                                    }
                                                    getOptionLabel={(
                                                        option: any
                                                    ) => option.nameEng}
                                                    getOptionValue={(
                                                        option: any
                                                    ) => option}
                                                    onChange={(data) => {
                                                        handleSelectChange(
                                                            data
                                                        );
                                                    }}
                                                />
                                            </div>
                                        ) : null}
                                    </>
                                )}
                                <Button
                                    className='primary-button'
                                    disabled={formLoading}
                                >
                                    Search
                                </Button>
                            </form>
                        ) : null}
                    </div>
                    <div className='flex justify-end items-center'>
                        {showExportFeature !== false ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant='outline'
                                            className='ml-auto'
                                        >
                                            Columns{" "}
                                            <ChevronDown className='ml-2 h-4 w-4' />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end'>
                                        {table
                                            .getAllColumns()
                                            .filter((column) =>
                                                column.getCanHide()
                                            )
                                            .map((column) => {
                                                return (
                                                    <DropdownMenuCheckboxItem
                                                        key={column.id}
                                                        className='capitalize'
                                                        checked={column.getIsVisible()}
                                                        onCheckedChange={(
                                                            value
                                                        ) =>
                                                            column.toggleVisibility(
                                                                !!value
                                                            )
                                                        }
                                                    >
                                                        {column.id}
                                                    </DropdownMenuCheckboxItem>
                                                );
                                            })}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <TooltipProvider>
                                    <Tooltip>
                                        {/* <TooltipTrigger>Click</TooltipTrigger> */}
                                        {showToolTip && (
                                            <TooltipContent>
                                                <p>
                                                    Please select at least one
                                                    row for exporting.
                                                </p>
                                            </TooltipContent>
                                        )}
                                        {/* <TooltipTrigger> */}
                                        <Button
                                            variant='outline'
                                            className='ml-2 p-2'
                                            onClick={handleExport}
                                        >
                                            <Image
                                                src={microsoftExcel}
                                                alt='alt'
                                                width={25}
                                                height={25}
                                            />
                                        </Button>
                                        {/* </TooltipTrigger> */}
                                    </Tooltip>
                                </TooltipProvider>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className='shadow-md'>
                <div className='max-h-[412px] overflow-auto border rounded-md'>
                    <Table className='min-w-full bg-white'>
                        <TableHeader className='bg-gray-50 border-b-2 border-gray-300'>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className='py-2 text-left text-xs font-semibold uppercase text-gray-400'
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        style={{
                                            textAlign: "center",
                                            padding: "5%",
                                        }}
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className='h-24 text-center'
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div
                    className='flex items-center justify-between p-2 border'
                    style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                >
                    <div className='flex-1 text-sm text-muted-foreground'>
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                    <div className='flex items-center space-x-6 lg:space-x-8'>
                        <div className='flex items-center space-x-2'>
                            <p className='text-sm font-medium'>Rows per page</p>
                            <Dropdown
                                value={`${
                                    table.getState().pagination.pageSize
                                }`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger className='h-8 w-[70px]'>
                                    <SelectValue
                                        placeholder={
                                            table.getState().pagination.pageSize
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent side='top'>
                                    {[10, 20, 30, 40, 50, 100, 1000, 2000].map(
                                        (pageSize) => (
                                            <SelectItem
                                                key={pageSize}
                                                value={`${pageSize}`}
                                            >
                                                {pageSize}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Dropdown>
                        </div>
                        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
                            Page {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Button
                                variant='outline'
                                className='hidden h-8 w-8 p-0 lg:flex'
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className='sr-only'>
                                    Go to first page
                                </span>
                                <DoubleArrowLeftIcon className='h-4 w-4' />
                            </Button>
                            <Button
                                variant='outline'
                                className='h-8 w-8 p-0'
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className='sr-only'>
                                    Go to previous page
                                </span>
                                <ChevronLeftIcon className='h-4 w-4' />
                            </Button>
                            <Button
                                variant='outline'
                                className='h-8 w-8 p-0'
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className='sr-only'>Go to next page</span>
                                <ChevronRightIcon className='h-4 w-4' />
                            </Button>
                            <Button
                                variant='outline'
                                className='hidden h-8 w-8 p-0 lg:flex'
                                onClick={() =>
                                    table.setPageIndex(table.getPageCount() - 1)
                                }
                                disabled={!table.getCanNextPage()}
                            >
                                <span className='sr-only'>Go to last page</span>
                                <DoubleArrowRightIcon className='h-4 w-4' />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
