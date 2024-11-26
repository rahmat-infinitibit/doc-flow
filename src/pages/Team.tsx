import React from 'react';
import { Mail, Phone, Plus } from 'lucide-react';

const team = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Project Manager',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Proposal Writer',
    email: 'jane@example.com',
    phone: '+1 (555) 234-5678',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    role: 'Technical Writer',
    email: 'michael@example.com',
    phone: '+1 (555) 345-6789',
    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'away',
  },
];

export default function Team() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Team Members
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your team and their roles in document processing
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((person) => (
          <div
            key={person.id}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <img className="h-12 w-12 rounded-full" src={person.imageUrl} alt="" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{person.name}</p>
                <p className="truncate text-sm text-gray-500">{person.role}</p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {person.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {person.phone}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  person.status === 'active' ? 'bg-green-400' : 'bg-gray-300'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}