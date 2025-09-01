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
                page = 0,
                perPage = 10,
                type = "MARRIAGE",
                languageCode = "en",
            }) => {
                // return `${LIST_ENDPOINT}type=${type}&page=${page}&size=${perPage}`;
                return `${LIST_ENDPOINT}page=${page}&size=${perPage}`;
            },
        }),
    }),
});

export const { useGetListQuery } = listApi;
