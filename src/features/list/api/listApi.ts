import { LIST_ENDPOINT } from "@/common/utils/constants/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const listApi = createApi({
    reducerPath: "listApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_IDX_BACKEND,
    }),
    endpoints: (builder) => ({
        getList: builder.query<
            any,
            {
                page?: number;
                perPage?: number;
                type: string;
                languageCode: string;
            }
        >({
            query: ({
                page = 1,
                perPage = 10,
                type = "MARRIAGE",
                languageCode = "en",
            }) => {
                return `${LIST_ENDPOINT}?from=2025-08-22&to=2025-08-22&type=MARRIAGE&languageCode=en&page=0&size=1&sort=%5B%22string%22%5D`;
            },
        }),
    }),
});

export const { useGetListQuery } = listApi;
