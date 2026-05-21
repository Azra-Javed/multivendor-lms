// import { styles } from "@/app/styles/styles";
// import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
// import {
//   Area,
//   AreaChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import Loader from "../../Loader/Loader";

// type Props = {
//   isDashboard?: boolean;
// };

// const UserAnalytics = ({ isDashboard }: Props) => {
//   const { data, isLoading } = useGetUsersAnalyticsQuery({});

//   const analyticsData: any = [];

//   data &&
//     data.users.last12Months.forEach((item: any) => {
//       analyticsData.push({ name: item.month, count: item.count });
//     });

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div
//           className={`${
//             !isDashboard
//               ? "mt-[50px]"
//               : "dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
//           }`}
//         >
//           <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
//             <h1
//               className={`${styles.title} ${
//                 isDashboard && "!text-[20px]"
//               } px-5 !text-start`}
//             >
//               Users Analytics
//             </h1>
//             {!isDashboard && (
//               <p className={`${styles.label} px-5`}>
//                 Last 12 months analytics data{" "}
//               </p>
//             )}
//           </div>

//           <div
//             className={`w-full ${
//               isDashboard ? "h-[30vh]" : "h-screen"
//             } flex items-center justify-center`}
//           >
//             <ResponsiveContainer
//               width={isDashboard ? "100%" : "90%"}
//               height={!isDashboard ? "50%" : "100%"}
//             >
//               <AreaChart
//                 data={analyticsData}
//                 margin={{
//                   top: 20,
//                   right: 30,
//                   left: 0,
//                   bottom: 0,
//                 }}
//               >
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Area
//                   type="monotone"
//                   dataKey="count"
//                   stroke="#4d62d9"
//                   fill="#4d62d9"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserAnalytics;

import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loader from "../../Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  if (isLoading) return <Loader />;

  return (
    <div className={`${isDashboard ? "pb-5" : "mt-[50px]"}`}>
      {/* Header */}
      <div className="px-6 pt-5 pb-2">
        <h2
          className={`font-semibold font-Poppins text-gray-900 dark:text-white
                        ${isDashboard ? "text-base" : "text-2xl"}`}
        >
          Users Analytics
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
          <AreaChart
            data={analyticsData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
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
            <Area
              type="monotone"
              dataKey="count"
              stroke="#14b8a6"
              fill="#14b8a6"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAnalytics;
