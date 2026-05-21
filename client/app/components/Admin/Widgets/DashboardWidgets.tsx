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

  const StatCard = ({
    icon,
    label,
    value,
    percentChange,
  }: {
    icon: React.ReactNode;
    label: string;
    value: number;
    percentChange: number;
  }) => {
    const isPositive = percentChange > 0;

    return (
      <div
        className="flex-1 rounded-xl border border-gray-200 dark:border-white/10
                 bg-white dark:bg-slate-800 shadow-sm p-4"
      >
        {/* top row */}
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center">
            {icon}
          </div>

          <CircularProgressWithLabel value={isPositive ? 100 : 0} open={open} />
        </div>

        {/* value */}
        <h5 className="text-xl font-semibold text-gray-900 dark:text-white font-Poppins">
          {value ?? "—"}
        </h5>

        {/* label */}
        <p className="text-xs text-gray-500 dark:text-gray-400 font-Poppins mt-0.5">
          {label}
        </p>

        {/* bottom row */}
        <div className="flex items-center justify-between mt-3">
          <span
            className={`text-sm font-semibold font-Poppins ${
              isPositive ? "text-teal-500" : "text-rose-500"
            }`}
          >
            {isPositive ? "+" : ""}
            {percentChange?.toFixed(1)}%
          </span>

          <span className="text-[10px] text-gray-400 dark:text-gray-500">
            vs last month
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-20 min-h-screen px-4 pb-10 space-y-5">
      {/* Top row: analytics chart + two stat cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* User analytics chart */}
        <div
          className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-white/10
                        bg-white dark:bg-slate-800 shadow-sm overflow-hidden"
        >
          <UserAnalytics isDashboard={true} />
        </div>

        {/* Stat cards */}
        <div className="flex flex-col gap-5">
          <StatCard
            icon={<BiBorderLeft className="w-5 h-5 text-teal-500" />}
            label="Sales this month"
            value={ordersComparePercentage?.currentMonth}
            percentChange={ordersComparePercentage?.percentChange}
          />
          <StatCard
            icon={<PiUsersFourLight className="w-5 h-5 text-teal-500" />}
            label="New users this month"
            value={userComparePercentage?.currentMonth}
            percentChange={userComparePercentage?.percentChange}
          />
        </div>
      </div>

      {/* Bottom row: orders chart + recent transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Orders analytics chart */}
        <div
          className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-white/10
                        bg-white dark:bg-slate-800 shadow-sm overflow-hidden pb-[50px]"
        >
          <OrdersAnalytics isDashboard={true} />
        </div>

        {/* Recent transactions */}
        <div
          className="rounded-xl border border-gray-200 dark:border-white/10
                        bg-white dark:bg-slate-800 shadow-sm overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-gray-100 dark:border-white/10">
            <h5 className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
              Recent Transactions
            </h5>
          </div>
          <div className="p-5">
            <AllInvoices isDashboard={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
