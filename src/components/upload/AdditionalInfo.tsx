import React from 'react';

export interface AdditionalInfoData {
  projectName: string;
  projectDescription: string;
  expectedDeliveryDate: string;
  budget: string;
  additionalInstructions: string;
}

interface AdditionalInfoProps {
  data: AdditionalInfoData;
  onChange: (data: AdditionalInfoData) => void;
}

export default function AdditionalInfo({ data, onChange }: AdditionalInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
        Additional Information
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Name
          </label>
          <input
            type="text"
            name="projectName"
            id="projectName"
            value={data.projectName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Description
          </label>
          <textarea
            name="projectDescription"
            id="projectDescription"
            rows={3}
            value={data.projectDescription}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="expectedDeliveryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Expected Delivery Date
          </label>
          <input
            type="date"
            name="expectedDeliveryDate"
            id="expectedDeliveryDate"
            value={data.expectedDeliveryDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Budget
          </label>
          <input
            type="text"
            name="budget"
            id="budget"
            value={data.budget}
            onChange={handleChange}
            placeholder="e.g., $50,000"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="additionalInstructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Additional Instructions
          </label>
          <textarea
            name="additionalInstructions"
            id="additionalInstructions"
            rows={4}
            value={data.additionalInstructions}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            placeholder="Any specific requirements or instructions..."
          />
        </div>
      </div>
    </div>
  );
}
