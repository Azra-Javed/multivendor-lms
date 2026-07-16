//actions
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegisteration } from "./authSlice";

type RegisterationResponse = {
  message: string;
  activationToken: string;
};

type RegisterationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints
    register: builder.mutation<RegisterationResponse, RegisterationData>({
      query: (data) => ({
        url: "registeration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userRegisteration({
              token: data.activationToken,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: data.activationToken,
              user: data.user,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: data.activationToken,
              user: data.user,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    logOut: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
          dispatch(apiSlice.util.resetApiState()); // clears ALL RTK Query caches, not just loadUser
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutQuery,
} = authApi;
