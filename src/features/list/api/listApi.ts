<<<<<<< HEAD
=======
import { LIST_ENDPOINT } from "@/common/utils/constants/EndPoints";
import { GetListResponse } from "@/features/announcment/types/type";
>>>>>>> gitlab1/main
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://crvs-vitalservice.itsidx.com/api/v1/vital";

export const listApi = createApi({
<<<<<<< HEAD
  reducerPath: "listApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getList: builder.query<
      any,
      {
        page?: number;
        perPage?: number;
        type?: string; // optional now
        languageCode?: string;
      }
    >({
      query: ({ page = 1, perPage = 10, type, languageCode = "en" }) => {
        if (type) {
          // when type is passed
          return `vital_event_list_by_type?type=${type}&page=${page}&size=${perPage}`;
        }
        // when no type
        return `vital_event_list?page=${page}&size=${perPage}`;
      },
=======
    reducerPath: "listApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_IDX_BACKEND,
    }),
    endpoints: (builder) => ({
        getList: builder.query<
            GetListResponse,
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
>>>>>>> gitlab1/main
    }),
  }),
});

export const { useGetListQuery } = listApi;
