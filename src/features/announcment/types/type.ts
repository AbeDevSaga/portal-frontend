export type complaintType = {
    id: string;
    info: {
        name: string;
        image: string;
    }[];
};

export interface Localization {
    languageCode: string;
    submissionDate: string;
    reviewDate: string | null;
    approvedDate: string | null;
    reviewerNotes: string | null;
    approverNotes: string | null;
}

export interface MarriageRecord {
    registrationFormNumber: string;
    status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED"; // adjust if more statuses exist
    eventType: "MARRIAGE" | string;
    statustype: string;
    requester: string;
    requester_name: string;
    reviewer: string | null;
    approver: string | null;
    oldEventId: string | null;
    localizatoin: Localization[]; // keeping the spelling from your API
}

export interface GetListResponse {
    data: MarriageRecord[];
    size: number;
    total_page: number;
    page: number;
    message: string;
    status: number;
}
