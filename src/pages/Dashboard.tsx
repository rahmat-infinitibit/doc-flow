import React from 'react';
import { BarChart, FileText, Users, AlertCircle } from 'lucide-react';

const stats = [
  { name: 'Total Documents', value: '405', icon: FileText, change: '+4.75%', changeType: 'positive' },
  { name: 'Active Projects', value: '12', icon: BarChart, change: '+54.02%', changeType: 'positive' },
  { name: 'Team Members', value: '24', icon: Users, change: '+12.30%', changeType: 'positive' },
  { name: 'Pending Reviews', value: '6', icon: AlertCircle, change: '-8.44%', changeType: 'negative' },
];

const recentDocuments = [
  {
    id: 1,
    title: 'Enterprise Software RFP',
    type: 'RFP',
    status: 'In Progress',
    date: '2024-03-10',
  },
  {
    id: 2,
    title: 'Cloud Infrastructure Proposal',
    type: 'Proposal',
    status: 'Under Review',
    date: '2024-03-09',
  },
  {
    id: 3,
    title: 'Mobile App Development RFQ',
    type: 'RFQ',
    status: 'Approved',
    date: '2024-03-08',
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Documents</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {recentDocuments.map((doc) => (
              <li key={doc.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <p className="ml-2 text-sm font-medium text-gray-900">{doc.title}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                      {doc.type}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">{doc.date}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                      {doc.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}