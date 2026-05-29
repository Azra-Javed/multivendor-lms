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
  PeopleOutlinedIcon,
  QuizIcon,
  ReceiptOutlinedIcon,
  VideoCallIcon,
  WebIcon,
  WysiwygIcon,
} from "./Icon";

import avatarDefault from "../../../../public/assets/avatar.png";

import { useLogout } from "@/app/hooks/useLogout";
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

interface SidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

const Item = ({ title, to, icon, isCollapsed }: ItemProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === to || (to !== "/admin" && pathname.startsWith(to + "/"));

  const content = (
    <Link href={to} className="no-underline">
      <MenuItem active={isActive} icon={icon}>
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

const SidebarComponent = ({ onCollapsedChange }: SidebarProps) => {
  const { user } = useSelector((state: any) => state.auth);

  const [mounted, setMounted] = useState(false);
  const logout = useLogout();

  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }

    return false;
  });
  const router = useRouter();

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("admin-sidebar-collapsed", String(isCollapsed));

    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  if (!mounted) return null;

  return (
    <Sidebar
      collapsed={isCollapsed}
      width="260px"
      collapsedWidth={
        typeof window !== "undefined" && window.innerWidth >= 1024
          ? "82px"
          : "58px"
      }
      transitionDuration={300}
      backgroundColor={isDark ? "#0B1120" : "#ffffff"}
      rootStyles={{
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

        "& .ps-sidebar-container": {
          paddingLeft: "0px",
          paddingRight: "0px",
          marginLeft: "0px",
          marginRight: "0px",
        },

        "& .ps-menu-root": {
          paddingLeft: "0px",
          paddingRight: "0px",
          marginLeft: "0px",
          marginRight: "0px",
        },
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            height: isCollapsed ? "58px" : "50px",

            padding: isCollapsed ? "0px" : "0px 16px",

            justifyContent: isCollapsed ? "center" : "flex-start",

            borderRadius: "14px",

            margin: isCollapsed ? "5px 6px" : "5px 10px",

            fontSize: "14px",

            fontWeight: active ? 700 : 500,

            fontFamily: "Poppins",

            color: active ? "#14b8a6" : isDark ? "#ffffff" : "#0f172a",

            backgroundColor: active
              ? isDark
                ? "rgba(20,184,166,0.18)"
                : "#ccfbf1"
              : "transparent",

            border: active
              ? "1px solid rgba(20,184,166,0.25)"
              : "1px solid transparent",

            transition: "all 0.2s ease",

            "&:hover": {
              backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",

              color: "#14b8a6",
            },

            "@media (max-width: 768px)": {
              height: isCollapsed ? "50px" : "46px",

              margin: isCollapsed ? "4px" : "4px 8px",

              fontSize: "13px",
            },
          }),

          icon: ({ active }) => ({
            color: active ? "#14b8a6" : isDark ? "#ffffff" : "#64748b",

            minWidth: isCollapsed ? "100%" : "36px",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            "& svg": {
              fontSize: isCollapsed ? "25px" : "20px",
            },

            "@media (max-width: 768px)": {
              "& svg": {
                fontSize: isCollapsed ? "20px" : "18px",
              },
            },
          }),
        }}
      >
        {/* STICKY HEADER */}
        <div
          className={`sticky top-0 z-50 border-b ${
            isDark ? "bg-[#0B1120] border-white/5" : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`flex items-center py-4 ${
              isCollapsed ? "justify-center px-2" : "justify-between px-4"
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

            <IconButton
              onClick={handleToggle}
              sx={{
                padding: isCollapsed ? "4px" : "8px",
                color: isDark ? "#ffffff" : "#111827",
              }}
            >
              {isCollapsed ? (
                <ArrowForwardIosIcon sx={{ fontSize: 15 }} />
              ) : (
                <ArrowBackIosIcon sx={{ fontSize: 15 }} />
              )}
            </IconButton>
          </div>
        </div>

        {/* USER */}
        {!isCollapsed && (
          <Link href="/profile">
            <div
              className={`mx-3 mt-4 mb-4 rounded-2xl px-3 py-3 border ${
                isDark
                  ? "border-slate-700 bg-slate-900/40"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={user?.avatar?.url || avatarDefault}
                  alt="user"
                  width={46}
                  height={46}
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
        <div className="pb-6">
          <Item
            title="Dashboard"
            to="/admin"
            icon={<HomeOutlinedIcon />}
            isCollapsed={isCollapsed}
          />

          <SectionTitle title="Data" collapsed={isCollapsed} />

          <Item
            title="Users"
            to="/admin/users"
            icon={<GroupsIcon />}
            isCollapsed={isCollapsed}
          />

          <Item
            title="Invoices"
            to="/admin/invoices"
            icon={<ReceiptOutlinedIcon />}
            isCollapsed={isCollapsed}
          />

          <SectionTitle title="Content" collapsed={isCollapsed} />

          <Item
            title="Create Course"
            to="/admin/create-course"
            icon={<VideoCallIcon />}
            isCollapsed={isCollapsed}
          />

          <Item
            title="Live Courses"
            to="/admin/courses"
            icon={<OndemandVideoIcon />}
            isCollapsed={isCollapsed}
          />

          <SectionTitle title="Customization" collapsed={isCollapsed} />

          <Item
            title="Hero"
            to="/admin/hero"
            icon={<WebIcon />}
            isCollapsed={isCollapsed}
          />

          <Item
            title="FAQ"
            to="/admin/faq"
            icon={<QuizIcon />}
            isCollapsed={isCollapsed}
          />

          <Item
            title="Categories"
            to="/admin/categories"
            icon={<WysiwygIcon />}
            isCollapsed={isCollapsed}
          />

          <SectionTitle title="Controllers" collapsed={isCollapsed} />

          <Item
            title="Manage Team"
            to="/admin/team"
            icon={<PeopleOutlinedIcon />}
            isCollapsed={isCollapsed}
          />
          <SectionTitle title="Analytics" collapsed={isCollapsed} />

          <Item
            title="Courses Analytics"
            to="/admin/courses-analytics"
            icon={<BarChartOutlinedIcon />}
            isCollapsed={isCollapsed}
          />

          <Item
            title="Orders Analytics"
            to="/admin/orders-analytics"
            icon={<MapOutlinedIcon />}
            isCollapsed={isCollapsed}
          />

          <Item
            title="Users Analytics"
            to="/admin/users-analytics"
            icon={<ManageHistoryIcon />}
            isCollapsed={isCollapsed}
          />

          <SectionTitle title="Extras" collapsed={isCollapsed} />

          <MenuItem icon={<ExitToAppIcon />} onClick={logout}>
            {!isCollapsed && "Logout"}
          </MenuItem>
        </div>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
