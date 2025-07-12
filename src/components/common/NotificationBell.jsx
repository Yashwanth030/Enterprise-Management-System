import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import notificationsData from "../../data/notifications.json"; // or from Redux

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const unread = notificationsData.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
      >
        <FaBell size={20} />
        {unread > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded p-2 z-50 border dark:border-gray-700">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Notifications</h3>
          <ul className="space-y-1 max-h-60 overflow-y-auto text-sm">
            {notificationsData.slice(0, 5).map((note, i) => (
              <li key={i} className="border-b pb-1 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600">
                {note.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
