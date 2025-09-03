import {
    APPLICATION_STATUS_UPDATE,
    GET_BIRTH_CERTIFICATE_ENDPOINT,
    GET_MARRIAGE_CERTIFICATE_ENDPOINT,
} from "@/common/utils/constants/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const certificateApi = createApi({
    reducerPath: "certificateApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_IDX_BACKEND4,
    }),
    endpoints: (builder) => ({
        // getVitalServiceEvent: builder.query({
        //     query: ({ id }) => {
        //         return `${GET_MARRIAGE_CERTIFICATE_ENDPOINT}${id}`;
        //     },
        // }),
        submitCertificateRequest: builder.mutation<any, { data: object }>({
            query: ({ data }) => ({
                url: GET_MARRIAGE_CERTIFICATE_ENDPOINT,
                method: "POST",
                body: JSON.stringify(data), // Convert to JSON string
                headers: {
                    "Content-Type": "application/json", // Tell server it's JSON
                },
            }),
        }),

        submitBirthCertificateRequest: builder.mutation<any, { data: object }>({
            query: ({ data }) => ({
                url: GET_BIRTH_CERTIFICATE_ENDPOINT,
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});

export const {
    useSubmitCertificateRequestMutation,
    useSubmitBirthCertificateRequestMutation,
} = certificateApi;
