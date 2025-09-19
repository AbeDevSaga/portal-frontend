export interface Localization {
    attendantName: string
    attendantQualification: string
    birthDate: string
    birthTime: string
    birthType: string
    childBirthOrder: string
    childFirstName: string
    childHeadCircumference: string | null
    childHeight: string | null
    childWeight: string | null
    gender: string
    issuedDate: string
    languageCode: string
    placeOfBirth: BirthPlace
    reason: string
}

export interface BirthPlace {
    type: string;
    facilityName: string;
    facilityType: string;
    facilityOwnership: string;
    facilityNotificationRef: string;
    locationDescription: string;
}

export interface BirthData {
    approvedAt: string | null
    birthRegistrationIdentificationNumber: string | null
    bloodTypeId: string | null
    childId: string | null
    fatherId: string
    hospitalNotificationId: string
    id: string
    localizations: Localization[];
    motherId: string
    nationalityName: string
    reason: string | null
    registrationFormNumber: string
    registrationOfficeNumber: string
    registrationStatus: string
}

export interface BirthResponse {
    data: BirthData;
}
