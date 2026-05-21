// import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
// import React, { useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import Loader from "../../Loader/Loader";
// import { styles } from "@/app/styles/styles";

// type Props = {
//   isDashboard?: boolean;
// };

// export default function OrdersAnalytics({ isDashboard }: Props) {
//   const { data, isLoading } = useGetOrdersAnalyticsQuery({});

//   const analyticsData: any = [];

//   data &&
//     data.orders.last12Months.forEach((item: any) => {
//       analyticsData.push({ name: item.month, Count: item.count });
//     });

//   console.log("analyticsdata", analyticsData);
//   console.log("data", data);

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className={isDashboard ? "h-[35vh]" : "h-screen"}>
//           <div
//             className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}
//           >
//             <h1
//               className={`${styles.title} ${
//                 isDashboard && "!text-[20px]"
//               } px-5 !text-start`}
//             >
//               Orders Analytics
//             </h1>
//             {!isDashboard && (
//               <p className={`${styles.label} px-5`}>
//                 Last 12 months analytics data{" "}
//               </p>
//             )}
//           </div>
//           <div
//             className={`w-full ${
//               !isDashboard ? "h-[90%]" : "h-full"
//             } flex items-center justify-center`}
//           >
//             <ResponsiveContainer
//               width={isDashboard ? "100%" : "90%"}
//               height={isDashboard ? "100%" : "50%"}
//             >
//               <LineChart
//                 width={500}
//                 height={300}
//                 data={analyticsData}
//                 margin={{
//                   top: 5,
//                   right: 30,
//                   left: 20,
//                   bottom: 5,
//                 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 {!isDashboard && <Legend />}
//                 <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

const OrdersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, Count: item.count });
    });

  if (isLoading) return <Loader />;

  return (
    <div className={`${isDashboard ? "h-[35vh]" : "mt-[50px]"}`}>
      {/* Header */}
      <div className="px-6 pt-5 pb-2">
        <h2
          className={`font-semibold font-Poppins text-gray-900 dark:text-white
                        ${isDashboard ? "text-base" : "text-2xl"}`}
        >
          Orders Analytics
        </h2>
        {!isDashboard && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-Poppins">
            Last 12 months analytics data
          </p>
        )}
      </div>

      {/* Chart */}
      <div
        className={`w-full flex items-center justify-center
                       ${isDashboard ? "h-[40vh]" : "h-[50vh]"}`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={analyticsData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(148,163,184,0.15)"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
              }}
            />
            {!isDashboard && (
              <Legend wrapperStyle={{ fontSize: "13px", color: "#94a3b8" }} />
            )}
            <Line
              type="monotone"
              dataKey="Count"
              stroke="#14b8a6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: "#14b8a6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersAnalytics;
