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
    }),
});

export const { useGetResidentDataQuery } = residentApi;
