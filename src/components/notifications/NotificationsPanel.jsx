// src/components/common/NotificationPanel.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BellIcon } from "@heroicons/react/24/solid";
import { Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { markAllAsReadForRole } from '../../redux/slices/notificationSlice';


const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch();
  const notifications = useSelector((state) =>
    state.notifications.notifications.filter(
      (n) => !n.role || n.role === user.role
    )
  );

  const roleBasedNotifications = notifications.filter(
    (n) => n.role === user.role
  );

  const unreadCount = roleBasedNotifications.filter((n) => !n.read).length;

  const typeColor = {
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => {
  setIsOpen(!isOpen);
  if (!isOpen && unreadCount > 0) {
    dispatch(markAllAsReadForRole(user.role));
  }
}}

        className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <BellIcon className="h-6 w-6 text-gray-600 dark:text-white" />
       {unreadCount > 0 && (
  <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
)}

      </button>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-white">
              Recent Notifications
            </h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {roleBasedNotifications.map((n) => (
                <li
                  key={n.id}
                  className={`p-2 rounded text-sm ${typeColor[n.type] || typeColor.info}`}
                >
                  <div>{n.message}</div>
                  <div className="text-xs text-gray-400">{n.time}</div>
                </li>
              ))}
            </ul>
            {roleBasedNotifications.length === 0 && (
              <p className="text-sm text-gray-400">No notifications yet.</p>
            )}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default NotificationPanel;