"use client";

import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { format } from "timeago.js";
import Loader from "../../Loader/Loader";
import StyledDataGridContainer from "../Analytics/StyledDataGridContainer";

type Props = {
  isCollapsed: boolean;
};

const AllCourses = ({ isCollapsed }: Props) => {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const sidebarWidth = isCollapsed ? 80 : 260;

  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );

  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => (
        <Link href={`/admin/edit-course/${params.row.id}`}>
          <FiEdit2 className="dark:text-white text-black mt-4" size={20} />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpen(true);
            setCourseId(params.row.id);
          }}
        >
          <AiOutlineDelete className="dark:text-white text-black" size={20} />
        </Button>
      ),
    },
  ];

  const rows: any = [];

  data?.courses?.forEach((item: any) => {
    rows.push({
      id: item._id,
      title: item.name,
      ratings: Number(item.ratings).toFixed(2),
      purchased: item.purchased,
      created_at: format(item.createdAt),
    });
  });

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully");
    }
    if (error && "data" in error) {
      toast.error((error as any).data.message);
    }
  }, [isSuccess, error, refetch]);

  const handleDelete = async () => {
    await deleteCourse(courseId);
  };

  return (
    <div className="mt-[80px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <StyledDataGridContainer>
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
            />
          </StyledDataGridContainer>

          {/* DELETE MODAL */}
          {open && (
            <Modal open={open} onClose={() => setOpen(false)}>
              <Box
                sx={{
                  position: "fixed",

                  // base center
                  top: { xs: "45%", md: "50%" },
                  left: "55%",
                  transform: "translate(-50%, -50%)",

                  // sidebar-aware shift
                  "@media (min-width: 768px)": {
                    left: `calc(50% + ${sidebarWidth / 2}px)`,
                  },

                  width: {
                    xs: "75%",
                    sm: "380px",
                    md: "420px",
                  },

                  maxWidth: "420px",
                  outline: "none",

                  zIndex: 2000,
                }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-5 sm:p-7 text-center">
                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                    <AiOutlineDelete className="text-gray-500" size={22} />
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold mb-2">Delete Course</h2>

                  {/* Message */}
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this course? This action
                    cannot be undone.
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full flex-1 py-2.5 rounded-lg
                      border border-gray-200 dark:border-white/10
                      text-gray-700 dark:text-gray-300"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleDelete}
                      className="w-full flex-1 py-2.5 rounded-lg
                      border border-gray-200 dark:border-white/10
                      text-gray-700 dark:text-gray-300
                      hover:border-red-400 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
