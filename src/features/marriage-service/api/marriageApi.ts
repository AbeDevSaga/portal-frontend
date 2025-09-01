import {
    MARRIAGE_CREATE_ENDPOINT,
    MARRIAGE_GET_BY_BRIDE_OR_GROOM,
    MARRIAGE_GET_BY_REGISTRATION_FORM_NUMBER,
    MARRIAGE_LIST_ENDPOINT,
} from "@/common/utils/constants/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const marriageApi = createApi({
    reducerPath: "marriageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_IDX_BACKEND2,
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
                return `${MARRIAGE_GET_BY_REGISTRATION_FORM_NUMBER}${id}`;
            },
        }),
        getResidentData: builder.query({
            query: ({ id, type = "search" }) => {
                return `${process.env.NEXT_PUBLIC_CRRSA_BACKEND_API_URL}/resident/residents?${type}=${id}`;
            },
        }),

        submitForm: builder.mutation<
            any,
            { data: any; files?: { file: File }[] }
        >({
            query: ({ data, files = null }) => {
                const formData = new FormData();
                const jsonBlob = new Blob([JSON.stringify(data)], {
                    type: "application/json",
                });

                formData.append("data", jsonBlob);

                if (files) {
                    files.forEach((doc, index) => {
                        formData.append(`documents[${index}].file`, doc.file);
                        formData.append(`documents[${index}].type`, doc.type);
                    });
                }

                return {
                    url: MARRIAGE_CREATE_ENDPOINT,
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
});

export const {
    useSubmitFormMutation,
    useGetMarriagesListQuery,
    useGetMarriageBySlugQuery,
    useGetResidentDataQuery,
} = marriageApi;
