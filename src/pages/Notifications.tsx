import React, { useState } from 'react';
import { 
  Bell, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Filter,
  MoreVertical,
  Trash2,
  CheckCheck,
} from 'lucide-react';
import { Menu } from '@headlessui/react';
import { useNotifications } from '../context/NotificationContext';
import type { Notification } from '../context/NotificationContext';

export default function Notifications() {
  const { 
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread' | 'document' | 'system'>('all');

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'success':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'system':
        return <Bell className="h-6 w-6 text-purple-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'document':
        return notification.type === 'document';
      case 'system':
        return notification.type === 'system';
      default:
        return true;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex space-x-3">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="all">All notifications</option>
              <option value="unread">Unread</option>
              <option value="document">Documents</option>
              <option value="system">System</option>
            </select>
            <Filter className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckCheck className="-ml-0.5 mr-1.5 h-4 w-4" />
            Mark all as read
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
          {filteredNotifications.map((notification) => (
            <li
              key={notification.id}
              className={`py-5 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
            >
              <div className="relative flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {notification.message}
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="mr-1.5 h-4 w-4" />
                      {formatTimestamp(notification.timestamp)}
                    </div>
                    {notification.actionUrl && (
                      <a
                        href={notification.actionUrl}
                        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                      >
                        View details
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 self-center flex">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800">
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {!notification.read && (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className={`${
                                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                              >
                                <CheckCheck className="mr-3 h-4 w-4" />
                                Mark as read
                              </button>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className={`${
                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } flex w-full items-center px-4 py-2 text-sm text-red-700 dark:text-red-400`}
                            >
                              <Trash2 className="mr-3 h-4 w-4" />
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No notifications</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {filter === 'all'
              ? "You're all caught up!"
              : `No ${filter} notifications at the moment.`}
          </p>
        </div>
      )}
    </div>
  );
}
