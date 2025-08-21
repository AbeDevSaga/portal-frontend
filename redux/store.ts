import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import birthSliceReducer from "./feature/birthSlice";
export const store = configureStore({
    reducer: {
        birthSlice: birthSliceReducer,
        // [fraudSliceApi.reducerPath]: fraudSliceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        // fraudSliceApi.middleware
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
