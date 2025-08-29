export interface Localization {
    languageCode: string;
    marriageType: string;
    reason: string;
    issueDate: string | null;
}

export interface MarriageData {
    marriageRequestId: string;
    registrationFormNumber: string;
    husband: string;
    wife: string;
    wifeWetnessOne: string;
    wifeWetnessTwo: string;
    husbandWetnessOne: string;
    husbandWetnessTwo: string;
    supporting_doc_url: string | null;
    localization: Localization[];
    objections: any[];
}

export interface MarriageResponse {
    data: MarriageData;
}
