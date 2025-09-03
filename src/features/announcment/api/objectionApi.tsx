import { GET_MARRIAGE_ANNOUNCEMENT } from "@/common/utils/constants/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const objectionApi = createApi({
    reducerPath: "objectionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_IDX_BACKEND4,
    }),
    endpoints: (builder) => ({
        getAccouncements: builder.query({
            query: ({ id }) => {
                return `${GET_MARRIAGE_ANNOUNCEMENT}${id}`;
            },
        }),
        submitComplaint: builder.mutation<any, { data: object }>({
            query: ({ data }) => {
                return {
                    url: GET_MARRIAGE_ANNOUNCEMENT,
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});

export const { useSubmitComplaintMutation } = objectionApi;
