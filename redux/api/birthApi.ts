import { birthCreateEndpoint } from "@/utils/constants/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const birthApi = createApi({
    reducerPath: "birthApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_CRRSA_BACKEND_API_URL_V2,
    }),
    endpoints: (builder) => ({
        submitForm: builder.mutation<any, Record<string, any>>({
            query: (formData) => ({
                url: birthCreateEndpoint,
                method: "POST",
                body: formData,
            }),
        }),
    }),
});

export const { useSubmitFormMutation } = birthApi;
