import React, { useState } from 'react';
import { Database, Search, Filter, Plus, AlertTriangle } from 'lucide-react';
import DocumentCard from '../components/knowledge/DocumentCard';
import UploadModal from '../components/knowledge/UploadModal';
import { useNavigate } from 'react-router-dom';

interface Document {
  id: number;
  title: string;
  category: string;
  lastUsed: string;
  usageCount: number;
  relevanceScore?: number;
  description?: string;
}

const mockDocuments: Document[] = [
  {
    id: 1,
    title: 'Enterprise Software RFP Template',
    category: 'Templates',
    lastUsed: '2024-03-10',
    usageCount: 45,
    relevanceScore: 0.95,
    description: 'A comprehensive template for enterprise software RFPs, including sections for technical requirements, pricing, and vendor evaluation.'
  },
  {
    id: 2,
    title: 'Cloud Infrastructure Proposal Example',
    category: 'Examples',
    lastUsed: '2024-03-09',
    usageCount: 32,
    relevanceScore: 0.45,
    description: 'Example proposal for cloud infrastructure migration project. Warning: Some sections may be outdated.'
  },
  {
    id: 3,
    title: 'Mobile App Development Best Practices',
    category: 'Guidelines',
    lastUsed: '2024-03-08',
    usageCount: 67,
    relevanceScore: 0.88,
    description: 'Guidelines and best practices for mobile app development proposals, including iOS and Android considerations.'
  },
];

export default function KnowledgeStore() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  const handleUpload = async (files: File[], metadata: { category: string; description: string }) => {
    // Simulate upload and processing
    const newDocs: Document[] = files.map((file, index) => ({
      id: Math.max(...documents.map(d => d.id)) + index + 1,
      title: file.name,
      category: metadata.category,
      lastUsed: new Date().toISOString(),
      usageCount: 0,
      description: metadata.description,
      relevanceScore: Math.random() // Simulate relevance score
    }));

    setDocuments(prev => [...prev, ...newDocs]);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this document? This will also remove it from the RAG knowledge base.')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const handleView = (id: number) => {
    // Implement view logic
    console.log('View document:', id);
  };

  const handleChat = (id: number) => {
    navigate('/chat', { state: { documentId: id } });
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(documents.map(doc => doc.category)));
  const lowRelevanceCount = documents.filter(doc => doc.relevanceScore !== undefined && doc.relevanceScore < 0.5).length;

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Knowledge Store
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Access and manage your organization's document templates, examples, and guidelines
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Add Documents
        </button>
      </div>

      {lowRelevanceCount > 0 && (
        <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/30 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Low Relevance Documents
              </h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <p>
                  {lowRelevanceCount} document{lowRelevanceCount > 1 ? 's' : ''} in your knowledge store {lowRelevanceCount > 1 ? 'have' : 'has'} low relevance scores.
                  Consider reviewing or updating {lowRelevanceCount > 1 ? 'them' : 'it'} to maintain knowledge base quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 min-w-0">
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 dark:text-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="Search knowledge base..."
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Filter className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-700 rounded-lg p-4">
          {/* Add filter options here */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Additional filters coming soon...
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onDelete={handleDelete}
            onView={handleView}
            onChat={handleChat}
          />
        ))}
      </div>

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}