"use client";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: any;
  data: any;
  user: any;
};

const CheckOutForm = ({ data, setOpen, user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { refetch } = useLoadUserQuery(undefined);

  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Payment failed");
      setIsLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      createOrder({
        courseId: data._id,
        payment_info: paymentIntent,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (orderData) {
      setSuccess(true);

      socketId.emit("notification", {
        title: "New Order",
        message: `New purchase for ${data.name}`,
        userId: user._id,
      });

      toast.success("Payment successful!");

      refetch();

      setOpen(false);

      router.push(`/course/${data._id}`);
    }

    if (error && "data" in error) {
      const err = error as any;
      toast.error(err.data.message);
    }
  }, [orderData, error, refetch, data, router, setOpen, user]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-Poppins mb-2">
          Email Address
        </label>
        <div className="rounded-lg border border-gray-200 dark:border-white/10 p-3">
          <LinkAuthenticationElement />
        </div>
      </div>

      {/* Payment */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-Poppins mb-2">
          Payment Details
        </label>
        <div className="rounded-lg border border-gray-200 dark:border-white/10 p-3">
          <PaymentElement />
        </div>
      </div>

      {/* Error */}
      {message && (
        <p className="text-sm text-red-500 font-Poppins">{message}</p>
      )}

      <div className="h-px bg-gray-100 dark:bg-white/10" />

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium font-Poppins border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-teal-500 hover:text-teal-500 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!stripe || !elements || isLoading}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold font-Poppins bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? "Processing..." : `Pay $${data?.price}`}
        </button>
      </div>

      {success && (
        <p className="text-sm text-teal-500 text-center font-Poppins">
          Payment completed — redirecting...
        </p>
      )}
    </form>
  );
};

export default CheckOutForm;
