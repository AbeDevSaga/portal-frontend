import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const residentApi = createApi({
    reducerPath: "residentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_CRRSA_BACKEND_API_URL,
    }),
    endpoints: (builder) => ({
        getResidentData: builder.query({
            query: ({ id }) => {
                return `/resident/residents?search=${id}`;
            },
        }),
        getResidentDataById: builder.query({
            query: ({ id = "" }) => {
                return `/resident/residents/${id}`;
            },
        }),
        getReligionData: builder.query({
            query: () => {
                return "/religions";
            },
        }),
        getReligionDataById: builder.query({
            query: ({ id }) => {
                return `/reference-data/religions/${id}`;
            },
        }),
        getNationalityData: builder.query({
            query: () => {
                return "/nationalities";
            },
        }),
        getNationalityDataById: builder.query({
            query: ({ id }) => {
                return `/reference-data/nationalities/${id}`;
            },
        }),
        getRegionsData: builder.query({
            query: () => {
                return "/regions";
            },
        }),
        getRegionsDataById: builder.query({
            query: ({ id }) => {
                return `/reference-data/regions/${id}`;
            },
        }),
        getZonesData: builder.query({
            query: () => {
                return "/zones";
            },
        }),
        getZonesDataById: builder.query({
            query: ({ id }) => {
                return `/reference-data/zones/${id}`;
            },
        }),
    }),
});

export const {
    useGetResidentDataQuery,
    useGetResidentDataByIdQuery,
    useGetReligionDataByIdQuery,
    useGetReligionDataQuery,
    useGetNationalityDataByIdQuery,
    useGetNationalityDataQuery,
    useGetRegionsDataByIdQuery,
    useGetRegionsDataQuery,
    useGetZonesDataByIdQuery,
    useGetZonesDataQuery,
} = residentApi;
