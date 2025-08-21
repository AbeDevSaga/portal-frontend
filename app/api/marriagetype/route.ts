import { NextRequest, NextResponse } from "next/server";

// Sample marriage type data
const marriageType = [
    { id: 1, name: "National", code: "NA", value: "NA" },
    { id: 2, name: "Regional", code: "RE", value: "RE" },
    { id: 3, name: "Traditional", code: "TR", value: "TR" },
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = parseInt(searchParams.get("offset") || "0");

        // Filter countries based on search term
        let filteredMarriageType = marriageType;
        if (search) {
            filteredMarriageType = marriageType.filter(
                (marriage) =>
                    marriage.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    marriage.code.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedMarriageType = filteredMarriageType.slice(
            offset,
            offset + limit
        );

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 100));

        return NextResponse.json(paginatedMarriageType);
    } catch (error) {
        console.error("Countries API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch countries" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { search, limit = 20, offset = 0 } = body;

        // Filter countries based on search term
        let filteredMarriageType = marriageType;
        if (search) {
            filteredMarriageType = marriageType.filter(
                (marriage) =>
                    marriage.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    marriage.code.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedMarriageType = filteredMarriageType.slice(
            offset,
            offset + limit
        );

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 100));

        return NextResponse.json(paginatedMarriageType);
    } catch (error) {
        console.error("MarriageType API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch MarriageType" },
            { status: 500 }
        );
    }
}
