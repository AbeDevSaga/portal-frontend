import {
    APPLICATION_STATUS_UPDATE,
    GET_VITAL_SERVICE_EVENT,
} from "@/common/utils/constants/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationApi = createApi({
    reducerPath: "applicationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_IDX_BACKEND,
    }),
    endpoints: (builder) => ({
        getVitalServiceEvent: builder.query({
            query: ({ id }) => {
                return `${GET_VITAL_SERVICE_EVENT}${id}`;
            },
        }),
        submitResolutionForm: builder.mutation<any, { data: any }>({
            query: ({ data }) => {
                return {
                    url: APPLICATION_STATUS_UPDATE,
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});

export const { useSubmitResolutionFormMutation, useGetVitalServiceEventQuery } =
    applicationApi;
