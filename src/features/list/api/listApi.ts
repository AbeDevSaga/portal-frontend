import { LIST_ENDPOINT } from "@/common/utils/constants/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const listApi = createApi({
  reducerPath: "listApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_IDX_BACKEND || "https://crvs-vitalservice.itsidx.com/api/v1/vital",
  }),
  endpoints: (builder) => ({
    getList: builder.query<
      any,
      {
        page?: number;
        perPage?: number;
        type?: string; // now optional
        languageCode?: string;
      }
    >({
      query: ({ page = 0, perPage = 10, type, languageCode = "en" }) => {
        if (type) {
          // when type is passed
          return `${LIST_ENDPOINT}type=${type}&page=${page}&size=${perPage}&languageCode=${languageCode}`;
        }
        // when no type
        return `${LIST_ENDPOINT}page=${page}&size=${perPage}&languageCode=${languageCode}`;
      },
    }),
  }),
});

export const { useGetListQuery } = listApi;
