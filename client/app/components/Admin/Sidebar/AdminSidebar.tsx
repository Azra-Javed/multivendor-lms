"use client";

import { JSX, useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { IconButton, Tooltip } from "@mui/material";

import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  ExitToAppIcon,
} from "./Icon";

import avatarDefault from "../../../../public/assets/avatar.png";

import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (title: string) => void;
  isCollapsed: boolean;
}

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  isCollapsed,
}: ItemProps) => {
  const pathname = usePathname();

  const isActive = selected === title || pathname === to;

  const item = (
    <Link href={to} className="no-underline">
      <MenuItem
        icon={icon}
        active={isActive}
        onClick={() => setSelected(title)}
      >
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
        enterDelay={100}
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: "#111827",
              color: "#fff",
              fontSize: "13px",
              fontFamily: "Poppins",
              borderRadius: "10px",
              padding: "8px 12px",
            },
          },
          arrow: {
            sx: {
              color: "#111827",
            },
          },
        }}
      >
        <div>{item}</div>
      </Tooltip>
    );
  }

  return item;
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
    <p
      className="px-5 pt-5 pb-2 text-[10px] uppercase tracking-[0.25em]
      text-slate-500 font-semibold font-Poppins"
    >
      {title}
    </p>
  );
};

const SidebarComponent = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const items = [
      { title: "Dashboard", to: "/admin" },
      { title: "Users", to: "/admin/users" },
      { title: "Invoices", to: "/admin/invoices" },
      { title: "Create Course", to: "/admin/create-course" },
      { title: "Live Courses", to: "/admin/courses" },
      { title: "Hero", to: "/admin/hero" },
      { title: "FAQ", to: "/admin/faq" },
      { title: "Categories", to: "/admin/categories" },
      { title: "Manage Team", to: "/admin/team" },
      { title: "Courses Analytics", to: "/admin/courses-analytics" },
      { title: "Orders Analytics", to: "/admin/orders-analytics" },
      { title: "Users Analytics", to: "/admin/users-analytics" },
    ];

    const currentItem = items.find((item) => item.to === pathname);

    if (currentItem) {
      setSelected(currentItem.title);
    }
  }, [mounted, pathname]);

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
              className={`text}-[24px] font-[700] font-Poppins ${isDark ? "text-white" : "text-[#000]"}`}
            >
              E<span className="text-teal-500">Learning</span>
            </Link>
          )}

          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            size="small"
            className={`${
              isDark
                ? "bg-white/5 border border-white/10 text-white"
                : "bg-slate-100 border border-slate-200 text-slate-700"
            }`}
          >
            {isCollapsed ? (
              <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
            ) : (
              <ArrowBackIosIcon sx={{ fontSize: 14 }} />
            )}
          </IconButton>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/5 mx-4 mb-3" />

        {/* USER CARD */}

        {!isCollapsed && (
          <div
            className={`mx-3 mb-4 rounded-xl px-3 py-3 border transition-all duration-300
    ${isDark ? " border-slate-400 bg-transparent" : "bg-white border-slate-200"}`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={user?.avatar?.url || avatarDefault}
                alt="user"
                width={44}
                height={44}
                className="rounded-full object-cover border border-teal-500"
              />

              <div className="min-w-0">
                <p
                  className={`text-[14px] font-semibold truncate font-Poppins
          ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  {user?.name}
                </p>

                <p
                  className={`text-[12px] capitalize font-Poppins
          ${isDark ? "text-white" : "text-slate-500"}`}
                >
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* COLLAPSED AVATAR */}
        {isCollapsed && (
          <div className="flex justify-center mb-4">
            <Image
              src={user?.avatar?.url || avatarDefault}
              alt="user"
              width={40}
              height={40}
              className="rounded-full border-2 border-teal-500 object-cover"
            />
          </div>
        )}

        {/* MENU ITEMS */}

        <Item
          title="Dashboard"
          to="/admin"
          icon={<HomeOutlinedIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <SectionTitle title="Data" collapsed={isCollapsed} />

        <Item
          title="Users"
          to="/admin/users"
          icon={<GroupsIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <Item
          title="Invoices"
          to="/admin/invoices"
          icon={<ReceiptOutlinedIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <SectionTitle title="Content" collapsed={isCollapsed} />

        <Item
          title="Create Course"
          to="/admin/create-course"
          icon={<VideoCallIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <Item
          title="Live Courses"
          to="/admin/courses"
          icon={<OndemandVideoIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <SectionTitle title="Customization" collapsed={isCollapsed} />

        <Item
          title="Hero"
          to="/admin/hero"
          icon={<WebIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <Item
          title="FAQ"
          to="/admin/faq"
          icon={<QuizIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <Item
          title="Categories"
          to="/admin/categories"
          icon={<WysiwygIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <SectionTitle title="Controllers" collapsed={isCollapsed} />

        <Item
          title="Manage Team"
          to="/admin/team"
          icon={<PeopleOutlinedIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <SectionTitle title="Analytics" collapsed={isCollapsed} />

        <Item
          title="Courses Analytics"
          to="/admin/courses-analytics"
          icon={<BarChartOutlinedIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <Item
          title="Orders Analytics"
          to="/admin/orders-analytics"
          icon={<MapOutlinedIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <Item
          title="Users Analytics"
          to="/admin/users-analytics"
          icon={<ManageHistoryIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <SectionTitle title="Extras" collapsed={isCollapsed} />

        <Item
          title="Logout"
          to="/"
          icon={<ExitToAppIcon sx={{ fontSize: 20 }} />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />

        <div className="h-5" />
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
