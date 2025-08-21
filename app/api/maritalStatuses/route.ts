import { NextRequest, NextResponse } from 'next/server';

// Sample countries data
const maritalStatuses = [
    { id: 1, name: 'Single', code: 'SIN'},
    { id: 2, name: 'Married', code: 'MAR'},
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Filter countries based on search term
        let filteredCountries = maritalStatuses;
        if (search) {
            filteredCountries = maritalStatuses.filter(country =>
                country.name.toLowerCase().includes(search.toLowerCase()) ||
                country.code.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedCountries = filteredCountries.slice(offset, offset + limit);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));

        return NextResponse.json(paginatedCountries);
    } catch (error) {
        console.error('Countries API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch countries' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { search, limit = 20, offset = 0 } = body;

        // Filter countries based on search term
        let filteredCountries = maritalStatuses;
        if (search) {
            filteredCountries = maritalStatuses.filter(country =>
                country.name.toLowerCase().includes(search.toLowerCase()) ||
                country.code.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedCountries = filteredCountries.slice(offset, offset + limit);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));

        return NextResponse.json(paginatedCountries);
    } catch (error) {
        console.error('Countries API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch countries' },
            { status: 500 }
        );
    }
}
