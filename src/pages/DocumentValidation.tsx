import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, FileSearch } from 'lucide-react';
import ValidationReport, { ValidationItem } from '../components/validation/ValidationReport';
import ValidationReferences, { ValidationStandard } from '../components/validation/ValidationReferences';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

// Mock documents data
const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'RFP-2023-001.pdf',
    type: 'PDF',
    uploadDate: '2023-10-15',
    size: '2.5 MB',
  },
  {
    id: '2',
    name: 'Technical-Requirements.docx',
    type: 'DOCX',
    uploadDate: '2023-10-14',
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'Project-Timeline.pdf',
    type: 'PDF',
    uploadDate: '2023-10-13',
    size: '500 KB',
  },
];

// Mock validation standards
const mockStandards: ValidationStandard[] = [
  {
    id: 'iso-9001',
    name: 'ISO 9001:2015',
    description: 'Quality management systems requirements',
    category: 'industry',
    version: '2015',
    lastUpdated: '2023-01-15',
    mandatory: true,
    source: 'https://www.iso.org/standard/62085.html',
  },
  {
    id: 'gdpr',
    name: 'GDPR Compliance',
    description: 'General Data Protection Regulation requirements',
    category: 'government',
    version: '2018',
    lastUpdated: '2023-03-20',
    mandatory: true,
    source: 'https://gdpr.eu/',
  },
  {
    id: 'internal-rfp',
    name: 'RFP Best Practices',
    description: 'Internal guidelines for RFP document structure and content',
    category: 'internal',
    version: '2.1',
    lastUpdated: '2023-09-01',
  },
  {
    id: 'accessibility',
    name: 'WCAG 2.1',
    description: 'Web Content Accessibility Guidelines',
    category: 'compliance',
    version: '2.1',
    lastUpdated: '2023-06-15',
    source: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
  },
  {
    id: 'security',
    name: 'Security Requirements',
    description: 'Document security and data protection standards',
    category: 'compliance',
    version: '1.5',
    lastUpdated: '2023-08-10',
  },
];

// Mock validation results
const mockValidationResults: { [key: string]: ValidationItem[] } = {
  '1': [
    {
      id: '1-1',
      type: 'error',
      message: 'Missing required section: Executive Summary',
      section: 'Document Structure',
      details: 'The Executive Summary section is mandatory for all RFP documents.',
      failedStandards: [
        { id: 'internal-rfp', name: 'RFP Best Practices', category: 'internal' },
        { id: 'iso-9001', name: 'ISO 9001:2015', category: 'industry' }
      ]
    },
    {
      id: '1-2',
      type: 'warning',
      message: 'Budget information may be incomplete',
      section: 'Financial Details',
      page: 5,
      details: 'The budget section should include both one-time and recurring costs.',
      failedStandards: [
        { id: 'internal-rfp', name: 'RFP Best Practices', category: 'internal' }
      ]
    },
    {
      id: '1-3',
      type: 'info',
      message: 'Consider adding more technical details',
      section: 'Technical Approach',
      page: 8,
      failedStandards: [
        { id: 'iso-9001', name: 'ISO 9001:2015', category: 'industry' }
      ]
    },
    {
      id: '1-4',
      type: 'success',
      message: 'Timeline section is well-defined',
      section: 'Project Timeline',
      page: 12
    }
  ],
  '2': [
    {
      id: '2-1',
      type: 'warning',
      message: 'Some requirements lack acceptance criteria',
      section: 'Requirements',
      page: 3,
      failedStandards: [
        { id: 'iso-9001', name: 'ISO 9001:2015', category: 'industry' },
        { id: 'security', name: 'Security Requirements', category: 'compliance' }
      ]
    },
    {
      id: '2-2',
      type: 'success',
      message: 'All mandatory sections are present',
      section: 'Document Structure'
    }
  ],
  '3': [
    {
      id: '3-1',
      type: 'error',
      message: 'Timeline missing key milestones',
      section: 'Project Timeline',
      page: 1,
      failedStandards: [
        { id: 'internal-rfp', name: 'RFP Best Practices', category: 'internal' },
        { id: 'gdpr', name: 'GDPR Compliance', category: 'government' }
      ]
    }
  ]
};

export default function DocumentValidation() {
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [validationResults, setValidationResults] = useState<ValidationItem[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [selectedStandards, setSelectedStandards] = useState<string[]>(
    mockStandards.filter(s => s.mandatory).map(s => s.id)
  );

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocument(documentId);
    setValidationResults([]);
  };

  const handleStandardToggle = (standardId: string) => {
    setSelectedStandards(prev => {
      const standard = mockStandards.find(s => s.id === standardId);
      if (standard?.mandatory) return prev;
      
      return prev.includes(standardId)
        ? prev.filter(id => id !== standardId)
        : [...prev, standardId];
    });
  };

  const handleValidate = async () => {
    if (!selectedDocument) return;

    setIsValidating(true);
    // Simulate API call with selected standards
    await new Promise(resolve => setTimeout(resolve, 2000));
    setValidationResults(mockValidationResults[selectedDocument]);
    setIsValidating(false);
  };

  const handleValidationItemClick = (item: ValidationItem) => {
    // Handle clicking on a validation item (e.g., scroll to the relevant section in the document)
    console.log('Clicked validation item:', item);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Document Validation
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Validate your documents against standard requirements and best practices
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="document"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Select Document
                </label>
                <select
                  id="document"
                  value={selectedDocument}
                  onChange={e => handleDocumentSelect(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                >
                  <option value="">Choose a document</option>
                  {mockDocuments.map(doc => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleValidate}
                  disabled={!selectedDocument || isValidating}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileSearch className="h-4 w-4 mr-1" />
                  {isValidating ? 'Validating...' : 'Validate Document'}
                </button>
              </div>
            </div>

            {selectedDocument && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Selected Document Details
                </h3>
                {(() => {
                  const doc = mockDocuments.find(d => d.id === selectedDocument);
                  return (
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          File Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {doc?.name}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          File Type
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {doc?.type}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Upload Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {doc?.uploadDate}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          File Size
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {doc?.size}
                        </dd>
                      </div>
                    </dl>
                  );
                })()}
              </div>
            )}
          </div>

          {validationResults.length > 0 && (
            <ValidationReport
              items={validationResults}
              onItemClick={handleValidationItemClick}
            />
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <ValidationReferences
            standards={mockStandards}
            selectedStandards={selectedStandards}
            onStandardToggle={handleStandardToggle}
          />
        </div>
      </div>
    </div>
  );
}
