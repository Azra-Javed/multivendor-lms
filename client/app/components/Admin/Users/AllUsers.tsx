"use client";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";
import Loader from "../../Loader/Loader";
import StyledDataGridContainer from "../Analytics/StyledDataGridContainer";

type Props = {
  isTeam?: boolean;
  isCollapsed: boolean;
};

const AllUsers = ({ isTeam, isCollapsed }: Props) => {
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

  // sidebar width logic
  const sidebarWidth = isCollapsed ? 80 : 260;

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

  const addMemberModalBoxSx = {
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
  };
  return (
    <div className="mt-[80px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          {/* Add member button */}
          {isTeam && (
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setActive(true)}
                className="flex items-center gap-2 mr-4 px-3 sm:px-5 py-2.5 rounded-lg
                           bg-teal-500 hover:bg-teal-600
                           text-white text-xs sm:text-sm font-semibold font-Poppins
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

          {/* Add Member Modal */}
          {active && (
            <Modal open={active} onClose={() => setActive(false)}>
              <Box
                sx={addMemberModalBoxSx}
                className="bg-white dark:bg-slate-800 rounded-2xl
                           border border-gray-200 dark:border-white/10
                           shadow-2xl overflow-hidden"
              >
                <div className="h-1 w-full bg-teal-500" />

                <div className="p-5 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white font-Poppins mb-1">
                    Add New Member
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-Poppins mb-6">
                    Assign an existing user a new role.
                  </p>

                  <div className="mb-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-Poppins mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg text-sm font-Poppins
                                 border border-gray-200 dark:border-white/10
                                 bg-gray-50 dark:bg-slate-700
                                 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-Poppins mb-2">
                      Role
                    </label>

                    <select
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg text-sm font-Poppins
                                 border border-gray-200 dark:border-white/10
                                 bg-gray-50 dark:bg-slate-700
                                 text-gray-900 dark:text-white"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setActive(false)}
                      className="w-full py-2.5 rounded-lg border"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => updateUserRole({ email, role })}
                      className="w-full py-2.5 rounded-lg bg-teal-500 text-white"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
          )}

          {/* DELETE MODAL FIXED */}
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              disablePortal
              slotProps={{
                backdrop: {
                  sx: {
                    zIndex: 1400,
                    backgroundColor: "rgba(0,0,0,0.6)",
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: "fixed",

                  // ALWAYS base center
                  top: { xs: "45%", md: "50%" },
                  left: "55%",
                  transform: "translate(-50%, -50%)",

                  // ONLY apply sidebar shift on desktop
                  "@media (min-width: 768px)": {
                    left: `calc(50% + ${sidebarWidth / 2}px)`,
                    transform: "translate(-50%, -50%)",
                  },
                  width: {
                    xs: "75%",
                    sm: "380px",
                    md: "420px",
                  },

                  maxWidth: "420px",

                  // keep above everything (sidebar + overlays)
                  zIndex: 2000,

                  outline: "none",
                }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-3 sm:p-7 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                    <AiOutlineDelete className="text-gray-500" size={22} />
                  </div>

                  <h2 className="text-lg font-semibold mb-2">Delete User</h2>

                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this user?
                  </p>

                  <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full flex-1 py-2.5 rounded-lg
                       text-sm font-medium font-Poppins
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
                      className="w-full flex-1 py-2.5 rounded-lg
                       text-sm font-medium font-Poppins
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
