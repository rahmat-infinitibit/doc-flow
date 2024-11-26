import React, { useState } from 'react';
import { 
  Activity,
  Download,
  Filter,
  Search,
  Calendar,
  User,
  FileText,
  Settings,
  Database,
  MessageSquare,
  CheckSquare,
  AlertTriangle,
} from 'lucide-react';
import { Menu } from '@headlessui/react';
import { format } from 'date-fns';

interface ActivityLogEntry {
  id: string;
  action: string;
  description: string;
  category: 'document' | 'system' | 'user' | 'validation' | 'chat' | 'knowledge';
  timestamp: string;
  user: {
    name: string;
    email: string;
  };
  metadata?: Record<string, any>;
}

const mockActivities: ActivityLogEntry[] = [
  {
    id: '1',
    action: 'Document Upload',
    description: 'Uploaded new RFP document "Enterprise Software Requirements.pdf"',
    category: 'document',
    timestamp: '2024-03-15T10:30:00Z',
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    metadata: {
      fileSize: '2.5MB',
      documentType: 'RFP'
    }
  },
  {
    id: '2',
    action: 'Validation Complete',
    description: 'Document validation completed successfully',
    category: 'validation',
    timestamp: '2024-03-15T09:15:00Z',
    user: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com'
    },
    metadata: {
      documentId: 'DOC-2024-001',
      standardsChecked: 15
    }
  },
  {
    id: '3',
    action: 'Knowledge Base Update',
    description: 'Added new document to knowledge base',
    category: 'knowledge',
    timestamp: '2024-03-14T16:45:00Z',
    user: {
      name: 'Mike Johnson',
      email: 'mike.j@example.com'
    },
    metadata: {
      relevanceScore: 0.85
    }
  },
  {
    id: '4',
    action: 'Chat Session',
    description: 'AI chat session about proposal requirements',
    category: 'chat',
    timestamp: '2024-03-14T14:30:00Z',
    user: {
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com'
    },
    metadata: {
      duration: '15 minutes',
      messagesCount: 12
    }
  }
];

const getCategoryIcon = (category: ActivityLogEntry['category']) => {
  switch (category) {
    case 'document':
      return <FileText className="h-6 w-6 text-blue-500" />;
    case 'system':
      return <Settings className="h-6 w-6 text-gray-500" />;
    case 'user':
      return <User className="h-6 w-6 text-green-500" />;
    case 'validation':
      return <CheckSquare className="h-6 w-6 text-purple-500" />;
    case 'chat':
      return <MessageSquare className="h-6 w-6 text-yellow-500" />;
    case 'knowledge':
      return <Database className="h-6 w-6 text-indigo-500" />;
    default:
      return <Activity className="h-6 w-6 text-gray-500" />;
  }
};

export default function ActivityLog() {
  const [activities] = useState<ActivityLogEntry[]>(mockActivities);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ActivityLogEntry['category'] | 'all'>('all');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    
    const activityDate = new Date(activity.timestamp);
    const matchesDateRange = 
      (!dateRange.start || activityDate >= new Date(dateRange.start)) &&
      (!dateRange.end || activityDate <= new Date(dateRange.end));

    return matchesSearch && matchesCategory && matchesDateRange;
  });

  const downloadLogs = (format: 'csv' | 'json') => {
    const data = filteredActivities.map(activity => ({
      timestamp: format === 'csv' ? new Date(activity.timestamp).toLocaleString() : activity.timestamp,
      action: activity.action,
      description: activity.description,
      category: activity.category,
      user: activity.user.name,
      email: activity.user.email,
      ...activity.metadata
    }));

    let content: string;
    let mimeType: string;
    let fileName: string;

    if (format === 'csv') {
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(item => Object.values(item).join(','));
      content = [headers, ...rows].join('\n');
      mimeType = 'text/csv';
      fileName = 'activity-log.csv';
    } else {
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json';
      fileName = 'activity-log.json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Log</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            A detailed history of all activities in the system
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
              <Download className="-ml-0.5 mr-1.5 h-4 w-4" />
              Download Log
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => downloadLogs('csv')}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                    >
                      Download as CSV
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => downloadLogs('json')}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                    >
                      Download as JSON
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 sm:px-6 overflow-y-auto h-[calc(100vh-10rem)]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activities..."
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ActivityLogEntry['category'] | 'all')}
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="all">All Categories</option>
              <option value="document">Documents</option>
              <option value="system">System</option>
              <option value="user">Users</option>
              <option value="validation">Validation</option>
              <option value="chat">Chat</option>
              <option value="knowledge">Knowledge Base</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredActivities.map((activity) => (
              <li key={activity.id} className="px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getCategoryIcon(activity.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {activity.action}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(activity.timestamp), 'MMM d, yyyy HH:mm')}</span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {activity.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <User className="mr-1.5 h-4 w-4" />
                        {activity.user.name}
                      </div>
                      {activity.metadata && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {Object.entries(activity.metadata).map(([key, value]) => (
                            <span key={key} className="mr-3">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Activity className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No activities found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
