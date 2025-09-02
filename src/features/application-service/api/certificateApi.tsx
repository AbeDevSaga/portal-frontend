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
            query: ({ data }) => {
                return {
                    url: GET_MARRIAGE_CERTIFICATE_ENDPOINT,
                    method: "POST",
                    body: data,
                };
            },
        }),
        submitBirthCertificateRequest: builder.mutation<any, { data: object }>({
            query: ({ data }) => {
                return {
                    url: GET_BIRTH_CERTIFICATE_ENDPOINT,
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});

export const {
    useSubmitCertificateRequestMutation,
    useSubmitBirthCertificateRequestMutation,
} = certificateApi;
