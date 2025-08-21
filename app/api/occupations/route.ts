import { NextRequest, NextResponse } from 'next/server';

// Sample occupations data
const occupations = [
    { id: 'OCC001', name: 'Software Engineer', category: 'Technology', level: 'Professional' },
    { id: 'OCC002', name: 'Doctor', category: 'Healthcare', level: 'Professional' },
    { id: 'OCC003', name: 'Teacher', category: 'Education', level: 'Professional' },
    { id: 'OCC004', name: 'Nurse', category: 'Healthcare', level: 'Professional' },
    { id: 'OCC005', name: 'Accountant', category: 'Finance', level: 'Professional' },
    { id: 'OCC006', name: 'Lawyer', category: 'Legal', level: 'Professional' },
    { id: 'OCC007', name: 'Engineer', category: 'Engineering', level: 'Professional' },
    { id: 'OCC008', name: 'Sales Representative', category: 'Sales', level: 'Skilled' },
    { id: 'OCC009', name: 'Marketing Manager', category: 'Marketing', level: 'Management' },
    { id: 'OCC010', name: 'Project Manager', category: 'Management', level: 'Management' },
    { id: 'OCC011', name: 'Data Analyst', category: 'Technology', level: 'Professional' },
    { id: 'OCC012', name: 'Graphic Designer', category: 'Creative', level: 'Professional' },
    { id: 'OCC013', name: 'Chef', category: 'Food Service', level: 'Skilled' },
    { id: 'OCC014', name: 'Electrician', category: 'Skilled Trades', level: 'Skilled' },
    { id: 'OCC015', name: 'Plumber', category: 'Skilled Trades', level: 'Skilled' },
    { id: 'OCC016', name: 'Carpenter', category: 'Skilled Trades', level: 'Skilled' },
    { id: 'OCC017', name: 'Driver', category: 'Transportation', level: 'Semi-skilled' },
    { id: 'OCC018', name: 'Cashier', category: 'Retail', level: 'Semi-skilled' },
    { id: 'OCC019', name: 'Waiter/Waitress', category: 'Food Service', level: 'Semi-skilled' },
    { id: 'OCC020', name: 'Cleaner', category: 'Service', level: 'Unskilled' },
    { id: 'OCC021', name: 'Security Guard', category: 'Security', level: 'Semi-skilled' },
    { id: 'OCC022', name: 'Receptionist', category: 'Administrative', level: 'Semi-skilled' },
    { id: 'OCC023', name: 'Administrative Assistant', category: 'Administrative', level: 'Semi-skilled' },
    { id: 'OCC024', name: 'Customer Service Representative', category: 'Service', level: 'Semi-skilled' },
    { id: 'OCC025', name: 'Research Scientist', category: 'Science', level: 'Professional' },
    { id: 'OCC026', name: 'Architect', category: 'Design', level: 'Professional' },
    { id: 'OCC027', name: 'Dentist', category: 'Healthcare', level: 'Professional' },
    { id: 'OCC028', name: 'Pharmacist', category: 'Healthcare', level: 'Professional' },
    { id: 'OCC029', name: 'Veterinarian', category: 'Healthcare', level: 'Professional' },
    { id: 'OCC030', name: 'Journalist', category: 'Media', level: 'Professional' },
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Filter occupations based on search term
        let filteredOccupations = occupations;
        if (search) {
            filteredOccupations = occupations.filter(occupation =>
                occupation.name.toLowerCase().includes(search.toLowerCase()) ||
                occupation.category.toLowerCase().includes(search.toLowerCase()) ||
                occupation.level.toLowerCase().includes(search.toLowerCase()) ||
                occupation.id.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedOccupations = filteredOccupations.slice(offset, offset + limit);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 120));

        return NextResponse.json(paginatedOccupations);
    } catch (error) {
        console.error('Occupations API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch occupations' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { search, limit = 20, offset = 0 } = body;

        // Filter occupations based on search term
        let filteredOccupations = occupations;
        if (search) {
            filteredOccupations = occupations.filter(occupation =>
                occupation.name.toLowerCase().includes(search.toLowerCase()) ||
                occupation.category.toLowerCase().includes(search.toLowerCase()) ||
                occupation.level.toLowerCase().includes(search.toLowerCase()) ||
                occupation.id.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedOccupations = filteredOccupations.slice(offset, offset + limit);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 120));

        return NextResponse.json(paginatedOccupations);
    } catch (error) {
        console.error('Occupations API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch occupations' },
            { status: 500 }
        );
    }
}
