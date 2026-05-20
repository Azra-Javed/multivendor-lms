// "use client";
// import { JSX, useEffect, useState } from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import { Box, IconButton, Typography } from "@mui/material";

// import {
//   HomeOutlinedIcon,
//   ArrowForwardIosIcon,
//   ArrowBackIosIcon,
//   PeopleOutlinedIcon,
//   ReceiptOutlinedIcon,
//   BarChartOutlinedIcon,
//   MapOutlinedIcon,
//   GroupsIcon,
//   OndemandVideoIcon,
//   VideoCallIcon,
//   WebIcon,
//   QuizIcon,
//   WysiwygIcon,
//   ManageHistoryIcon,
//   SettingsIcon,
//   ExitToAppIcon,
// } from "./Icon";
// import avatarDefault from "../../../../public/assets/avatar.png";
// import { useSelector } from "react-redux";
// import Link from "next/link";
// import Image from "next/image";
// import { useTheme } from "next-themes";
// import { usePathname } from "next/navigation";

// interface itemProps {
//   title: string;
//   to: string;
//   icon: JSX.Element;
//   selected: string;
//   setSelected: (title: string) => void;
// }

// const Item = ({ title, to, icon, selected, setSelected }: itemProps) => {
//   const pathname = usePathname();
//   // Determine if the current item is active based on path or selected state
//   const isActive = selected === title || pathname === to;

//   return (
//     <Link href={to} style={{ textDecoration: "none" }}>
//       <MenuItem
//         onClick={() => setSelected(title)}
//         icon={icon}
//         //  apply the active class/style
//         active={isActive}
//         className="!text-[16px] !font-Poppins"
//         style={{
//           color: isActive ? "#6870fa" : "inherit",
//         }}
//       >
//         {title}
//       </MenuItem>
//     </Link>
//   );
// };

// const SidebarComponent = () => {
//   const { user } = useSelector((state: any) => state.auth);
//   const [logout, setlogout] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [selected, setSelected] = useState("Dashboard");
//   const [mounted, setMounted] = useState(false);
//   const { theme } = useTheme();
//   const pathname = usePathname();

//   useEffect(() => setMounted(true), []);

//   // Update selected state based on the current path when mounted
//   useEffect(() => {
//     if (mounted) {
//       const items = [
//         { title: "Dashboard", to: "/admin" },
//         { title: "Users", to: "/admin/users" },
//         { title: "Invoices", to: "/admin/invoices" },
//         { title: "Create Course", to: "/admin/create-course" },
//         { title: "Live Courses", to: "/admin/courses" },
//         { title: "Hero", to: "/admin/hero" },
//         { title: "FAQ", to: "/admin/faq" },
//         { title: "Categories", to: "/admin/categories" },
//         { title: "Manage Team", to: "/admin/team" },
//         { title: "Courses Analytics", to: "/admin/courses-analytics" },
//         { title: "Orders Analytics", to: "/admin/orders-analytics" },
//         { title: "Users Analytics", to: "/admin/users-analytics" },
//       ];
//       const currentItem = items.find((item) => item.to === pathname);
//       if (currentItem) {
//         setSelected(currentItem.title);
//       }
//     }
//   }, [mounted, pathname]);

//   if (!mounted) {
//     return null;
//   }

//   const logoutHandler = () => {
//     setlogout(true);
//     // Add actual logout logic here
//   };

//   // Define sidebar styles based on theme
//   const sidebarStyles = {
//     backgroundColor: theme === "dark" ? "#111C43" : "#fff",
//     color: theme === "dark" ? "#ffffffc1" : "#000",
//   };

//   return (
//     // The main wrapper box can keep the overall styling logic
//     <Box
//       className="!bg-white dark:bg-[#111C43]"
//       // Note: The direct use of nested selectors in sx is less effective with v3+.
//       // Custom styles are better applied via the Sidebar component's props or global CSS.
//     >
//       <Sidebar
//         collapsed={isCollapsed}
//         // V3+ uses the 'rootStyles' prop for styling the main container
//         rootStyles={{
//           ...sidebarStyles, // Apply theme-based background and text color
//           position: "fixed",
//           top: 0,
//           left: 0,
//           height: "100vh",
//           zIndex: 99999999999999,
//           // Set width based on collapsed state using standard CSS properties
//           width: isCollapsed ? "80px" : "250px", // Use fixed pixel values for consistency
//           minWidth: isCollapsed ? "80px" : "250px",
//           transition: "width 0.3s ease, min-width 0.3s ease",
//           border: "none", // Remove default border
//         }}
//       >
//         <Menu
//           // Use the menuItemStyles prop for customizing menu items
//           menuItemStyles={{
//             button: ({ level, active, disabled }) => {
//               // Apply hover and active styles here
//               if (level === 0) {
//                 return {
//                   padding: "5px 35px 5px 20px !important",
//                   // Hover style
//                   "&:hover": {
//                     backgroundColor: "transparent !important",
//                     color: "#868dfb !important",
//                   },
//                   // Active style
//                   backgroundColor: active
//                     ? "transparent !important"
//                     : "transparent",
//                   color: active ? "#6870fa !important" : sidebarStyles.color,
//                 };
//               }
//             },
//           }}
//         >
//           {/* LOGO AND MENU ICON */}
//           <MenuItem
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
//             style={{
//               margin: "10px 0 20px 0",
//             }}
//           >
//             {!isCollapsed && (
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 ml="15px"
//               >
//                 <Link href="/" className="block">
//                   <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
//                     ELearning
//                   </h3>
//                 </Link>
//                 <IconButton
//                   onClick={() => setIsCollapsed(!isCollapsed)}
//                   className="inline-block"
//                 >
//                   <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
//                 </IconButton>
//               </Box>
//             )}
//           </MenuItem>

//           {!isCollapsed && (
//             <Box mb="25px">
//               <Box display="flex" justifyContent="center" alignItems="center">
//                 <Image
//                   alt="profile-user"
//                   width={100}
//                   height={100}
//                   src={user.avatar ? user.avatar.url : avatarDefault}
//                   style={{
//                     cursor: "pointer",
//                     borderRadius: "50%",
//                     border: "3px solid #5b6fe6",
//                   }}
//                 />
//               </Box>
//               <Box textAlign="center">
//                 <Typography
//                   variant="h4"
//                   className="!text-[20px] text-black dark:text-[#ffffffc1]"
//                   sx={{ m: "10px 0 0 0" }}
//                 >
//                   {user?.name}
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   sx={{ m: "10px 0 0 0" }}
//                   className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize"
//                 >
//                   - {user?.role}
//                 </Typography>
//               </Box>
//             </Box>
//           )}

//           <Box paddingLeft={isCollapsed ? undefined : "10%"}>
//             <Item
//               title="Dashboard"
//               to="/admin"
//               icon={<HomeOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             {/* DATA SECTION */}
//             <Typography
//               variant="h5"
//               sx={{ m: "15px 0 5px 25px" }}
//               className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
//             >
//               {!isCollapsed && "Data"}
//             </Typography>
//             <Item
//               title="Users"
//               to="/admin/users"
//               icon={<GroupsIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Invoices"
//               to="/admin/invoices"
//               icon={<ReceiptOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             {/* CONTENT SECTION */}
//             <Typography
//               variant="h5"
//               className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
//               sx={{ m: "15px 0 5px 20px" }}
//             >
//               {!isCollapsed && "Content"}
//             </Typography>
//             <Item
//               title="Create Course"
//               to="/admin/create-course"
//               icon={<VideoCallIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Live Courses"
//               to="/admin/courses"
//               icon={<OndemandVideoIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             {/* CUSTOMIZATION SECTION */}
//             <Typography
//               variant="h5"
//               className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
//               sx={{ m: "15px 0 5px 20px" }}
//             >
//               {!isCollapsed && "Customization"}
//             </Typography>
//             <Item
//               title="Hero"
//               to="/admin/hero"
//               icon={<WebIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="FAQ"
//               to="/admin/faq"
//               icon={<QuizIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Categories"
//               to="/admin/categories"
//               icon={<WysiwygIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             {/* CONTROLLERS SECTION */}
//             <Typography
//               variant="h5"
//               className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
//               sx={{ m: "15px 0 5px 20px" }}
//             >
//               {!isCollapsed && "Controllers"}
//             </Typography>
//             <Item
//               title="Manage Team"
//               to="/admin/team"
//               icon={<PeopleOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             {/* ANALYTICS SECTION */}
//             <Typography
//               variant="h6"
//               className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
//               sx={{ m: "15px 0 5px 20px" }}
//             >
//               {!isCollapsed && "Analytics"}
//             </Typography>
//             <Item
//               title="Courses Analytics"
//               to="/admin/courses-analytics"
//               icon={<BarChartOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Orders Analytics"
//               to="/admin/orders-analytics"
//               icon={<MapOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Users Analytics"
//               to="/admin/users-analytics"
//               icon={<ManageHistoryIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             {/* EXTRAS SECTION */}
//             <Typography
//               variant="h6"
//               className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
//               sx={{ m: "15px 0 5px 20px" }}
//             >
//               {!isCollapsed && "Extras"}
//             </Typography>
//             <div onClick={logoutHandler}>
//               <Item
//                 title="Logout"
//                 to="/"
//                 icon={<ExitToAppIcon />}
//                 selected={selected}
//                 setSelected={setSelected}
//               />
//             </div>
//           </Box>
//         </Menu>
//       </Sidebar>
//     </Box>
//   );
// };

// // Export the component with the new name to avoid conflicts if needed,
// // but keep the original export name for module consistency.
// export default SidebarComponent;

"use client";
import { JSX, useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";

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
}

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
  const pathname = usePathname();
  const isActive = selected === title || pathname === to;

  return (
    <Link href={to} style={{ textDecoration: "none" }}>
      <MenuItem
        icon={icon}
        active={isActive}
        onClick={() => setSelected(title)}
        className="!text-[14px] !font-medium !font-Poppins"
        style={{
          color: isActive ? "#6870fa" : "inherit",
        }}
      >
        {title}
      </MenuItem>
    </Link>
  );
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
    <Typography
      variant="caption"
      sx={{ m: "14px 0 6px 16px" }}
      className="uppercase tracking-wider text-[11px] text-gray-500 dark:text-[#ffffffc1]"
    >
      {title}
    </Typography>
  );
};

const SidebarComponent = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

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
    if (currentItem) setSelected(currentItem.title);
  }, [mounted, pathname]);

  if (!mounted) return null;

  const sidebarStyles = {
    backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
    color: theme === "dark" ? "#e5e7eb" : "#111827",
  };

  return (
    <Sidebar
      collapsed={isCollapsed}
      rootStyles={{
        ...sidebarStyles,
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: isCollapsed ? "72px" : "220px",
        minWidth: isCollapsed ? "72px" : "260px",
        transition: "all 0.25s ease",
        border: "none",
        zIndex: 9999,
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active }) =>
            level === 0
              ? {
                  padding: isCollapsed ? "8px 10px" : "8px 16px",
                  fontSize: "14px",
                  borderRadius: "8px",
                  margin: "2px 8px",
                  color: active ? "#6870fa" : sidebarStyles.color,
                  backgroundColor: active
                    ? "rgba(104,112,250,0.12)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(104,112,250,0.08)",
                    color: "#6870fa",
                  },
                }
              : {},
        }}
      >
        {/* LOGO */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
          style={{ margin: "10px 0 16px 0" }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px={2}
            >
              <Link href="/">
                <h3 className="text-[18px] font-semibold tracking-wide dark:text-white">
                  ELearning
                </h3>
              </Link>
              <IconButton onClick={() => setIsCollapsed(true)}>
                <ArrowBackIosIcon className="text-gray-600 dark:text-gray-300" />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {/* USER */}
        {!isCollapsed && (
          <Box mb={2} textAlign="center">
            <Image
              src={user?.avatar?.url || avatarDefault}
              alt="user"
              width={72}
              height={72}
              className="mx-auto rounded-full border-2 border-indigo-500"
            />
            <Typography className="text-[14px] font-medium mt-2 dark:text-white">
              {user?.name}
            </Typography>
            <Typography className="text-[12px] text-gray-500 dark:text-gray-400 capitalize">
              {user?.role}
            </Typography>
          </Box>
        )}

        {/* MENU */}
        <Item
          title="Dashboard"
          to="/admin"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />

        <SectionTitle title="Data" collapsed={isCollapsed} />
        <Item
          title="Users"
          to="/admin/users"
          icon={<GroupsIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Invoices"
          to="/admin/invoices"
          icon={<ReceiptOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />

        <SectionTitle title="Content" collapsed={isCollapsed} />
        <Item
          title="Create Course"
          to="/admin/create-course"
          icon={<VideoCallIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Live Courses"
          to="/admin/courses"
          icon={<OndemandVideoIcon />}
          selected={selected}
          setSelected={setSelected}
        />

        <SectionTitle title="Customization" collapsed={isCollapsed} />
        <Item
          title="Hero"
          to="/admin/hero"
          icon={<WebIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="FAQ"
          to="/admin/faq"
          icon={<QuizIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Categories"
          to="/admin/categories"
          icon={<WysiwygIcon />}
          selected={selected}
          setSelected={setSelected}
        />

        <SectionTitle title="Controllers" collapsed={isCollapsed} />
        <Item
          title="Manage Team"
          to="/admin/team"
          icon={<PeopleOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />

        <SectionTitle title="Analytics" collapsed={isCollapsed} />
        <Item
          title="Courses Analytics"
          to="/admin/courses-analytics"
          icon={<BarChartOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Orders Analytics"
          to="/admin/orders-analytics"
          icon={<MapOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Users Analytics"
          to="/admin/users-analytics"
          icon={<ManageHistoryIcon />}
          selected={selected}
          setSelected={setSelected}
        />

        <SectionTitle title="Extras" collapsed={isCollapsed} />
        <Item
          title="Logout"
          to="/"
          icon={<ExitToAppIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
