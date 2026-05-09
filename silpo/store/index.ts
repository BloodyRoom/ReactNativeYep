import {configureStore} from "@reduxjs/toolkit";
import {AuthService} from "@/services/AuthService";
import {ProfileService} from "@/services/AccountService";

export const store = configureStore({
    reducer: {
        [AuthService.reducerPath]: AuthService.reducer,
        [ProfileService.reducerPath]: ProfileService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(AuthService.middleware)
            .concat(ProfileService.middleware)
})