// "use client";

// import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
// import {
//   useGetAllNotificationsQuery,
//   useUpdateNotificationStatusMutation,
// } from "@/redux/features/notifications/notificationApi";
// import { format } from "timeago.js";
// import { useEffect, useRef, useState } from "react";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import socketIO from "socket.io-client";

// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
// const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

// type Props = {
//   open?: boolean;
//   setOpen?: any;
// };

// const DashboardHeader = ({ open, setOpen }: Props) => {
//   const { data, refetch } = useGetAllNotificationsQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });

//   const [updateNotificationStatus, { isSuccess }] =
//     useUpdateNotificationStatusMutation();

//   const [notifications, setNotifications] = useState<any>([]);

//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   const [audio] = useState<any>(
//     typeof window !== "undefined" &&
//       new Audio(
//         "https://res.cloudinary.com/dwrcdioy5/video/upload/v1765609616/mixkit-happy-bell-alert-601_yiedg4.wav"
//       )
//   );

//   const playNotificationSound = () => {
//     audio.play();
//   };

//   useEffect(() => {
//     if (data) {
//       setNotifications(
//         data.notifications.filter((item: any) => item.status === "unread")
//       );
//     }
//     if (isSuccess) {
//       refetch();
//     }
//     audio.load();
//   }, [data, isSuccess, audio]);

//   useEffect(() => {
//     socketId.on("newNotification", () => {
//       refetch();
//       playNotificationSound();
//     });
//   }, []);

//   // OUTSIDE CLICK HANDLER
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };

//     if (open) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [open, setOpen]);

//   const handleNotificationStatusChange = async (id: string) => {
//     await updateNotificationStatus(id);
//   };

//   return (
//     <div className="w-full flex items-center justify-end px-6 py-4 fixed top-0 right-0 z-[999] backdrop-blur-md">
//       <ThemeSwitcher />

//       {/* Notification Icon */}
//       <div
//         className="relative ml-4 cursor-pointer"
//         onClick={() => setOpen(!open)}
//       >
//         <IoMdNotificationsOutline className="text-[26px] text-gray-800 dark:text-gray-200 hover:text-teal-500 transition-colors" />

//         {notifications.length > 0 && (
//           <span className="absolute -top-1.5 -right-1.5 bg-teal-500 text-white w-[18px] h-[18px] rounded-full text-[11px] flex items-center justify-center shadow-md">
//             {notifications.length}
//           </span>
//         )}
//       </div>

//       {/* Notification Panel */}
//       {open && (
//         <div
//           ref={dropdownRef}
//           className="w-[360px] max-h-[65vh] overflow-y-auto absolute top-14 right-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f172a] shadow-2xl"
//         >
//           <h5 className="text-center text-lg font-semibold text-gray-800 dark:text-gray-100 py-4 border-b border-gray-200 dark:border-white/10">
//             Notifications
//           </h5>

//           {notifications.length === 0 && (
//             <p className="text-center py-10 text-gray-500 dark:text-gray-400 text-sm">
//               No new notifications
//             </p>
//           )}

//           {notifications.map((item: any, index: number) => (
//             <div
//               key={index}
//               className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition border-b border-gray-100 dark:border-white/10"
//             >
//               <div className="flex items-center justify-between gap-2">
//                 <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
//                   {item.title}
//                 </p>
//                 <button
//                   className="text-xs text-teal-500 hover:underline"
//                   onClick={() => handleNotificationStatusChange(item._id)}
//                 >
//                   Mark as read
//                 </button>
//               </div>

//               <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                 {item.message}
//               </p>

//               <p className="text-xs text-gray-400 mt-2">
//                 {format(item.createdAt)}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashboardHeader;

"use client";

import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationApi";
import { format } from "timeago.js";
import { useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader = ({ open, setOpen }: Props) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [audio] = useState<any>(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/dwrcdioy5/video/upload/v1765609616/mixkit-happy-bell-alert-601_yiedg4.wav",
      ),
  );

  const playNotificationSound = () => audio.play();

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread"),
      );
    }
    if (isSuccess) refetch();
    audio.load();
  }, [data, isSuccess, audio]);

  useEffect(() => {
    socketId.on("newNotification", () => {
      refetch();
      playNotificationSound();
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div
      className="w-full flex items-center justify-end px-6 py-3
                    fixed top-0 right-0 z-[999]
                    bg-white/80 dark:bg-slate-900/80 backdrop-blur-md
                    border-b border-gray-200 dark:border-white/10"
    >
      <ThemeSwitcher />

      {/* Notification bell */}
      <div className="relative ml-3">
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-lg flex items-center justify-center
                     border border-gray-200 dark:border-white/10
                     bg-white dark:bg-slate-800
                     text-gray-600 dark:text-gray-300
                     hover:border-teal-500 hover:text-teal-500
                     dark:hover:border-teal-500 dark:hover:text-teal-400
                     transition-all duration-200"
        >
          <IoMdNotificationsOutline className="w-5 h-5" />
        </button>

        {/* Unread badge */}
        {notifications.length > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5
                           w-[18px] h-[18px] rounded-full
                           bg-teal-500 text-white
                           text-[10px] font-semibold font-Poppins
                           flex items-center justify-center
                           shadow-sm pointer-events-none"
          >
            {notifications.length}
          </span>
        )}
      </div>

      {/* Notification dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute top-[60px] right-6
                     w-[360px] max-h-[65vh] overflow-y-auto
                     rounded-xl border border-gray-200 dark:border-white/10
                     bg-white dark:bg-slate-900
                     shadow-xl"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
            <h5 className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
              Notifications
            </h5>
            {notifications.length > 0 && (
              <span
                className="text-xs px-2 py-0.5 rounded-full
                               bg-teal-500/10 text-teal-600 dark:text-teal-400
                               font-medium font-Poppins"
              >
                {notifications.length} unread
              </span>
            )}
          </div>

          {/* Empty state */}
          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-3">
                <IoMdNotificationsOutline className="w-6 h-6 text-teal-500" />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white font-Poppins mb-1">
                All caught up
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-Poppins">
                No new notifications right now
              </p>
            </div>
          )}

          {/* Notification list */}
          <div className="divide-y divide-gray-100 dark:divide-white/10">
            {notifications.map((item: any, index: number) => (
              <div
                key={index}
                className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/[0.03]
                           transition-colors duration-150"
              >
                {/* Title + mark as read */}
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins leading-snug">
                    {item.title}
                  </p>
                  <button
                    onClick={() => handleNotificationStatusChange(item._id)}
                    className="text-[11px] text-teal-500 hover:text-teal-600
                               font-medium font-Poppins whitespace-nowrap shrink-0
                               hover:underline transition-colors duration-200"
                  >
                    Mark read
                  </button>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed">
                  {item.message}
                </p>

                {/* Time */}
                <p className="text-xs text-gray-400 dark:text-gray-500 font-Poppins mt-2">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
