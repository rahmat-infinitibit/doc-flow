import React from 'react';
import { Info, Book, CheckCircle2 } from 'lucide-react';

export interface ValidationStandard {
  id: string;
  name: string;
  description: string;
  category: 'industry' | 'government' | 'internal' | 'compliance';
  version: string;
  lastUpdated: string;
  mandatory?: boolean;
  source?: string;
}

interface ValidationReferencesProps {
  standards: ValidationStandard[];
  selectedStandards: string[];
  onStandardToggle: (standardId: string) => void;
}

export default function ValidationReferences({
  standards,
  selectedStandards,
  onStandardToggle,
}: ValidationReferencesProps) {
  const categoryIcons = {
    industry: <Book className="h-5 w-5 text-blue-500" />,
    government: <Info className="h-5 w-5 text-red-500" />,
    internal: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    compliance: <Info className="h-5 w-5 text-yellow-500" />,
  };

  const categoryNames = {
    industry: 'Industry Standard',
    government: 'Government Regulation',
    internal: 'Internal Standard',
    compliance: 'Compliance Requirement',
  };

  const groupedStandards = standards.reduce((acc, standard) => {
    if (!acc[standard.category]) {
      acc[standard.category] = [];
    }
    acc[standard.category].push(standard);
    return acc;
  }, {} as Record<string, ValidationStandard[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Validation Standards
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {selectedStandards.length} selected
        </span>
      </div>

      {Object.entries(groupedStandards).map(([category, categoryStandards]) => (
        <div key={category} className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            {categoryIcons[category as keyof typeof categoryIcons]}
            <span className="ml-2">{categoryNames[category as keyof typeof categoryNames]}</span>
          </h4>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
            {categoryStandards.map(standard => (
              <div
                key={standard.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={standard.id}
                      type="checkbox"
                      checked={selectedStandards.includes(standard.id)}
                      onChange={() => onStandardToggle(standard.id)}
                      disabled={standard.mandatory}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50"
                    />
                  </div>
                  <div className="ml-3 flex-grow">
                    <label
                      htmlFor={standard.id}
                      className="text-sm font-medium text-gray-900 dark:text-white flex items-center"
                    >
                      {standard.name}
                      {standard.mandatory && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          Required
                        </span>
                      )}
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        v{standard.version}
                      </span>
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {standard.description}
                    </p>
                    <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                      <span>Last updated: {standard.lastUpdated}</span>
                      {standard.source && (
                        <a
                          href={standard.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          View Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
