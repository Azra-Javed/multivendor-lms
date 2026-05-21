"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { toast } from "react-hot-toast";
import { styles } from "@/app/styles/styles";
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
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br mt-2 from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 hover:scale-110 shadow-sm"
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

  return (
    <div className="mt-[70px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          {/* ✅ ADD BUTTON (FIXED CHECK) */}
          {isTeam && (
            <div className="flex justify-end mb-4">
              <div
                className={`${styles.button} !w-[200px] !h-[40px] !rounded-lg dark:bg-[#57c7a3] cursor-pointer`}
                onClick={() => setActive(true)}
              >
                Add New Member
              </div>
            </div>
          )}

          {/* DATA GRID */}
          <StyledDataGridContainer>
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
            />
          </StyledDataGridContainer>

          {/* ADD MEMBER MODAL */}
          {active && (
            <Modal open={active} onClose={() => setActive(false)}>
              <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 text-black dark:text-white rounded-lg p-5">
                <h2 className={styles.title}>Add New Member</h2>

                <input
                  className={`${styles.input} mt-4`}
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <select
                  className={`${styles.input} mt-4`}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>

                <div
                  className={`${styles.button} mt-6 cursor-pointer`}
                  onClick={() => updateUserRole({ email, role })}
                >
                  Submit
                </div>
              </Box>
            </Modal>
          )}

          {/* DELETE MODAL */}
          {open && (
            <Modal open={open} onClose={() => setOpen(false)}>
              <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 text-black dark:text-white rounded-lg p-5">
                <h2 className={styles.title}>
                  Are you sure you want to delete this user?
                </h2>

                <div className="flex justify-between mt-6">
                  <div
                    className={`${styles.button} !w-[120px] cursor-pointer`}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </div>

                  <div
                    className={`${styles.button} !w-[120px] bg-red-500 cursor-pointer`}
                    onClick={() => deleteUser(userId)}
                  >
                    Delete
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
