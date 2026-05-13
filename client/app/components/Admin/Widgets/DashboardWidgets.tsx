import React, { FC, useEffect, useState } from "react";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import UserAnalytics from "../Analytics/UsersAnalytics";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={46}
        thickness={4}
        color={value && value > 99 ? "info" : "error"}
        style={{ zIndex: open ? -1 : 1 }}
      />
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setuserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) return;

    if (data && ordersData) {
      const usersLastTwoMonths = data.users.last12Months.slice(-2);
      const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

      if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
        const usersCurrentMonth = usersLastTwoMonths[1].count;
        const usersPreviousMonth = usersLastTwoMonths[0].count;
        const ordersCurrentMonth = ordersLastTwoMonths[1].count;
        const ordersPreviousMonth = ordersLastTwoMonths[0].count;

        const usersPercentChange =
          usersPreviousMonth !== 0
            ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) *
              100
            : 100;

        const ordersPercentChange =
          ordersPreviousMonth !== 0
            ? ((ordersCurrentMonth - ordersPreviousMonth) /
                ordersPreviousMonth) *
              100
            : 100;

        setuserComparePercentage({
          currentMonth: usersCurrentMonth,
          previousMonth: usersPreviousMonth,
          percentChange: usersPercentChange,
        });

        setOrdersComparePercentage({
          currentMonth: ordersCurrentMonth,
          previousMonth: ordersPreviousMonth,
          percentChange: ordersPercentChange,
        });
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <div className="mt-20 min-h-screen px-4 space-y-6">
      {/* TOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* USER ANALYTICS */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex-1 rounded-xl shadow-sm">
            <UserAnalytics isDashboard={true} />
          </div>
        </div>

        {/* SALES & USERS CARDS */}
        <div className="space-y-4 flex flex-col">
          {/* SALES CARD */}
          <div className="flex-1 rounded-xl bg-white dark:bg-[#111C43] shadow-sm px-6 py-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <BiBorderLeft className="text-3xl text-teal-500" />
                <h5 className="mt-2 text-2xl font-semibold text-black dark:text-white">
                  {ordersComparePercentage?.currentMonth}
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  Sales Obtained
                </p>
              </div>

              <div className="text-center">
                <CircularProgressWithLabel
                  value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <p className="pt-3 text-sm font-medium text-black dark:text-white">
                  {ordersComparePercentage?.percentChange > 0
                    ? "+" + ordersComparePercentage?.percentChange.toFixed(2)
                    : ordersComparePercentage?.percentChange.toFixed(2)}{" "}
                  %
                </p>
              </div>
            </div>
          </div>

          {/* USERS CARD */}
          <div className="flex-1 rounded-xl bg-white dark:bg-[#111C43] shadow-sm p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <PiUsersFourLight className="text-3xl text-teal-500" />
                <h5 className="mt-2 text-2xl font-semibold text-black dark:text-white">
                  {userComparePercentage?.currentMonth}
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  New Users
                </p>
              </div>

              <div className="text-center">
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <p className="pt-3 text-sm font-medium text-black dark:text-white">
                  {userComparePercentage?.percentChange > 0
                    ? "+" + userComparePercentage?.percentChange.toFixed(2)
                    : userComparePercentage?.percentChange.toFixed(2)}{" "}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ORDERS ANALYTICS */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex-1 bg-white dark:bg-[#111c43] rounded-xl shadow-sm p-5 pb-[50px]">
            <OrdersAnalytics isDashboard={true} />
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="flex flex-col">
          <div className="flex-1 bg-white dark:bg-[#0f172a] rounded-xl shadow-sm p-5 ">
            <h5 className="text-lg font-medium text-black dark:text-white pb-4">
              Recent Transactions
            </h5>
            <AllInvoices isDashboard={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
