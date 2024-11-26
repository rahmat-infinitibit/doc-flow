import React, { useState } from 'react';
import { Database, AlertTriangle, MoreVertical, FileText, Eye, Download, Trash2, MessageSquare } from 'lucide-react';

interface Document {
  id: number;
  title: string;
  category: string;
  lastUsed: string;
  usageCount: number;
  relevanceScore?: number;
  description?: string;
}

interface DocumentCardProps {
  document: Document;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  onChat: (id: number) => void;
}

export default function DocumentCard({ document, onDelete, onView, onChat }: DocumentCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getRelevanceColor = (score?: number) => {
    if (!score) return '';
    if (score >= 0.8) return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
    if (score >= 0.5) return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
    return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
  };

  return (
    <div className="relative flex flex-col bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Database className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {document.title}
              </h3>
              {document.relevanceScore !== undefined && document.relevanceScore < 0.5 && (
                <div className="flex items-center space-x-1 text-yellow-600 dark:text-yellow-400">
                  <AlertTriangle className="h-4 w-4" />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{document.category}</p>
            {document.description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {document.description}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <MoreVertical className="h-5 w-5 text-gray-400" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button
                  onClick={() => onView(document.id)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Eye className="h-4 w-4 mr-3" />
                  View
                </button>
                <button
                  onClick={() => onChat(document.id)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <MessageSquare className="h-4 w-4 mr-3" />
                  Chat
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Download className="h-4 w-4 mr-3" />
                  Download
                </button>
                <button
                  onClick={() => onDelete(document.id)}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Trash2 className="h-4 w-4 mr-3" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {document.relevanceScore !== undefined && (
        <div className={`mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRelevanceColor(document.relevanceScore)}`}>
          Relevance Score: {Math.round(document.relevanceScore * 100)}%
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Used {document.usageCount} times
          </span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Last used {new Date(document.lastUsed).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
