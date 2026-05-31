import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import StyledDataGridContainer from "../Analytics/StyledDataGridContainer";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data?.orders?.map((item: any) => {
        const user = usersData?.users?.find((u: any) => u._id === item.userId);
        const course = coursesData?.courses?.find(
          (c: any) => c._id === item.courseId,
        );

        return {
          ...item,
          userName: user?.name || item.userName || "Deleted User",
          userEmail: user?.email || item.userEmail || "—",
          title: course?.name || item.courseTitle || "Deleted Course",
          price:
            course?.price != null
              ? "$" + course.price
              : item.price != null
                ? "$" + item.price
                : "—",
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => (
              <a href={`mailto:${params.row.userEmail}`}>
                <AiOutlineMail
                  className="dark:text-white text-black mt-4"
                  size={20}
                />
              </a>
            ),
          },
        ]),
  ];

  const rows: any = [];
  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  const isDark = theme === "dark";

  if (isLoading) return <Loader />;

  // ── Dashboard mode
  if (isDashboard) {
    return (
      <div className="w-full overflow-auto">
        <table className="w-full text-sm font-Poppins">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Name
              </th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Price
              </th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                When
              </th>
            </tr>
          </thead>
          <tbody>
            {(isDashboard ? rows.slice(0, 5) : rows).map(
              (row: any, index: number) => (
                <tr
                  key={index}
                  className="border-b border-white/[0.06]
                 hover:bg-white/[0.03]
                 transition-colors duration-150 last:border-0"
                >
                  <td className="py-3 px-3 text-[12px] dark:text-[#e2e8f0] text-[#1e293b] truncate max-w-[100px]">
                    {row.userName}
                  </td>
                  <td className="py-3 px-3 text-sm text-teal-400 font-semibold whitespace-nowrap">
                    {row.price}
                  </td>
                  <td className="py-3 px-3 text-xs text-gray-500 whitespace-nowrap">
                    {row.created_at}
                  </td>
                </tr>
              ),
            )}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="py-8 text-center text-sm text-gray-500 font-Poppins"
                >
                  No transactions yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  // ── Full page mode: MUI DataGrid ──
  return (
    <div className="mt-[70px]">
      <StyledDataGridContainer>
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
        />
      </StyledDataGridContainer>
    </div>
  );
};

export default AllInvoices;
