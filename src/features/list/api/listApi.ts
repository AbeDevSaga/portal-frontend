import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://crvs-vitalservice.itsidx.com/api/v1/vital";

export const listApi = createApi({
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
    }),
  }),
});

export const { useGetListQuery } = listApi;
