"use client";

import { IconButton, Tooltip } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";

import {
  ArrowBackIosIcon,
  ArrowForwardIosIcon,
  BarChartOutlinedIcon,
  ExitToAppIcon,
  GroupsIcon,
  HomeOutlinedIcon,
  ManageHistoryIcon,
  MapOutlinedIcon,
  OndemandVideoIcon,
  ReceiptOutlinedIcon,
  VideoCallIcon,
} from "./Icon";

import avatarDefault from "../../../../public/assets/avatar.png";

import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  isCollapsed: boolean;
}

const Item = ({ title, to, icon, isCollapsed }: ItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  const content = (
    <Link href={to} className="no-underline">
      <MenuItem icon={icon} active={isActive}>
        {!isCollapsed && title}
      </MenuItem>
    </Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip
        title={title}
        placement="right"
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: "#111827",
              color: "#fff",
              fontSize: "13px",
              borderRadius: "10px",
              padding: "8px 12px",
            },
          },
        }}
      >
        <div>{content}</div>
      </Tooltip>
    );
  }

  return content;
};

const SectionTitle = ({
  title,
  collapsed,
}: {
  title: string;
  collapsed: boolean;
}) => {
  if (collapsed) return null;

  return (
    <p className="px-5 pt-5 pb-2 text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold font-Poppins">
      {title}
    </p>
  );
};

const SidebarComponent = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      sessionStorage.clear();

      await signOut({ redirect: false });

      router.push("/");
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  if (!mounted) return null;

  return (
    <Sidebar
      collapsed={isCollapsed}
      rootStyles={{
        backgroundColor: isDark ? "#0B1120" : "#ffffff",
        borderRight: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid #e5e7eb",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 9999,
        transition: "all 0.3s ease",
        width: isCollapsed ? "82px" : "255px",
        minWidth: isCollapsed ? "82px" : "255px",
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            padding: isCollapsed ? "13px 0px" : "12px 16px",
            justifyContent: isCollapsed ? "center" : "flex-start",
            borderRadius: "12px",
            margin: "4px 10px",
            fontSize: "14px",
            fontWeight: active ? 600 : 500,
            fontFamily: "Poppins",
            color: active ? "#14b8a6" : isDark ? "#ffffff" : "#0f172a",
            backgroundColor: active
              ? isDark
                ? "rgba(20,184,166,0.15)"
                : "#ccfbf1"
              : "transparent",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
              color: "#14b8a6",
            },
          }),
          icon: ({ active }) => ({
            color: active ? "#14b8a6" : isDark ? "#ffffff" : "#64748b",
            minWidth: "34px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }),
        }}
      >
        {/* HEADER */}
        <div
          className={`flex items-center py-4 px-4 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && (
            <Link
              href="/"
              className={`text-[24px] font-[700] font-Poppins ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              E<span className="text-teal-500">Learning</span>
            </Link>
          )}

          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? (
              <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
            ) : (
              <ArrowBackIosIcon sx={{ fontSize: 14 }} />
            )}
          </IconButton>
        </div>

        <div className="h-[1px] bg-white/5 mx-4 mb-3" />

        {/* USER */}
        {!isCollapsed && (
          <Link href="/profile">
            <div
              className={`mx-3 mb-4 rounded-xl px-3 py-3 border ${
                isDark ? "border-slate-700" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={user?.avatar?.url || avatarDefault}
                  alt="user"
                  width={44}
                  height={44}
                  className="rounded-full object-cover border border-teal-500"
                />

                <div>
                  <p
                    className={`text-[14px] font-semibold ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    {user?.name}
                  </p>
                  <p className="text-[12px] text-slate-500 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* MENU */}
        <Item
          title="Dashboard"
          to="/admin"
          icon={<HomeOutlinedIcon sx={{ fontSize: 20 }} />}
          isCollapsed={isCollapsed}
        />

        <SectionTitle title="Data" collapsed={isCollapsed} />

        <Item
          title="Users"
          to="/admin/users"
          icon={<GroupsIcon sx={{ fontSize: 20 }} />}
          isCollapsed={isCollapsed}
        />

        <Item
          title="Invoices"
          to="/admin/invoices"
          icon={<ReceiptOutlinedIcon sx={{ fontSize: 20 }} />}
          isCollapsed={isCollapsed}
        />

        <SectionTitle title="Content" collapsed={isCollapsed} />

        <Item
          title="Create Course"
          to="/admin/create-course"
          icon={<VideoCallIcon sx={{ fontSize: 20 }} />}
          isCollapsed={isCollapsed}
        />

        <Item
          title="Live Courses"
          to="/admin/courses"
          icon={<OndemandVideoIcon sx={{ fontSize: 20 }} />}
          isCollapsed={isCollapsed}
        />

        <SectionTitle title="Analytics" collapsed={isCollapsed} />

        <Item
          title="Courses Analytics"
          to="/admin/courses-analytics"
          icon={<BarChartOutlinedIcon sx={{ fontSize: 20 }} />}
          isCollapsed={isCollapsed}
        />

        <Item
          title="Orders Analytics"
          to="/admin/orders-analytics"
          icon={<MapOutlinedIcon sx={{ fontSize: 20 }} />}
          isCollapsed={isCollapsed}
        />

        <Item
          title="Users Analytics"
          to="/admin/users-analytics"
          icon={<ManageHistoryIcon sx={{ fontSize: 20 }} />}
          isCollapsed={isCollapsed}
        />

        <SectionTitle title="Extras" collapsed={isCollapsed} />

        <MenuItem
          icon={<ExitToAppIcon sx={{ fontSize: 20 }} />}
          onClick={handleLogout}
        >
          {!isCollapsed && "Logout"}
        </MenuItem>

        <div className="h-5" />
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
