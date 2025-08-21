import { NextRequest, NextResponse } from 'next/server';

// Sample religions data
const religions = [
    { id: 'REL001', name: 'Christianity', category: 'Abrahamic', followers: '2.4 billion' },
    { id: 'REL002', name: 'Islam', category: 'Abrahamic', followers: '1.9 billion' },
    { id: 'REL003', name: 'Hinduism', category: 'Indian', followers: '1.2 billion' },
    { id: 'REL004', name: 'Buddhism', category: 'Indian', followers: '535 million' },
    { id: 'REL005', name: 'Judaism', category: 'Abrahamic', followers: '14 million' },
    { id: 'REL006', name: 'Sikhism', category: 'Indian', followers: '30 million' },
    { id: 'REL007', name: 'Baha\'i Faith', category: 'Abrahamic', followers: '8 million' },
    { id: 'REL008', name: 'Jainism', category: 'Indian', followers: '4.5 million' },
    { id: 'REL009', name: 'Shinto', category: 'East Asian', followers: '4 million' },
    { id: 'REL010', name: 'Taoism', category: 'East Asian', followers: '12 million' },
    { id: 'REL011', name: 'Confucianism', category: 'East Asian', followers: '6 million' },
    { id: 'REL012', name: 'Zoroastrianism', category: 'Iranian', followers: '190,000' },
    { id: 'REL013', name: 'Atheism', category: 'Non-religious', followers: '1.2 billion' },
    { id: 'REL014', name: 'Agnosticism', category: 'Non-religious', followers: '700 million' },
    { id: 'REL015', name: 'Traditional African Religions', category: 'African', followers: '100 million' },
    { id: 'REL016', name: 'Native American Religions', category: 'Indigenous', followers: '9 million' },
    { id: 'REL017', name: 'Paganism', category: 'Neopagan', followers: '1 million' },
    { id: 'REL018', name: 'Wicca', category: 'Neopagan', followers: '1.5 million' },
    { id: 'REL019', name: 'Unitarian Universalism', category: 'Liberal', followers: '800,000' },
    { id: 'REL020', name: 'Humanism', category: 'Secular', followers: '4 million' },
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Filter religions based on search term
        let filteredReligions = religions;
        if (search) {
            filteredReligions = religions.filter(religion =>
                religion.name.toLowerCase().includes(search.toLowerCase()) ||
                religion.category.toLowerCase().includes(search.toLowerCase()) ||
                religion.id.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedReligions = filteredReligions.slice(offset, offset + limit);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));

        return NextResponse.json(paginatedReligions);
    } catch (error) {
        console.error('Religions API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch religions' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { search, limit = 20, offset = 0 } = body;

        // Filter religions based on search term
        let filteredReligions = religions;
        if (search) {
            filteredReligions = religions.filter(religion =>
                religion.name.toLowerCase().includes(search.toLowerCase()) ||
                religion.category.toLowerCase().includes(search.toLowerCase()) ||
                religion.id.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedReligions = filteredReligions.slice(offset, offset + limit);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));

        return NextResponse.json(paginatedReligions);
    } catch (error) {
        console.error('Religions API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch religions' },
            { status: 500 }
        );
    }
}
