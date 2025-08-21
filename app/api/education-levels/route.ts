import { NextRequest, NextResponse } from 'next/server';

// Sample education levels data
const educationLevels = [
    { id: 'EDU001', name: 'No Formal Education', category: 'Basic', years: 0, description: 'No formal schooling completed' },
    { id: 'EDU002', name: 'Primary Education', category: 'Basic', years: 6, description: 'Elementary school completed' },
    { id: 'EDU003', name: 'Lower Secondary', category: 'Basic', years: 9, description: 'Middle school or junior high completed' },
    { id: 'EDU004', name: 'Upper Secondary', category: 'Secondary', years: 12, description: 'High school or equivalent completed' },
    { id: 'EDU005', name: 'Vocational Training', category: 'Technical', years: 12, description: 'Trade school or vocational program completed' },
    { id: 'EDU006', name: 'Associate Degree', category: 'Higher', years: 14, description: 'Two-year college degree' },
    { id: 'EDU007', name: 'Bachelor\'s Degree', category: 'Higher', years: 16, description: 'Four-year college degree' },
    { id: 'EDU008', name: 'Master\'s Degree', category: 'Graduate', years: 18, description: 'Postgraduate degree' },
    { id: 'EDU009', name: 'Doctorate (PhD)', category: 'Graduate', years: 20, description: 'Doctoral degree' },
    { id: 'EDU010', name: 'Professional Degree', category: 'Graduate', years: 19, description: 'Law, Medicine, etc.' },
    { id: 'EDU011', name: 'Certificate Program', category: 'Technical', years: 13, description: 'Short-term specialized training' },
    { id: 'EDU012', name: 'Diploma Program', category: 'Technical', years: 14, description: 'Specialized technical education' },
    { id: 'EDU013', name: 'Some College', category: 'Higher', years: 14, description: 'College coursework but no degree' },
    { id: 'EDU014', name: 'Post-Baccalaureate', category: 'Graduate', years: 17, description: 'Additional coursework after bachelor\'s' },
    { id: 'EDU015', name: 'Post-Master\'s', category: 'Graduate', years: 19, description: 'Additional coursework after master\'s' },
    { id: 'EDU016', name: 'High School Diploma', category: 'Secondary', years: 12, description: 'Standard high school completion' },
    { id: 'EDU017', name: 'GED', category: 'Secondary', years: 12, description: 'General Educational Development' },
    { id: 'EDU018', name: 'Home School', category: 'Alternative', years: 12, description: 'Home-based education' },
    { id: 'EDU019', name: 'International Baccalaureate', category: 'Secondary', years: 12, description: 'IB program completion' },
    { id: 'EDU020', name: 'Technical Certificate', category: 'Technical', years: 13, description: 'Technical skills certification' },
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Filter education levels based on search term
        let filteredEducationLevels = educationLevels;
        if (search) {
            filteredEducationLevels = educationLevels.filter(level =>
                level.name.toLowerCase().includes(search.toLowerCase()) ||
                level.category.toLowerCase().includes(search.toLowerCase()) ||
                level.description.toLowerCase().includes(search.toLowerCase()) ||
                level.id.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedEducationLevels = filteredEducationLevels.slice(offset, offset + limit);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 80));

        return NextResponse.json(paginatedEducationLevels);
    } catch (error) {
        console.error('Education Levels API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch education levels' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { search, limit = 20, offset = 0 } = body;

        // Filter education levels based on search term
        let filteredEducationLevels = educationLevels;
        if (search) {
            filteredEducationLevels = educationLevels.filter(level =>
                level.name.toLowerCase().includes(search.toLowerCase()) ||
                level.category.toLowerCase().includes(search.toLowerCase()) ||
                level.description.toLowerCase().includes(search.toLowerCase()) ||
                level.id.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const paginatedEducationLevels = filteredEducationLevels.slice(offset, offset + limit);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 80));

        return NextResponse.json(paginatedEducationLevels);
    } catch (error) {
        console.error('Education Levels API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch education levels' },
            { status: 500 }
        );
    }
}
