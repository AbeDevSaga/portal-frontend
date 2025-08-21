import { NextRequest, NextResponse } from 'next/server';

// Sample regions data with country dependency
const regions = [
    // Ethiopia regions
    { id: 'ET-AA', name: 'Addis Ababa', country: 'ET', type: 'City' },
    { id: 'ET-OR', name: 'Oromia', country: 'ET', type: 'Region' },
    { id: 'ET-AM', name: 'Amhara', country: 'ET', type: 'Region' },
    { id: 'ET-TI', name: 'Tigray', country: 'ET', type: 'Region' },
    { id: 'ET-SN', name: 'Southern Nations', country: 'ET', type: 'Region' },
    { id: 'ET-AF', name: 'Afar', country: 'ET', type: 'Region' },
    { id: 'ET-SO', name: 'Somali', country: 'ET', type: 'Region' },
    { id: 'ET-BE', name: 'Benishangul-Gumuz', country: 'ET', type: 'Region' },
    { id: 'ET-GA', name: 'Gambella', country: 'ET', type: 'Region' },
    { id: 'ET-HA', name: 'Harari', country: 'ET', type: 'Region' },
    { id: 'ET-DD', name: 'Dire Dawa', country: 'ET', type: 'City' },
    
    // US states
    { id: 'US-CA', name: 'California', country: 'US', type: 'State' },
    { id: 'US-TX', name: 'Texas', country: 'US', type: 'State' },
    { id: 'US-NY', name: 'New York', country: 'US', type: 'State' },
    { id: 'US-FL', name: 'Florida', country: 'US', type: 'State' },
    { id: 'US-IL', name: 'Illinois', country: 'US', type: 'State' },
    { id: 'US-PA', name: 'Pennsylvania', country: 'US', type: 'State' },
    { id: 'US-OH', name: 'Ohio', country: 'US', type: 'State' },
    { id: 'US-GA', name: 'Georgia', country: 'US', type: 'State' },
    { id: 'US-NC', name: 'North Carolina', country: 'US', type: 'State' },
    { id: 'US-MI', name: 'Michigan', country: 'US', type: 'State' },
    
    // UK regions
    { id: 'GB-ENG', name: 'England', country: 'GB', type: 'Country' },
    { id: 'GB-SCT', name: 'Scotland', country: 'GB', type: 'Country' },
    { id: 'GB-WLS', name: 'Wales', country: 'GB', type: 'Country' },
    { id: 'GB-NIR', name: 'Northern Ireland', country: 'GB', type: 'Country' },
    
    // Canadian provinces
    { id: 'CA-ON', name: 'Ontario', country: 'CA', type: 'Province' },
    { id: 'CA-QC', name: 'Quebec', country: 'CA', type: 'Province' },
    { id: 'CA-BC', name: 'British Columbia', country: 'CA', type: 'Province' },
    { id: 'CA-AB', name: 'Alberta', country: 'CA', type: 'Province' },
    { id: 'CA-NS', name: 'Nova Scotia', country: 'CA', type: 'Province' },
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const country = searchParams.get('country') || '';
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Filter regions based on search term and country
        let filteredRegions = regions;
        
        if (country) {
            filteredRegions = filteredRegions.filter(region => region.country === country);
        }
        
        if (search) {
            filteredRegions = filteredRegions.filter(region =>
                region.name.toLowerCase().includes(search.toLowerCase()) ||
                region.id.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedRegions = filteredRegions.slice(offset, offset + limit);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));

        return NextResponse.json(paginatedRegions);
    } catch (error) {
        console.error('Regions API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch regions' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { search, country, limit = 20, offset = 0 } = body;

        // Filter regions based on search term and country
        let filteredRegions = regions;
        
        if (country) {
            filteredRegions = filteredRegions.filter(region => region.country === country);
        }
        
        if (search) {
            filteredRegions = filteredRegions.filter(region =>
                region.name.toLowerCase().includes(search.toLowerCase()) ||
                region.id.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedRegions = filteredRegions.slice(offset, offset + limit);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));

        return NextResponse.json(paginatedRegions);
    } catch (error) {
        console.error('Regions API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch regions' },
            { status: 500 }
        );
    }
}
