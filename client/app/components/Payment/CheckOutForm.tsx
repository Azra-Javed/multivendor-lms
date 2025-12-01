import { styles } from "@/app/styles/styles";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  setOpen: any;
  data: any;
};

const CheckOutForm = ({ data, setOpen }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courseId: data._id, payment_info: paymentIntent });
    }
  };

  //   useEffect(() => {
  //     if (orderData) {
  //       refetch();
  //       socketId.emit("notification", {
  //         title: "New Order",
  //         message: `You have a new order from ${data.name}`,
  //         userId: user._id,
  //       });
  //       redirect(`/course-access/${data._id}`);
  //     }
  //     if (error) {
  //       if ("data" in error) {
  //         const errorMessage = error as any;
  //         toast.error(errorMessage.data.message);
  //       }
  //     }
  //   }, [orderData, error]);

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      redirect(`/course-access/${data._id}`);
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error]);
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[95%] overflow-y-scroll">
        <form id="payment-form" onSubmit={handleSubmit}>
          <LinkAuthenticationElement id="link-authentication-element" />
          <PaymentElement id="payment-element" />
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="mt-2"
          >
            <span className={`${styles.button} !h-[35px]`}>
              {isLoading ? "Paying..." : "Pay now"}
            </span>
          </button>
          {message && (
            <div
              id="payment-message"
              className="text-red-500 font-Poppins pt-2"
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckOutForm;
