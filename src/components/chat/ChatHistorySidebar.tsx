import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, Search, Plus, MoreVertical } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface ChatHistorySidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const mockChatHistory: ChatHistory[] = [
  {
    id: '1',
    title: 'RFP Document Analysis',
    lastMessage: "Here's the analysis of your RFP document...",
    timestamp: '2h ago'
  },
  {
    id: '2',
    title: 'Proposal Review',
    lastMessage: "I've reviewed your proposal and here are my suggestions...",
    timestamp: '1d ago'
  },
  {
    id: '3',
    title: 'Template Creation',
    lastMessage: 'The new template has been created successfully...',
    timestamp: '2d ago'
  }
];

export default function ChatHistorySidebar({ isOpen, onToggle }: ChatHistorySidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const filteredHistory = mockChatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={twMerge(
      'fixed top-0 right-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out z-10',
      isOpen ? 'w-80' : 'w-0'
    )}>
      <div className="h-full flex flex-col">
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-1 rounded-l-md shadow-md"
        >
          {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {isOpen && (
          <>
            {/* Header */}
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Chat History</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* New Chat Button */}
            <button className="mx-4 mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              <Plus size={20} />
              New Chat
            </button>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto mt-4">
              {filteredHistory.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={twMerge(
                    'px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                    selectedChat === chat.id && 'bg-gray-100 dark:bg-gray-700'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <h3 className="font-medium dark:text-white">{chat.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {chat.lastMessage}
                        </p>
                        <span className="text-xs text-gray-400">{chat.timestamp}</span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
