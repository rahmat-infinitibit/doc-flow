import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Upload,
  FileText,
  MessageSquare,
  Users,
  Settings as SettingsIcon,
  HelpCircle,
  FileSearch,
  FileOutput,
  LayoutTemplate,
  CheckSquare,
  Database,
  Bell,
  UserCircle,
  Activity,
  Cloud,
  Edit,
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

// Main navigation items
const mainNavigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Upload', href: '/upload', icon: Upload },
  { name: 'Document Parsing', href: '/document-parsing', icon: FileSearch },
  { name: 'Document Validation', href: '/document-validation', icon: CheckSquare },
  { name: 'Proposal Generation', href: '/proposal-generation', icon: FileOutput },
  { name: 'Templates', href: '/templates', icon: LayoutTemplate },
  { name: 'Knowledge Store', href: '/knowledge-store', icon: Database },
  { name: 'InfinitiBit Editor', href: '/editor', icon: Edit },
  { name: 'File Explorer', href: '/file-explorer', icon: FileText },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
];

// Secondary navigation items
const secondaryNavigation = [
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Notifications', href: '/notifications', icon: Bell, showBadge: true },
  { name: 'Activity Log', href: '/activity', icon: Activity },
  { name: 'Profile', href: '/profile', icon: UserCircle },
  { name: 'Salesforce', href: '/salesforce', icon: Cloud },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export default function Sidebar() {
  const location = useLocation();
  const { unreadCount } = useNotifications();

  const renderNavItems = (items: typeof mainNavigation) => (
    <ul role="list" className="-mx-2 space-y-1">
      {items.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <li key={item.name}>
            <Link
              to={item.href}
              className={`
                group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                ${isActive
                  ? 'bg-gray-50 text-indigo-600 dark:bg-gray-800 dark:text-indigo-400'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-gray-800'
                }
              `}
            >
              <item.icon
                className={`h-6 w-6 shrink-0 ${
                  isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                }`}
                aria-hidden="true"
              />
              {item.name}
              {'showBadge' in item && item.showBadge && unreadCount > 0 && (
                <span className="ml-auto inline-flex items-center rounded-full bg-indigo-600 dark:bg-indigo-500 px-2 py-0.5 text-xs font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      {/* Main sidebar container */}
      <div className="flex grow flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        {/* Fixed Logo Section */}
        <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center px-6 bg-white dark:bg-gray-900">
          <FileText className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">Bid Platform</span>
        </div>
        
        {/* Scrollable Navigation Section */}
        <div className="flex-1 px-6">
          <nav className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                {renderNavItems(mainNavigation)}
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">System</div>
                {renderNavItems(secondaryNavigation)}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}