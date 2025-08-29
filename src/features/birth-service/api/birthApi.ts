import { BIRTH_LIST_ENDPOINT } from "@/common/utils/constants/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const birthApi = createApi({
    reducerPath: "birthApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_IDX_BACKEND,
    }),
    endpoints: (builder) => ({
        getBirthsList: builder.query<any, { page?: number; perPage?: number }>({
            query: ({ page = 1, perPage = 10 } = {}) => {
                return `${BIRTH_LIST_ENDPOINT}?page=${page}&perPage=${perPage}`;
            },
        }),
        getBirthBySlug: builder.query({
            query: ({ id }) => {
                return `${BIRTH_LIST_ENDPOINT}/${id}`;
            },
        }),
        submitForm: builder.mutation<any, Record<string, any>>({
            query: (formData) => ({
                url: BIRTH_LIST_ENDPOINT,
                method: "POST",
                body: formData,
            }),
        }),
    }),
});

export const {
    useSubmitFormMutation,
    useGetBirthsListQuery,
    useGetBirthBySlugQuery,
} = birthApi;
