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
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardHeader = ({ open = false, setOpen }: Props) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationStatus] = useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = setOpen ? open : internalOpen;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(
      "https://res.cloudinary.com/dwrcdioy5/video/upload/v1765609616/mixkit-happy-bell-alert-601_yiedg4.wav",
    );
    audioRef.current.load();
  }, []);

  const playNotificationSound = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread"),
      );
    }
  }, [data]);

  useEffect(() => {
    const handleNewNotification = () => {
      refetch();
      playNotificationSound();
    };

    socket.on("newNotification", handleNewNotification);

    return () => {
      socket.off("newNotification", handleNewNotification);
    };
  }, [refetch]);

  const handleToggle = () => {
    setOpen ? setOpen(!open) : setInternalOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen ? setOpen(false) : setInternalOpen(false);
  };

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
    refetch();
  };

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

  return (
    <div
      className="w-full flex items-center justify-end px-3 sm:px-6 py-3
                 fixed top-0 right-0 left-0 z-[999]
                 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md
                 border-b border-gray-200 dark:border-white/10"
    >
      <ThemeSwitcher />

      <div className="relative ml-3">
        <button
          onClick={handleToggle}
          className="w-9 h-9 rounded-lg flex items-center justify-center
                     border border-gray-200 dark:border-white/10
                     bg-white dark:bg-slate-800
                     text-gray-600 dark:text-gray-300
                     hover:border-teal-500 hover:text-teal-500
                     transition-all duration-200"
        >
          <IoMdNotificationsOutline className="w-5 h-5" />
        </button>

        {notifications.length > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5
                       w-[18px] h-[18px] rounded-full
                       bg-teal-500 text-white
                       text-[10px] font-semibold flex items-center justify-center"
          >
            {notifications.length}
          </span>
        )}
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[9998]"
            onClick={handleClose}
          />

          <div
            ref={dropdownRef}
            className="fixed top-[70px] right-6 w-[360px]
                       max-h-[80vh] overflow-y-auto
                       rounded-xl border border-gray-200 dark:border-white/10
                       bg-white dark:bg-slate-900 shadow-xl z-[10000]"
          >
            <div className="px-5 py-4 border-b border-gray-100 dark:border-white/10 flex justify-between">
              <h5 className="text-sm font-semibold">Notifications</h5>
              <span className="text-xs text-teal-500">
                {notifications.length} unread
              </span>
            </div>

            {notifications.length === 0 && (
              <div className="py-10 text-center text-gray-500">
                No new notifications
              </div>
            )}

            {notifications.map((item: any) => (
              <div
                key={item._id}
                className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <div className="flex justify-between">
                  <p className="font-semibold text-sm">{item.title}</p>

                  <button
                    onClick={() => handleNotificationStatusChange(item._id)}
                    className="text-xs text-teal-500 hover:underline"
                  >
                    Mark read
                  </button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.message}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHeader;
