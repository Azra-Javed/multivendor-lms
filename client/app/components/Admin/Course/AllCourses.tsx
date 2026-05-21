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

type Props = {};

const AllCourses = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

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
          <FiEdit2 className="dark:text-white text-black mt-1" size={20} />
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

  data &&
    data.courses.forEach((item: any) => {
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
    <div className="mt-[70px] px-6">
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          {/* Data grid */}
          <StyledDataGridContainer>
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
            />
          </StyledDataGridContainer>

          {/* Delete modal */}
          {open && (
            <Modal open={open} onClose={() => setOpen(false)}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "calc(50% + 120px)",
                  transform: "translate(-50%, -50%)",
                  width: "90%",
                  maxWidth: "420px",
                  outline: "none",
                }}
                className="bg-white dark:bg-slate-800 rounded-2xl
                           border border-gray-200 dark:border-white/10
                           shadow-2xl overflow-hidden"
              >
                <div className="p-7 text-center">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-full bg-gray-100 dark:bg-white/10
                                  flex items-center justify-center mx-auto mb-4"
                  >
                    <AiOutlineDelete className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-Poppins mb-2">
                    Delete Course
                  </h2>

                  {/* Message */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins leading-relaxed">
                    Are you sure you want to delete this course? This action
                    cannot be undone.
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 dark:bg-white/10 my-6" />

                  {/* Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setOpen(false)}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium font-Poppins
                                 border border-gray-200 dark:border-white/10
                                 text-gray-700 dark:text-gray-300
                                 hover:border-teal-500 hover:text-teal-500
                                 dark:hover:border-teal-500 dark:hover:text-teal-400
                                 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium font-Poppins
                                 border border-gray-200 dark:border-white/10
                                 text-gray-700 dark:text-gray-300
                                 hover:border-red-400 hover:text-red-400
                                 dark:hover:border-red-400 dark:hover:text-red-400
                                 transition-all duration-200"
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
