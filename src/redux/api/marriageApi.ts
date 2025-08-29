import { MARRIAGE_LIST_ENDPOINT } from "@/common/utils/constants/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const marriageApi = createApi({
    reducerPath: "marriageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
    }),
    endpoints: (builder) => ({
        getMarriagesList: builder.query<
            any,
            { page?: number; perPage?: number }
        >({
            query: ({ page = 1, perPage = 10 } = {}) => {
                return `${MARRIAGE_LIST_ENDPOINT}?page=${page}&perPage=${perPage}`;
            },
        }),
        getMarriageBySlug: builder.query({
            query: ({ id }) => {
                return `${MARRIAGE_LIST_ENDPOINT}/${id}`;
            },
        }),
        submitForm: builder.mutation<any, Record<string, any>>({
            query: (formData) => ({
                url: MARRIAGE_LIST_ENDPOINT,
                method: "POST",
                body: formData,
            }),
        }),
    }),
});

export const {
    useSubmitFormMutation,
    useGetMarriagesListQuery,
    useGetMarriageBySlugQuery,
} = marriageApi;
