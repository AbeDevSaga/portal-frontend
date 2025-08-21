import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import birthSliceReducer from "./feature/birthSlice";
import { birthApi } from "./api/birthApi";
export const store = configureStore({
    reducer: {
        birthSlice: birthSliceReducer,
        [birthApi.reducerPath]: birthApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        // fraudSliceApi.middleware
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(birthApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
