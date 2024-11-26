import React, { useState } from 'react';
import { FolderOpen, File, ChevronRight, MoreVertical, Plus } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modifiedDate: string;
  children?: FileItem[];
}

const initialFiles: FileItem[] = [
  {
    id: '1',
    name: 'RFPs',
    type: 'folder',
    modifiedDate: '2024-03-10',
    children: [
      {
        id: '1-1',
        name: 'Software Development RFP.docx',
        type: 'file',
        size: '2.5 MB',
        modifiedDate: '2024-03-10',
      },
      {
        id: '1-2',
        name: 'Cloud Infrastructure RFP.pdf',
        type: 'file',
        size: '1.8 MB',
        modifiedDate: '2024-03-09',
      },
    ],
  },
  {
    id: '2',
    name: 'Proposals',
    type: 'folder',
    modifiedDate: '2024-03-09',
    children: [
      {
        id: '2-1',
        name: 'Q1 2024 Proposals',
        type: 'folder',
        modifiedDate: '2024-03-08',
        children: [],
      },
    ],
  },
];

export default function FileExplorer() {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const renderFileItem = (item: FileItem, level: number = 0) => {
    const isExpanded = expandedFolders.has(item.id);
    const paddingLeft = `${level * 1.5 + 1}rem`;

    return (
      <div key={item.id}>
        <div
          className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
          style={{ paddingLeft }}
          onClick={() => item.type === 'folder' && toggleFolder(item.id)}
        >
          <div className="flex-1 flex items-center min-w-0">
            {item.type === 'folder' && (
              <ChevronRight
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  isExpanded ? 'transform rotate-90' : ''
                }`}
              />
            )}
            {item.type === 'folder' ? (
              <FolderOpen className="h-5 w-5 text-gray-400 ml-1" />
            ) : (
              <File className="h-5 w-5 text-gray-400 ml-5" />
            )}
            <span className="ml-2 text-sm text-gray-900 truncate">{item.name}</span>
          </div>
          <div className="flex items-center gap-x-4">
            {item.size && (
              <span className="text-sm text-gray-500">{item.size}</span>
            )}
            <span className="text-sm text-gray-500">
              {new Date(item.modifiedDate).toLocaleDateString()}
            </span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
        {item.type === 'folder' && isExpanded && item.children && (
          <div>
            {item.children.map(child => renderFileItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            File Explorer
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Browse and manage your documents and folders
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New Folder
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm font-medium text-gray-500">
            <span className="ml-6">Name</span>
            <div className="flex items-center gap-x-8 pr-8">
              <span>Size</span>
              <span>Modified</span>
              <span className="w-4"></span>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {initialFiles.map(file => renderFileItem(file))}
        </div>
      </div>
    </div>
  );
}