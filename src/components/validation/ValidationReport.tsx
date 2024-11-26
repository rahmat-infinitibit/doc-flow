import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, AlertCircle } from 'lucide-react';

export interface ValidationItem {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  section?: string;
  page?: number;
  details?: string;
  failedStandards?: {
    id: string;
    name: string;
    category: string;
  }[];
}

interface ValidationReportProps {
  items: ValidationItem[];
  onItemClick?: (item: ValidationItem) => void;
}

export default function ValidationReport({ items, onItemClick }: ValidationReportProps) {
  const getIcon = (type: ValidationItem['type']) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
  };

  const getBgColor = (type: ValidationItem['type']) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20';
    }
  };

  const getBorderColor = (type: ValidationItem['type']) => {
    switch (type) {
      case 'error':
        return 'border-red-200 dark:border-red-800';
      case 'warning':
        return 'border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'border-blue-200 dark:border-blue-800';
      case 'success':
        return 'border-green-200 dark:border-green-800';
    }
  };

  const getTextColor = (type: ValidationItem['type']) => {
    switch (type) {
      case 'error':
        return 'text-red-700 dark:text-red-200';
      case 'warning':
        return 'text-yellow-700 dark:text-yellow-200';
      case 'info':
        return 'text-blue-700 dark:text-blue-200';
      case 'success':
        return 'text-green-700 dark:text-green-200';
    }
  };

  const stats = {
    error: items.filter(item => item.type === 'error').length,
    warning: items.filter(item => item.type === 'warning').length,
    info: items.filter(item => item.type === 'info').length,
    success: items.filter(item => item.type === 'success').length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(stats).map(([type, count]) => (
          <div
            key={type}
            className={`${getBgColor(type as ValidationItem['type'])} ${getBorderColor(
              type as ValidationItem['type']
            )} border rounded-lg p-4`}
          >
            <div className="flex items-center">
              {getIcon(type as ValidationItem['type'])}
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${getTextColor(
                    type as ValidationItem['type']
                  )}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}s
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {count}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => onItemClick?.(item)}
              className={`${getBgColor(
                item.type
              )} p-4 hover:bg-opacity-75 cursor-pointer transition-colors duration-150`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 pt-1">{getIcon(item.type)}</div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium ${getTextColor(item.type)}`}
                  >
                    {item.message}
                  </p>
                  {(item.section || item.page) && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {item.section && `Section: ${item.section}`}
                      {item.section && item.page && ' | '}
                      {item.page && `Page: ${item.page}`}
                    </p>
                  )}
                  {item.details && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {item.details}
                    </p>
                  )}
                  {item.failedStandards && item.failedStandards.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Failed Standards:
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {item.failedStandards.map((standard) => (
                          <span
                            key={standard.id}
                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium
                              ${standard.category === 'industry' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              standard.category === 'government' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                              standard.category === 'internal' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}
                          >
                            {standard.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
