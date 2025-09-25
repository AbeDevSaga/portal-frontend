export interface SubcityData {
  subcity: string;
  woredasCount: number;
  woredas: string[];
}

export const AASubcityWoredaData: SubcityData[] = [
  {
    "subcity": "Addis Ketema",
    "woredasCount": 12,
    "woredas": [
      "Woreda 01","Woreda 02","Woreda 03","Woreda 04","Woreda 05","Woreda 06","Woreda 07","Woreda 08","Woreda 09","Woreda 10","Woreda 11","Woreda 12","Woreda 13","Woreda 14"
    ]
  },
  {
    "subcity": "Akaky Kaliti",
    "woredasCount": 9,
    "woredas": [
      "Woreda 01","Woreda 02","Woreda 03","Woreda 04","Woreda 05","Woreda 06","Woreda 07"
    ]
  },
  {
    "subcity": "Arada",
    "woredasCount": 10,
    "woredas": [
      "Woreda 01","Woreda 02","Woreda 03","Woreda 04","Woreda 05","Woreda 06","Woreda 07","Woreda 08","Woreda 09","Woreda 10"
    ]
  },
  {
    "subcity": "Bole",
    "woredasCount": 14,
    "woredas": [
      "Woreda 01","Woreda 02","Woreda 03","Woreda 04","Woreda 05","Woreda 06","Woreda 07","Woreda 08","Woreda 09","Woreda 10","Woreda 11","Woreda 12","Woreda 13","Woreda 14"
    ]
  },
  {
    "subcity": "Gullele",
      "woredasCount": 10,
    "woredas": [
      "Woreda 01","Woreda 02","Woreda 03","Woreda 04","Woreda 05","Woreda 06","Woreda 07","Woreda 08","Woreda 09","Woreda 10"
    ]
  },
  {
    "subcity": "Kirkos",
    "woredasCount": 13,
    "woredas": [
      "Woreda 01","Woreda 02","Woreda 03","Woreda 04","Woreda 05","Woreda 06","Woreda 07","Woreda 08","Woreda 09","Woreda 10","Woreda 11","Woreda 12","Woreda 13"
    ]
  },
  {
    "subcity": "Kolfe Keranio",
    "woredasCount": 11,
    "woredas": [
      "Woreda 01","Woreda 02","Woreda 03","Woreda 04","Woreda 05","Woreda 06","Woreda 07","Woreda 08","Woreda 09","Woreda 10","Woreda 11"
    ]
  },
  {
    "subcity": "Lideta",
    "woredasCount": 11,
    "woredas": [
      "Woreda 01","Woreda 02","Woreda 03","Woreda 04","Woreda 05","Woreda 06","Woreda 07","Woreda 08","Woreda 09","Woreda 10","Woreda 11"
    ]
  },
  {
    "subcity": "Nifas Silk-Lafto",
    "woredasCount": 15,
    "woredas": [
      "Woreda 01","Woreda 02","Woreda 03","Woreda 04","Woreda 05","Woreda 06","Woreda 07","Woreda 08","Woreda 09","Woreda 10","Woreda 11","Woreda 12","Woreda 13","Woreda 14","Woreda 15"
    ]
  },
  {
    "subcity": "Yeka",
    "woredasCount": 12,
    "woredas": [
      "Woreda 01","Woreda 02","Woreda 03","Woreda 04","Woreda 05","Woreda 06","Woreda 07","Woreda 08","Woreda 09","Woreda 10","Woreda 11","Woreda 12"
    ]
  }
];



// Helper functions
export const getSubcityOptions = () => {
  return AASubcityWoredaData.map(item => ({
    label: item.subcity,
    value: item.subcity
  }));
};

export const getWoredaOptionsBySubcity = (selectedSubcity: string) => {
  const subcity = AASubcityWoredaData.find(item => item.subcity === selectedSubcity);
  return subcity ? subcity.woredas.map(woreda => ({
    label: woreda,
    value: woreda
  })) : [];
}; 