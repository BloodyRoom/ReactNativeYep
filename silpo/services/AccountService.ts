import {createApi} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "@/constants/Urls";
import {IProfile} from "@/types/Account/IProfile";
import {createBaseQueryWithAuth} from "@/utils/fetchBaseQueryWithAuth";

export const ProfileService = createApi({
    reducerPath: "profileService",
    tagTypes: ["Profile"],
    baseQuery: createBaseQueryWithAuth({baseUrl: BASE_URL+"/api/Account"}),
    endpoints: (builder) => ({
        getProfile: builder.query<IProfile, void>({
            query:() => '/',
            providesTags: ["Profile"]
        }),
    })
});

export const {
    useGetProfileQuery,
} = ProfileService;