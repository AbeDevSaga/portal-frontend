import { NextRequest, NextResponse } from 'next/server';

// Sample hcOwnerships data
const hcOwnerships = [
    { id: 'OCC001', name: 'Government'},
    { id: 'OCC002', name: 'Private'},
    { id: 'OCC003', name: 'Non-private'},
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Filter hcOwnerships based on search term
        let filteredHcOwnerships = hcOwnerships;
        if (search) {
            filteredHcOwnerships = hcOwnerships.filter(hcOwnership =>
                hcOwnership.name.toLowerCase().includes(search.toLowerCase()) ||
                hcOwnership.id.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedHcOwnerships = filteredHcOwnerships.slice(offset, offset + limit);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 120));

        return NextResponse.json(paginatedHcOwnerships);
    } catch (error) {
        console.error('HcOwnerships API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hcOwnerships' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { search, limit = 20, offset = 0 } = body;

        // Filter hcOwnerships based on search term
        let filteredHcOwnerships = hcOwnerships;
        if (search) {
            filteredHcOwnerships = hcOwnerships.filter(hcOwnership =>
                hcOwnership.name.toLowerCase().includes(search.toLowerCase()) ||
                hcOwnership.id.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedHcOwnerships = filteredHcOwnerships.slice(offset, offset + limit);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 120));

        return NextResponse.json(paginatedHcOwnerships);
    } catch (error) {
        console.error('HcOwnerships API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hcOwnerships' },
            { status: 500 }
        );
    }
}
