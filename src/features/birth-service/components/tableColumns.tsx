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
        header: "ID",
    },
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "fatherName",
        header: "Father Name",
    },
    {
        accessorKey: "grandFatherName",
        header: "Grand Father Name",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "husbandNationality",
        header: "Husband Nationality",
    },
    {
        accessorKey: "isBornInHealthCenter",
        header: "Health Center Birth",
    },
    {
        accessorKey: "isNewBorn",
        header: "New Born",
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
