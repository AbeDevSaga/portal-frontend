import { NextResponse } from "next/server";
import { mockDataTable } from "@/utils/json/sample-birth-table";

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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = parseInt(searchParams.get("perPage") || "10", 10);

    const start = (page - 1) * perPage;
    const end = start + perPage;

    const paginatedData = mockDataTable.slice(start, end);

    const transformedData = paginatedData.map(transformItem);

    return NextResponse.json({
        response: transformedData,
        metadata: {
            total: mockDataTable.length,
            page,
            perPage,
            totalPages: Math.ceil(mockDataTable.length / perPage),
        },
    });
}
