"use client";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";
import Loader from "../../Loader/Loader";
import StyledDataGridContainer from "../Analytics/StyledDataGridContainer";

type Props = {
  isTeam?: boolean;
};

const AllUsers = ({ isTeam }: Props) => {
  const { theme } = useTheme();

  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();

  const { isLoading, data, refetch } = useGetAllUsersQuery({});

  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  useEffect(() => {
    if (updateError && "data" in updateError) {
      toast.error((updateError as any).data.message);
    }
    if (isSuccess) {
      toast.success("User role updated successfully");
      refetch();
      setActive(false);
    }
    if (deleteSuccess) {
      toast.success("User deleted successfully!");
      refetch();
      setOpen(false);
    }
    if (deleteError && "data" in deleteError) {
      toast.error((deleteError as any).data.message);
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError, refetch]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.4 },
    { field: "name", headerName: "Name", flex: 0.4 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.4 },
    { field: "courses", headerName: "Courses", flex: 0.3 },
    { field: "created_at", headerName: "Joined At", flex: 0.4 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setUserId(params.row.id);
            setOpen(true);
          }}
        >
          <AiOutlineDelete className="text-black dark:text-white" size={20} />
        </Button>
      ),
    },
    {
      field: "mail",
      headerName: "Send Mail",
      flex: 0.2,
      renderCell: (params: any) => (
        <a
          href={`mailto:${params.row.email}`}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg
                     bg-gradient-to-br from-blue-500 to-indigo-600
                     hover:from-blue-600 hover:to-indigo-700
                     transition-all duration-200 hover:scale-110 shadow-sm mt-2"
        >
          <AiOutlineMail className="text-white" size={18} />
        </a>
      ),
    },
  ];

  const filteredUsers = isTeam
    ? data?.users?.filter((u: any) => u.role === "admin")
    : data?.users;

  const rows =
    filteredUsers?.map((item: any) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      role: item.role,
      courses: item.courses?.length || 0,
      created_at: format(item.createdAt),
    })) || [];

  // shared modal box styles — centers in content area accounting for sidebar
  const modalBoxSx = {
    position: "absolute",
    top: "50%",
    left: "calc(50% + 120px)",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "420px",
    outline: "none",
  };

  return (
    <div className="mt-[80px] px-6">
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          {/* Add member button */}
          {isTeam && (
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setActive(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                           bg-teal-500 hover:bg-teal-600
                           text-white text-sm font-semibold font-Poppins
                           transition-colors duration-200"
              >
                Add New Member
              </button>
            </div>
          )}

          {/* Data grid */}
          <StyledDataGridContainer>
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
            />
          </StyledDataGridContainer>

          {/* ── Add Member Modal ── */}
          {active && (
            <Modal open={active} onClose={() => setActive(false)}>
              <Box
                sx={modalBoxSx}
                className="bg-white dark:bg-slate-800 rounded-2xl
                           border border-gray-200 dark:border-white/10
                           shadow-2xl overflow-hidden"
              >
                {/* Teal top bar */}
                <div className="h-1 w-full bg-teal-500" />

                <div className="p-6">
                  {/* Header */}
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-Poppins mb-1">
                    Add New Member
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins mb-6">
                    Assign an existing user a new role.
                  </p>

                  {/* Email input */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-Poppins mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter user email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg text-sm font-Poppins
                                 border border-gray-200 dark:border-white/10
                                 bg-gray-50 dark:bg-slate-700
                                 text-gray-900 dark:text-white
                                 placeholder-gray-400 dark:placeholder-gray-500
                                 outline-none focus:border-teal-500
                                 transition-colors duration-200"
                    />
                  </div>

                  {/* Role select */}
                  <div className="mb-6">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-Poppins mb-2">
                      Role
                    </label>
                    <select
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg text-sm font-Poppins
                                 border border-gray-200 dark:border-white/10
                                 bg-gray-50 dark:bg-slate-700
                                 text-gray-900 dark:text-white
                                 outline-none focus:border-teal-500
                                 transition-colors duration-200"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 dark:bg-white/10 mb-5" />

                  {/* Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActive(false)}
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
                      onClick={() => updateUserRole({ email, role })}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium font-Poppins
                                 bg-teal-500 hover:bg-teal-600
                                 text-white transition-all duration-200"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
          )}

          {/* ── Delete Modal ── */}
          {open && (
            <Modal open={open} onClose={() => setOpen(false)}>
              <Box
                sx={modalBoxSx}
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
                    Delete User
                  </h2>

                  {/* Message */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins leading-relaxed">
                    Are you sure you want to delete this user? This action
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
                      onClick={() => deleteUser(userId)}
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

export default AllUsers;
