import {
  BIRTH_CREATE_ENDPOINT,
  BIRTH_LIST_ENDPOINT,
} from "@/common/utils/constants/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const birthApi = createApi({
  reducerPath: "birthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_IDX_BACKEND1,
  }),
  endpoints: (builder) => ({
    getBirthsList: builder.query<any, { page?: number; perPage?: number }>({
      query: ({ page = 1, perPage = 10 } = {}) =>
        `${BIRTH_LIST_ENDPOINT}?page=${page}&perPage=${perPage}`,
    }),

    // updated slug to use query param
    getBirthBySlug: builder.query<any, { id: string }>({
      query: ({ id }) =>
        `/birth-registrations/vital-request?registrationFormNumber=${id}`,
    }),

    submitForm: builder.mutation<any, Record<string, any>>({
      query: (formData) => ({
        url: BIRTH_CREATE_ENDPOINT,
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
