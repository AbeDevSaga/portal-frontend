// Mock API service for lookup fields demonstration
// This simulates real API calls that would be replaced with actual endpoints

export interface MockApiResponse {
    id: string | number;
    name: string;
    [key: string]: any;
}

// More specific interfaces for each data type
export interface Country extends MockApiResponse {
    code: string;
    region: string;
}

export interface Region extends MockApiResponse {
    country: string;
    population: string;
}

export interface Hospital extends MockApiResponse {
    city: string;
    type: string;
}

export interface Religion extends MockApiResponse {
    followers: string;
}

export interface Occupation extends MockApiResponse {
    category: string;
    avgIncome: string;
}

export interface EducationLevel extends MockApiResponse {
    years: number;
    category: string;
}

export interface MockApiRequest {
    search?: string;
    limit?: number;
    offset?: number;
    [key: string]: any;
}

// Simulate API delay
const simulateApiDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data for different lookup types with proper typing
const mockData = {
    countries: [
        { id: "ET", name: "Ethiopia", code: "ET", region: "Africa" },
        { id: "US", name: "United States", code: "US", region: "North America" },
        { id: "GB", name: "United Kingdom", code: "GB", region: "Europe" },
        { id: "CA", name: "Canada", code: "CA", region: "North America" },
        { id: "AU", name: "Australia", code: "AU", region: "Oceania" },
        { id: "DE", name: "Germany", code: "DE", region: "Europe" },
        { id: "FR", name: "France", code: "FR", region: "Europe" },
        { id: "IT", name: "Italy", code: "IT", region: "Europe" },
        { id: "JP", name: "Japan", code: "JP", region: "Asia" },
        { id: "CN", name: "China", code: "CN", region: "Asia" },
        { id: "IN", name: "India", code: "IN", region: "Asia" },
        { id: "BR", name: "Brazil", code: "BR", region: "South America" },
        { id: "MX", name: "Mexico", code: "MX", region: "North America" },
        { id: "ZA", name: "South Africa", code: "ZA", region: "Africa" },
        { id: "EG", name: "Egypt", code: "EG", region: "Africa" },
    ] as Country[],
    regions: [
        // Ethiopia regions
        { id: "1", name: "Addis Ababa", country: "ET", population: "3500000" },
        { id: "2", name: "Oromia", country: "ET", population: "35000000" },
        { id: "3", name: "Amhara", country: "ET", population: "30000000" },
        { id: "4", name: "Tigray", country: "ET", population: "7000000" },
        { id: "5", name: "Somali", country: "ET", population: "12000000" },
        { id: "6", name: "Afar", country: "ET", population: "2000000" },
        { id: "7", name: "Benishangul-Gumuz", country: "ET", population: "1200000" },
        { id: "8", name: "Gambella", country: "ET", population: "400000" },
        { id: "9", name: "Harari", country: "ET", population: "250000" },
        { id: "10", name: "SNNPR", country: "ET", population: "20000000" },
        // US regions
        { id: "11", name: "California", country: "US", population: "39500000" },
        { id: "12", name: "Texas", country: "US", population: "29000000" },
        { id: "13", name: "Florida", country: "US", population: "21500000" },
        { id: "14", name: "New York", country: "US", population: "19500000" },
        { id: "15", name: "Illinois", country: "US", population: "12700000" },
        // UK regions
        { id: "16", name: "England", country: "GB", population: "56000000" },
        { id: "17", name: "Scotland", country: "GB", population: "5400000" },
        { id: "18", name: "Wales", country: "GB", population: "3100000" },
        { id: "19", name: "Northern Ireland", country: "GB", population: "1900000" },
        // Canada regions
        { id: "20", name: "Ontario", country: "CA", population: "14700000" },
        { id: "21", name: "Quebec", country: "CA", population: "8500000" },
        { id: "22", name: "British Columbia", country: "CA", population: "5100000" },
        { id: "23", name: "Alberta", country: "CA", population: "4400000" },
    ] as Region[],
    hospitals: [
        { id: "1", name: "Tikur Anbessa Specialized Hospital", city: "Addis Ababa", type: "Specialized" },
        { id: "2", name: "Black Lion Hospital", city: "Addis Ababa", type: "General" },
        { id: "3", name: "St. Paul's Hospital", city: "Addis Ababa", type: "General" },
        { id: "4", name: "Bethel Teaching Hospital", city: "Addis Ababa", type: "Teaching" },
        { id: "5", name: "Ras Desta Hospital", city: "Addis Ababa", type: "General" },
        { id: "6", name: "Gandhi Memorial Hospital", city: "Addis Ababa", type: "Maternity" },
        { id: "7", name: "Yekatit 12 Hospital", city: "Addis Ababa", type: "General" },
        { id: "8", name: "Menelik II Hospital", city: "Addis Ababa", type: "General" },
        { id: "9", name: "Zewditu Hospital", city: "Addis Ababa", type: "General" },
        { id: "10", name: "Tirunesh Beijing Hospital", city: "Addis Ababa", type: "General" },
    ] as Hospital[],
    religions: [
        { id: "1", name: "Ethiopian Orthodox Tewahedo Church", followers: "45000000" },
        { id: "2", name: "Islam", followers: "35000000" },
        { id: "3", name: "Protestantism", followers: "20000000" },
        { id: "4", name: "Catholicism", followers: "800000" },
        { id: "5", name: "Traditional African Religions", followers: "2000000" },
        { id: "6", name: "Judaism", followers: "100000" },
        { id: "7", name: "Baha'i Faith", followers: "50000" },
        { id: "8", name: "Atheism/Agnosticism", followers: "1000000" },
    ] as Religion[],
    occupations: [
        { id: "1", name: "Farmer", category: "Agriculture", avgIncome: "Low" },
        { id: "2", name: "Teacher", category: "Education", avgIncome: "Medium" },
        { id: "3", name: "Doctor", category: "Healthcare", avgIncome: "High" },
        { id: "4", name: "Engineer", category: "Technology", avgIncome: "High" },
        { id: "5", name: "Business Owner", category: "Commerce", avgIncome: "Variable" },
        { id: "6", name: "Government Employee", category: "Public Service", avgIncome: "Medium" },
        { id: "7", name: "Student", category: "Education", avgIncome: "Low" },
        { id: "8", name: "Unemployed", category: "None", avgIncome: "None" },
        { id: "9", name: "Retired", category: "None", avgIncome: "Low" },
        { id: "10", name: "Other", category: "Various", avgIncome: "Variable" },
    ] as Occupation[],
    educationLevels: [
        { id: "1", name: "No Formal Education", years: 0, category: "Basic" },
        { id: "2", name: "Primary School (1-8)", years: 8, category: "Basic" },
        { id: "3", name: "Secondary School (9-12)", years: 12, category: "Secondary" },
        { id: "4", name: "Diploma", years: 14, category: "Higher" },
        { id: "5", name: "Bachelor's Degree", years: 16, category: "Higher" },
        { id: "6", name: "Master's Degree", years: 18, category: "Higher" },
        { id: "7", name: "PhD", years: 22, category: "Higher" },
        { id: "8", name: "Other", years: 0, category: "Various" },
    ] as EducationLevel[]
};

// Generic search function with proper typing
const searchData = <T extends MockApiResponse>(data: T[], searchTerm: string, searchKey: string = 'name'): T[] => {
    if (!searchTerm) return data;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return data.filter(item => 
        item[searchKey]?.toLowerCase().includes(lowerSearchTerm) ||
        item.name?.toLowerCase().includes(lowerSearchTerm)
    );
};

// Generic pagination function with proper typing
const paginateData = <T extends MockApiResponse>(data: T[], limit: number = 50, offset: number = 0): T[] => {
    return data.slice(offset, offset + limit);
};

// Mock API endpoints
export const mockApiService = {
    // Countries lookup
    async getCountries(request: MockApiRequest = {}): Promise<Country[]> {
        await simulateApiDelay();
        
        let filteredData = mockData.countries;
        
        if (request.search) {
            filteredData = searchData(filteredData, request.search, 'name');
        }
        
        const paginatedData = paginateData(filteredData, request.limit, request.offset);
        
        // Simulate network error occasionally (1% chance)
        if (Math.random() < 0.01) {
            throw new Error('Network error occurred');
        }
        
        return paginatedData;
    },

    // Regions lookup
    async getRegions(request: MockApiRequest = {}): Promise<Region[]> {
        await simulateApiDelay(200);
        
        let filteredData = mockData.regions;
        
        if (request.search) {
            filteredData = searchData(filteredData, request.search, 'name');
        }
        
        if (request.country) {
            filteredData = filteredData.filter(region => region.country === request.country);
        }
        
        const paginatedData = paginateData(filteredData, request.limit, request.offset);
        
        return paginatedData;
    },

    // Hospitals lookup
    async getHospitals(request: MockApiRequest = {}): Promise<Hospital[]> {
        await simulateApiDelay(400);
        
        let filteredData = mockData.hospitals;
        
        if (request.search) {
            filteredData = searchData(filteredData, request.search, 'name');
        }
        
        if (request.city) {
            filteredData = filteredData.filter(hospital => hospital.city === request.city);
        }
        
        if (request.type) {
            filteredData = filteredData.filter(hospital => hospital.type === request.type);
        }
        
        const paginatedData = paginateData(filteredData, request.limit, request.offset);
        
        return paginatedData;
    },

    // Religions lookup
    async getReligions(request: MockApiRequest = {}): Promise<Religion[]> {
        await simulateApiDelay(150);
        
        let filteredData = mockData.religions;
        
        if (request.search) {
            filteredData = searchData(filteredData, request.search, 'name');
        }
        
        const paginatedData = paginateData(filteredData, request.limit, request.offset);
        
        return paginatedData;
    },

    // Occupations lookup
    async getOccupations(request: MockApiRequest = {}): Promise<Occupation[]> {
        await simulateApiDelay(250);
        
        let filteredData = mockData.occupations;
        
        if (request.search) {
            filteredData = searchData(filteredData, request.search, 'name');
        }
        
        if (request.category) {
            filteredData = filteredData.filter(occupation => occupation.category === request.category);
        }
        
        const paginatedData = paginateData(filteredData, request.limit, request.offset);
        
        return paginatedData;
    },

    // Education levels lookup
    async getEducationLevels(request: MockApiRequest = {}): Promise<EducationLevel[]> {
        await simulateApiDelay(100);
        
        let filteredData = mockData.educationLevels;
        
        if (request.search) {
            filteredData = searchData(filteredData, request.search, 'name');
        }
        
        if (request.category) {
            filteredData = filteredData.filter(education => education.category === request.category);
        }
        
        const paginatedData = paginateData(filteredData, request.limit, request.offset);
        
        return paginatedData;
    },

    // Generic lookup function that routes to appropriate endpoint
    async lookup(endpoint: string, request: MockApiRequest = {}): Promise<MockApiResponse[]> {
        // Extract base endpoint name from full path (e.g., '/regions/list' -> 'regions')
        const baseEndpoint = endpoint.replace(/^\/+/, '').split('/')[0];
        
        switch (baseEndpoint) {
            case 'countries':
                return this.getCountries(request);
            case 'regions':
                return this.getRegions(request);
            case 'hospitals':
                return this.getHospitals(request);
            case 'religions':
                return this.getReligions(request);
            case 'occupations':
                return this.getOccupations(request);
            case 'education-levels':
            case 'educationLevels':
                return this.getEducationLevels(request);
            default:
                throw new Error(`Unknown endpoint: ${endpoint}`);
        }
    }
};

// Export individual functions for direct use
export const {
    getCountries,
    getRegions,
    getHospitals,
    getReligions,
    getOccupations,
    getEducationLevels,
    lookup
} = mockApiService;
