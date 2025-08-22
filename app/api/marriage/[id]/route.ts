import { NextResponse } from "next/server";
import { mockDataTable } from "@/utils/json/sample-marriage-table";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

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

    return NextResponse.json({
        response: [marriage],
        metadata: { total: 1 },
    });
}
