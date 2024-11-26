import React, { useState } from 'react';
import { Plus, Search, FileText } from 'lucide-react';
import TemplateEditor, { Template } from '../components/templates/TemplateEditor';

const defaultTemplate: Template = {
  id: '',
  name: '',
  description: '',
  category: 'general',
  sections: [],
};

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Standard RFP Response',
    description: 'A comprehensive template for responding to Request for Proposals',
    category: 'rfp',
    sections: [
      {
        id: '1-1',
        title: 'Executive Summary',
        description: 'Brief overview of the proposal',
        defaultContent: 'Provide a concise summary of your proposal...',
        required: true,
      },
      {
        id: '1-2',
        title: 'Company Background',
        description: 'Information about your company',
        defaultContent: 'Describe your company history, expertise...',
        required: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Quick RFQ Template',
    description: 'Streamlined template for Request for Quotation responses',
    category: 'rfq',
    sections: [
      {
        id: '2-1',
        title: 'Price Breakdown',
        description: 'Detailed cost structure',
        defaultContent: 'List all costs and pricing details...',
        required: true,
      },
    ],
  },
];

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (updatedTemplate: Template) => {
    if (isCreating) {
      const newTemplate = {
        ...updatedTemplate,
        id: Math.random().toString(36).substr(2, 9),
      };
      setTemplates(prev => [...prev, newTemplate]);
      setIsCreating(false);
    } else {
      setTemplates(prev =>
        prev.map(t => (t.id === updatedTemplate.id ? updatedTemplate : t))
      );
    }
    setSelectedTemplate(null);
  };

  const handleDelete = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    setSelectedTemplate(null);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setSelectedTemplate({
      ...defaultTemplate,
      id: Math.random().toString(36).substr(2, 9),
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {selectedTemplate ? (
        <div>
          <div className="mb-6">
            <button
              type="button"
              onClick={() => {
                setSelectedTemplate(null);
                setIsCreating(false);
              }}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ← Back to Templates
            </button>
          </div>
          <TemplateEditor
            template={selectedTemplate}
            onSave={handleSave}
            onDelete={
              !isCreating ? () => handleDelete(selectedTemplate.id) : undefined
            }
            isNew={isCreating}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                Proposal Templates
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage and customize your proposal templates
              </p>
            </div>
            <button
              type="button"
              onClick={handleCreateNew}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Template
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer transition-colors duration-150"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {template.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {template.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    {template.category.toUpperCase()}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {template.sections.length} sections
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
