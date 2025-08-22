import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
const statusColorMapping = {
    completed: "text-green-500 bg-green-500/30",
    rejected: "text-red-500 bg-red-500/30",
    inprogress: "text-yellow-500 bg-yellow-500/30",
};
export const Marriagecolumns: ColumnDef<unknown>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "marriageType",
        header: "Marriage Type",
    },
    {
        accessorKey: "dateOfMarriage",
        header: "Date Of Marriage",
    },
    {
        accessorKey: "husbandFirstName",
        header: "Husband First Name",
    },
    {
        accessorKey: "husbandNationalId",
        header: "Husband National Id",
    },
    {
        accessorKey: "husbandNationality",
        header: "Husband Nationality",
    },
    {
        accessorKey: "wifeFirstName",
        header: "Wife First Name",
    },
    {
        accessorKey: "wifeNationalId",
        header: "Wife National Id",
    },
    {
        accessorKey: "wifeNationality",
        header: "Wife Nationality",
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }: any) => {
            const recordId = row?.original?.id;
            return (
                <Link
                    className=''
                    href={`/users/features/marriage-registration/detail/${recordId}`}
                >
                    <Eye />
                </Link>
            );
        },
    },
];
