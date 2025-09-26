import { EventTypes } from "@/common/utils/enums/enum";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import RequestTypeTag from "./RequestTypeTag";
const statusColorMapping = {
    completed: "text-green-500 bg-green-500/30",
    rejected: "text-red-500 bg-red-500/30",
    inprogress: "text-yellow-500 bg-yellow-500/30",
};
export const TableColumns: ColumnDef<unknown>[] = [
    {
        accessorKey: "requester_name",
        header: "Applied For",
    },
    {
        accessorKey: "eventType",
        header: "Request Type",
        cell: ({ row }: any) => {
            const eventType = row.original?.eventType;
            return <RequestTypeTag requestType={eventType} />;
        },
    },
    {
        accessorKey: "requestDate",
        accessorFn: (row: any) => row.localizatoin[0]?.submissionDate || "N/A",
        header: "Request Date",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }: any) => {
            const recordId = row.original?.registrationFormNumber || "N/A";
            const theEventType = row.original?.eventType;
            let linkPage = "";
            if(theEventType === EventTypes.BIRTH) {
                linkPage = `/civil-registration/birth/detail/${recordId}`;
            } else if (theEventType === EventTypes.MARRIAGE) {
                linkPage = `/civil-registration/marriage/detail/${recordId}`;
            }
            console.log("theEventType", theEventType);

            return (
                <Link
                    className=''
                    href={`${linkPage}`}
                >
                    <Eye />
                </Link>
            );
        },
    },
];
