import { NextResponse } from "next/server";
import { mockDataTable } from "@/utils/json/sample-marriage-table";

const transformItem = (item: any) => {
    const transformed: any = {};
    for (const key in item) {
        const value = item[key];
        if (value && typeof value === "object" && !Array.isArray(value)) {
            transformed[key] = value.label ?? null;
        } else {
            transformed[key] = value;
        }
    }
    return transformed;
};

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    const marriage = mockDataTable.find((m) => m.id === id);

    if (!marriage) {
        return NextResponse.json(
            {
                response: [],
                metadata: { total: 0 },
                error: "Marriage not found",
            },
            { status: 404 }
        );
    }

    const transformedMarriage = transformItem(marriage);

    return NextResponse.json({
        response: [transformedMarriage],
        metadata: { total: 1 },
    });
}
