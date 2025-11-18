//actions

import toast from "react-hot-toast";
import { apiSlice } from "../api/apiSlice";
import { userRegisteration } from "./authSlice";

type RegisterationResponse = {
  message: string;
  activationToken: string;
};

type RegisterationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints here
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
            })
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
  }),
});
export const { useRegisterMutation, useActivationMutation } = authApi;
