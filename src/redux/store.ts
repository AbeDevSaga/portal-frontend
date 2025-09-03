import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import birthSliceReducer from "./feature/birthSlice";
import { birthApi } from "./api/birthApi";
import { marriageApi } from "@/features/marriage-service/api/marriageApi";

import { listApi } from "@/features/list/api/listApi";
import { applicationApi } from "@/features/application-service/api/applicationApi";
import { residentApi } from "@/features/application-service/api/residentApi";
import { certificateApi } from "@/features/application-service/api/certificateApi";
import { announcementApi } from "@/features/announcment/api/announcementApi";

export const store = configureStore({
    reducer: {
        birthSlice: birthSliceReducer,
        [birthApi.reducerPath]: birthApi.reducer,
        [marriageApi.reducerPath]: marriageApi.reducer,
        [listApi.reducerPath]: listApi.reducer,
        [applicationApi.reducerPath]: applicationApi.reducer,
        [residentApi.reducerPath]: residentApi.reducer,
        [certificateApi.reducerPath]: certificateApi.reducer,
        [announcementApi.reducerPath]: announcementApi.reducer,

        // [marriageApi.reducerPath]: marriageApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        // fraudSliceApi.middleware
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            birthApi.middleware,
            marriageApi.middleware,
            listApi.middleware,
            applicationApi.middleware,
            residentApi.middleware,
            certificateApi.middleware,
            announcementApi.middleware
            // marriageApi.middleware
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
