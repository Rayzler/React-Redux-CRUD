import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users.slice.ts";
import { persistanceLocalStorage, syncWithDatabase } from "./middlewares.ts";

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        persistanceLocalStorage,
        syncWithDatabase
    )
});