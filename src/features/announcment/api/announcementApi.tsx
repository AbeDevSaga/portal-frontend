import {
    CREATE_MARRIAGE_COMPLAINT,
    GET_MARRIAGE_ANNOUNCEMENT,
} from "@/common/utils/constants/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const announcementApi = createApi({
    reducerPath: "announcementApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_IDX_BACKEND2,
    }),
    endpoints: (builder) => ({
        getAccouncements: builder.query({
            query: ({ page, perPage }) => {
                return `${GET_MARRIAGE_ANNOUNCEMENT}?page=${page}&size=${perPage}`;
            },
        }),
        submitComplaint: builder.mutation<
            any,
            { data: object; files?: { file: File; type?: string }[] }
        >({
            query: ({ data, files = [] }) => {
                const formData = new FormData();
                const jsonBlob = new Blob([JSON.stringify(data)], {
                    type: "application/json",
                });

                formData.append("data", jsonBlob);

                files.forEach((doc, index) => {
                    formData.append(`documents[${index}].file`, doc.file);
                    if (doc.type) {
                        formData.append(`documents[${index}].type`, doc.type);
                    }
                });

                return {
                    url: CREATE_MARRIAGE_COMPLAINT,
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
});

export const { useSubmitComplaintMutation, useGetAccouncementsQuery } =
    announcementApi;
