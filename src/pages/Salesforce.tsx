import React, { useState } from 'react';
import { Cloud, RefreshCw, Link2, FileText, Users, Database, Settings as SettingsIcon, ExternalLink } from 'lucide-react';

interface SalesforceConnection {
  status: 'connected' | 'disconnected';
  lastSync: string;
  orgName: string;
  environment: string;
}

interface SalesforceObject {
  name: string;
  count: number;
  lastSync: string;
  icon: React.ElementType;
}

export default function Salesforce() {
  const [connection, setConnection] = useState<SalesforceConnection>({
    status: 'disconnected',
    lastSync: '2024-01-20T10:30:00',
    orgName: 'Your Organization',
    environment: 'Production'
  });

  const [isSyncing, setIsSyncing] = useState(false);

  const salesforceObjects: SalesforceObject[] = [
    { name: 'Opportunities', count: 156, lastSync: '2024-01-20T10:30:00', icon: FileText },
    { name: 'Accounts', count: 89, lastSync: '2024-01-20T10:30:00', icon: Users },
    { name: 'Contacts', count: 342, lastSync: '2024-01-20T10:30:00', icon: Users },
    { name: 'Custom Objects', count: 45, lastSync: '2024-01-20T10:30:00', icon: Database },
  ];

  const handleConnect = () => {
    // TODO: Implement Salesforce OAuth flow
    setConnection(prev => ({
      ...prev,
      status: 'connected'
    }));
  };

  const handleSync = () => {
    setIsSyncing(true);
    // TODO: Implement sync logic
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Connection Status Card */}
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Cloud className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <div className="ml-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  Salesforce Connection
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {connection.status === 'connected' 
                    ? `Connected to ${connection.orgName} (${connection.environment})`
                    : 'Not connected to Salesforce'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {connection.status === 'connected' && (
                <button
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Sync Now'}
                </button>
              )}
              <button
                onClick={handleConnect}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  connection.status === 'connected'
                    ? 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
                    : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <Link2 className="h-4 w-4 mr-2" />
                {connection.status === 'connected' ? 'Disconnect' : 'Connect to Salesforce'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Salesforce Objects Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {salesforceObjects.map((object) => (
          <div
            key={object.name}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <object.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {object.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {object.count}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Last synced: {new Date(object.lastSync).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Settings and Configuration */}
      <div className="mt-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
            <SettingsIcon className="h-5 w-5 mr-2" />
            Integration Settings
          </h3>
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700">
            <dl className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="py-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Salesforce Environment
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 dark:text-white">
                  <span className="flex-grow">{connection.environment}</span>
                  <button className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Change
                  </button>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Auto-Sync Schedule
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 dark:text-white">
                  <span className="flex-grow">Every 6 hours</span>
                  <button className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Configure
                  </button>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  API Version
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 dark:text-white">
                  <span className="flex-grow">v58.0</span>
                  <button className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Update
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="https://login.salesforce.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white dark:bg-gray-800 shadow rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Cloud className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-3 text-gray-900 dark:text-white">Salesforce Login</span>
            <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
          </a>
          <a
            href="https://developer.salesforce.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white dark:bg-gray-800 shadow rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-3 text-gray-900 dark:text-white">Developer Documentation</span>
            <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
          </a>
          <a
            href="https://trailhead.salesforce.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white dark:bg-gray-800 shadow rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-3 text-gray-900 dark:text-white">Trailhead Learning</span>
            <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
