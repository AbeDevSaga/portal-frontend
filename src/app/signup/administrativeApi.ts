// Administrative Structures API Service
export interface LocalizedContent {
  am: {
    name: string;
    description: string;
  };
  en: {
    name: string;
    description: string;
  };
}

export interface AdministrativeStructure {
  id: string;
  code: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
  localizedContent: LocalizedContent;
  level: "CITY" | "SUBCITY" | "WOREDA";
  parentId: string | null;
  administrativeId: string;
  displayOrder: number;
  location: any; // null in the examples
}

export interface AdministrativeResponse {
  content: AdministrativeStructure[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: any[];
    offset: number;
    paged: boolean;
  };
  size: number;
  number: number;
  sort: any[];
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  totalElements: number;
  totalPages: number;
}

export interface DropdownOption {
  value: string; // ID
  label: string; // Name in current language
}


// Get current language (you might want to get this from context or props)
const getCurrentLanguage = (): 'en' | 'am' => {
  // For now, defaulting to English. You can modify this based on your app's language logic
  return 'en';
};

export const administrativeApi = {
  // Get all cities
  async getCities(): Promise<DropdownOption[]> {
    try {
      const response = await fetch(
        `https://crrsa-api.risertechservices.com/api/v1/reference-data/administrative-structures?level=CITY&page=0&size=1000`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch cities: ${response.statusText}`);
      }
      
      const data: AdministrativeResponse = await response.json();
      const currentLang = getCurrentLanguage();
      
      return data.content
        .filter(item => item.isActive)
        .map(item => ({
          value: item.id,
          label: item.localizedContent[currentLang].name
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    } catch (error) {
      console.error("Error fetching cities:", error);
      throw error;
    }
  },

  // Get subcities for a specific city
  async getSubcities(cityId: string): Promise<DropdownOption[]> {
    try {
      const response = await fetch(
        `https://crrsa-api.risertechservices.com/api/v1/reference-data/administrative-structures?level=SUBCITY&parentId=${cityId}&page=0&size=1000`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch subcities: ${response.statusText}`);
      }
      
      const data: AdministrativeResponse = await response.json();
      const currentLang = getCurrentLanguage();
      
      return data.content
        .filter(item => item.isActive)
        .map(item => ({
          value: item.id,
          label: item.localizedContent[currentLang].name
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    } catch (error) {
      console.error("Error fetching subcities:", error);
      throw error;
    }
  },

  // Get woredas for a specific subcity
  async getWoredas(subcityId: string): Promise<DropdownOption[]> {
    try {
      const response = await fetch(
        `https://crrsa-api.risertechservices.com/api/v1/reference-data/administrative-structures?level=WOREDA&parentId=${subcityId}&page=0&size=1000`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch woredas: ${response.statusText}`);
      }
      
      const data: AdministrativeResponse = await response.json();
      const currentLang = getCurrentLanguage();
      
      return data.content
        .filter(item => item.isActive)
        .map(item => ({
          value: item.id,
          label: item.localizedContent[currentLang].name
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    } catch (error) {
      console.error("Error fetching woredas:", error);
      throw error;
    }
  }
}; 