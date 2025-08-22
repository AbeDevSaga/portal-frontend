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
        accessorKey: "fullName",
        header: "Full Name",
    },
    {
        accessorKey: "mothersName",
        header: "Mothers Name",
    },
    {
        accessorKey: "fathersName",
        header: "Fathers Name",
    },
    {
        accessorKey: "sex",
        header: "Sex",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = String(getValue()) || "";
            const key = status.toLowerCase();
            const classes =
                statusColorMapping[key as keyof typeof statusColorMapping] ??
                "";

            const labelText = status.charAt(0).toUpperCase() + status.slice(1);

            return (
                <div className='rounded-full w-[120px] overflow-clip'>
                    <p
                        className={`${classes} font-medium whitespace-nowrap py-1 w-full text-center`}
                    >
                        {labelText}
                    </p>
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }: any) => {
            const recordId = row?.original?.id;
            return (
                <Link className='' href={`/home/birthdetails/${recordId}`}>
                    <Eye />
                </Link>
            );
        },
    },
];
