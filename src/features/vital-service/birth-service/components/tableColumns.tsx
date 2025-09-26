import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
const statusColorMapping = {
    completed: "text-green-500 bg-green-500/30",
    rejected: "text-red-500 bg-red-500/30",
    inprogress: "text-yellow-500 bg-yellow-500/30",
};
export const Birthcolumns: ColumnDef<unknown>[] = [
    {
        accessorKey: "id",
        header: "Applied For",
    },
    {
        accessorKey: "requestType",
        header: "Request Type",
    },
    {
        accessorKey: "requestDate",
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
            const recordId = row?.original?.id;
            return (
                <Link
                    className=''
                    href={`/users/features/birth-registration/detail/${recordId}`}
                >
                    <Eye />
                </Link>
            );
        },
    },
];
