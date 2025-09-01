export interface Localization {
    languageCode: string;
    birthType: string;
    reason: string;
    issueDate: string | null;
}

export interface BirthData {
    birthRequestId: string;
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

export interface BirthResponse {
    data: BirthData;
}
