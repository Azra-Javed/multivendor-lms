import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  courseId: string;
  userId: string;
  payment_info: object;
  // snapshot fields -> invoices
  userName: string;
  userEmail: string;
  courseTitle: string;
  price: number;
}

const OrderSchema = new Schema<IOrder>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Object,
    },
    // snapshot fields -> invoices
    userName: {
      type: String,
      default: "",
    },
    userEmail: {
      type: String,
      default: "",
    },
    courseTitle: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const OrderModel: Model<IOrder> = mongoose.model("Order", OrderSchema);
export default OrderModel;
