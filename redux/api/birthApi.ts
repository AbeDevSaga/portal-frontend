import { birthListEndpoint } from "@/utils/constants/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const birthApi = createApi({
    reducerPath: "birthApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
    }),
    endpoints: (builder) => ({
        getBirthsList: builder.query<any, { page?: number; perPage?: number }>({
            query: ({ page = 1, perPage = 10 } = {}) => {
                return `${birthListEndpoint}?page=${page}&perPage=${perPage}`;
            },
        }),
        getBirthBySlug: builder.query({
            query: ({ id }) => {
                return `${birthListEndpoint}/${id}`;
            },
        }),
        submitForm: builder.mutation<any, Record<string, any>>({
            query: (formData) => ({
                url: birthListEndpoint,
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
