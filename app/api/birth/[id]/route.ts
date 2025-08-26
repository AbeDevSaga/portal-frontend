import { NextResponse } from "next/server";
import { mockDataTable } from "@/utils/json/sample-birth-table";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const birth = mockDataTable.find((b) => b.id === id);

    if (!birth) {
        return NextResponse.json(
            {
                response: [],
                metadata: { total: 0 },
                error: "Birth record not found",
            },
            { status: 404 }
        );
    }

    return NextResponse.json({
        response: [birth],
        metadata: { total: 1 },
    });
}
