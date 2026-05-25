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
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardHeader = ({ open = false, setOpen }: Props) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [internalOpen, setInternalOpen] = useState(false);

  // Use external state if provided, otherwise local state
  const isOpen = setOpen ? open : internalOpen;

  const handleToggle = () => {
    if (setOpen) {
      setOpen(!open);
    } else {
      setInternalOpen((prev) => !prev);
    }
  };

  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
    } else {
      setInternalOpen(false);
    }
  };

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

    if (audio) {
      audio.load();
    }
  }, [data, isSuccess, audio, refetch]);

  useEffect(() => {
    socketId.on("newNotification", () => {
      refetch();
      playNotificationSound();
    });

    return () => {
      socketId.off("newNotification");
    };
  }, [refetch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div
      className="w-full flex items-center justify-end px-3 sm:px-6 py-3
                 fixed top-0 right-0 left-0 z-[999]
                 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md
                 border-b border-gray-200 dark:border-white/10"
    >
      <ThemeSwitcher />

      {/* Notification bell */}
      <div className="relative ml-3">
        <button
          onClick={handleToggle}
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
      {isOpen && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 h-[100vh] bg-black/40 backdrop-blur-[1px]
                 z-[9998] "
            onClick={handleClose}
          />

          <div
            ref={dropdownRef}
            className="fixed top-[70px]

                left-[56%] -translate-x-1/2
                 sm:left-auto sm:translate-x-0
                 sm:right-6

                 w-[80vw] sm:w-[360px]
                 max-w-[360px]

                 max-h-[80vh] overflow-y-auto

                 rounded-xl border border-gray-200 dark:border-white/10
                 bg-white dark:bg-slate-900
                 shadow-xl z-[10000]"
          >
            <div className="flex flex-col items-end p-3 pb-0">
              {/* CLOSE ICON ONLY SMALL DEVICES */}
              <button
                onClick={handleClose}
                className="sm:hidden text-gray-500 dark:text-gray-400
                       hover:text-black dark:hover:text-white
                       transition-colors duration-200 "
              >
                ✕
              </button>
            </div>
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
                Notifications
              </h5>

              <div className="flex items-center gap-3">
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
                  {/* Title + mark read */}
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
        </>
      )}
    </div>
  );
};

export default DashboardHeader;
