import React, { useState } from 'react';
import { Bell, Lock, User, Globe, Database, Save, Cloud, FileText, Keyboard, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const settings = [
  {
    id: 'profile',
    name: 'Profile Settings',
    icon: User,
    description: 'Manage your account information and preferences',
    items: [
      { id: 'name', label: 'Full Name', type: 'text', value: 'John Doe' },
      { id: 'email', label: 'Email Address', type: 'email', value: 'john@example.com' },
      { id: 'role', label: 'Role', type: 'text', value: 'Project Manager', disabled: true },
      { id: 'phone', label: 'Phone Number', type: 'tel', value: '+1 (555) 123-4567' },
      { id: 'company', label: 'Company', type: 'text', value: 'Tech Solutions Inc.' },
    ],
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    description: 'Configure how you receive notifications',
    items: [
      { id: 'email_notifications', label: 'Email Notifications', type: 'checkbox', checked: true },
      { id: 'document_updates', label: 'Document Updates', type: 'checkbox', checked: true },
      { id: 'team_mentions', label: 'Team Mentions', type: 'checkbox', checked: true },
      { id: 'proposal_alerts', label: 'Proposal Alerts', type: 'checkbox', checked: true },
      { id: 'chat_messages', label: 'Chat Messages', type: 'checkbox', checked: true },
      { id: 'system_updates', label: 'System Updates', type: 'checkbox', checked: false },
    ],
  },
  {
    id: 'security',
    name: 'Security',
    icon: Lock,
    description: 'Manage your security preferences and authentication settings',
    items: [
      { id: 'two_factor', label: 'Two-factor Authentication', type: 'checkbox', checked: false },
      { id: 'password', label: 'Change Password', type: 'button', action: 'Change' },
      { id: 'sessions', label: 'Active Sessions', type: 'button', action: 'View' },
      { id: 'api_keys', label: 'API Keys', type: 'button', action: 'Manage' },
      { id: 'login_history', label: 'Login History', type: 'button', action: 'View' },
    ],
  },
  {
    id: 'system',
    name: 'System',
    icon: Globe,
    description: 'System-wide settings and preferences',
    items: [
      { id: 'language', label: 'Language', type: 'select', options: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'] },
      { id: 'timezone', label: 'Timezone', type: 'select', options: ['UTC', 'EST', 'CST', 'PST', 'GMT', 'IST'] },
      { 
        id: 'theme', 
        label: 'Theme', 
        type: 'select', 
        options: ['Light', 'Dark', 'System'],
        value: 'Light',
        onChange: () => {},
      },
      { id: 'date_format', label: 'Date Format', type: 'select', options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'] },
    ],
  },
  {
    id: 'documents',
    name: 'Document Settings',
    icon: FileText,
    description: 'Configure document handling and processing preferences',
    items: [
      { id: 'default_template', label: 'Default Template', type: 'select', options: ['Basic', 'Professional', 'Technical'] },
      { id: 'auto_save', label: 'Auto-save Documents', type: 'checkbox', checked: true },
      { id: 'version_history', label: 'Keep Version History', type: 'checkbox', checked: true },
      { id: 'pdf_quality', label: 'PDF Export Quality', type: 'select', options: ['Draft', 'Standard', 'High'] },
    ],
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: Cloud,
    description: 'Manage external service connections and APIs',
    items: [
      { id: 'salesforce', label: 'Salesforce Integration', type: 'checkbox', checked: true },
      { id: 'google_drive', label: 'Google Drive', type: 'checkbox', checked: false },
      { id: 'ms_teams', label: 'Microsoft Teams', type: 'checkbox', checked: false },
      { id: 'slack', label: 'Slack', type: 'checkbox', checked: true },
    ],
  },
  {
    id: 'appearance',
    name: 'Appearance',
    icon: Monitor,
    description: 'Customize the look and feel of your workspace',
    items: [
      { id: 'sidebar_position', label: 'Sidebar Position', type: 'select', options: ['Left', 'Right'] },
      { id: 'compact_view', label: 'Compact View', type: 'checkbox', checked: false },
      { id: 'font_size', label: 'Font Size', type: 'select', options: ['Small', 'Medium', 'Large'] },
      { id: 'show_avatars', label: 'Show User Avatars', type: 'checkbox', checked: true },
    ],
  },
  {
    id: 'shortcuts',
    name: 'Keyboard Shortcuts',
    icon: Keyboard,
    description: 'Customize keyboard shortcuts for quick access',
    items: [
      { id: 'enable_shortcuts', label: 'Enable Keyboard Shortcuts', type: 'checkbox', checked: true },
      { id: 'custom_shortcuts', label: 'Custom Shortcuts', type: 'button', action: 'Configure' },
      { id: 'shortcuts_list', label: 'View All Shortcuts', type: 'button', action: 'View' },
    ],
  },
];

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(darkMode ? 'Dark' : 'Light');
  const [hasChanges, setHasChanges] = useState(false);

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    setHasChanges(true);
    if (theme === 'System') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark !== darkMode) {
        toggleDarkMode();
      }
    } else {
      const shouldBeDark = theme === 'Dark';
      if (shouldBeDark !== darkMode) {
        toggleDarkMode();
      }
    }
  };

  const handleInputChange = () => {
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // TODO: Implement save logic
    setHasChanges(false);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Settings
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>
          {hasChanges && (
            <button
              onClick={handleSaveChanges}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {settings.map((section) => (
            <div
              key={section.id}
              className="bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
            >
              <div className="px-4 py-6 sm:p-8">
                <div className="flex items-center gap-x-3">
                  <section.icon className="h-6 w-6 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                      {section.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">{section.description}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-x-6">
                      <label
                        htmlFor={item.id}
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        {item.label}
                      </label>
                      {item.type === 'checkbox' ? (
                        <button
                          type="button"
                          role="switch"
                          aria-checked={item.checked}
                          onClick={() => handleInputChange()}
                          className={`${
                            item.checked ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'
                          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              item.checked ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-200 shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      ) : item.type === 'select' ? (
                        <select
                          id={item.id}
                          value={item.id === 'theme' ? selectedTheme : item.value}
                          onChange={(e) => {
                            if (item.id === 'theme') {
                              handleThemeChange(e.target.value);
                            } else {
                              handleInputChange();
                            }
                          }}
                          className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {item.options?.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      ) : item.type === 'button' ? (
                        <button
                          type="button"
                          onClick={() => handleInputChange()}
                          className="rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          {item.action}
                        </button>
                      ) : (
                        <input
                          type={item.type}
                          id={item.id}
                          defaultValue={item.value}
                          disabled={item.disabled}
                          onChange={handleInputChange}
                          className="block w-full max-w-md rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}