import { NextRequest, NextResponse } from 'next/server';

// Sample countries data
const countries = [
    { id: 1, name: 'Ethiopia', code: 'ET', continent: 'Africa' },
    { id: 2, name: 'United States', code: 'US', continent: 'North America' },
    { id: 3, name: 'United Kingdom', code: 'GB', continent: 'Europe' },
    { id: 4, name: 'Canada', code: 'CA', continent: 'North America' },
    { id: 5, name: 'Australia', code: 'AU', continent: 'Oceania' },
    { id: 6, name: 'Germany', code: 'DE', continent: 'Europe' },
    { id: 7, name: 'France', code: 'FR', continent: 'Europe' },
    { id: 8, name: 'Italy', code: 'IT', continent: 'Europe' },
    { id: 9, name: 'Japan', code: 'JP', continent: 'Asia' },
    { id: 10, name: 'China', code: 'CN', continent: 'Asia' },
    { id: 11, name: 'India', code: 'IN', continent: 'Asia' },
    { id: 12, name: 'Brazil', code: 'BR', continent: 'South America' },
    { id: 13, name: 'Mexico', code: 'MX', continent: 'North America' },
    { id: 14, name: 'South Africa', code: 'ZA', continent: 'Africa' },
    { id: 15, name: 'Egypt', code: 'EG', continent: 'Africa' },
    { id: 16, name: 'Nigeria', code: 'NG', continent: 'Africa' },
    { id: 17, name: 'Kenya', code: 'KE', continent: 'Africa' },
    { id: 18, name: 'Uganda', code: 'UG', continent: 'Africa' },
    { id: 19, name: 'Tanzania', code: 'TZ', continent: 'Africa' },
    { id: 20, name: 'Rwanda', code: 'RW', continent: 'Africa' },
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Filter countries based on search term
        let filteredCountries = countries;
        if (search) {
            filteredCountries = countries.filter(country =>
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
        let filteredCountries = countries;
        if (search) {
            filteredCountries = countries.filter(country =>
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
