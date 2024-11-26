import React from 'react';
import { BookOpen, MessageCircle, Video, FileQuestion, ExternalLink } from 'lucide-react';

const guides = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of using the document management system',
    icon: BookOpen,
    items: [
      { title: 'Creating your first document', link: '#' },
      { title: 'Understanding the dashboard', link: '#' },
      { title: 'Working with templates', link: '#' },
    ],
  },
  {
    title: 'Tutorials',
    description: 'Step-by-step guides for common tasks',
    icon: Video,
    items: [
      { title: 'How to upload and process documents', link: '#' },
      { title: 'Managing team permissions', link: '#' },
      { title: 'Using the knowledge store', link: '#' },
    ],
  },
  {
    title: 'FAQs',
    description: 'Frequently asked questions and answers',
    icon: FileQuestion,
    items: [
      { title: 'Account management', link: '#' },
      { title: 'Document processing', link: '#' },
      { title: 'Security and privacy', link: '#' },
    ],
  },
];

export default function Help() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Help Center
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Find guides, tutorials, and answers to common questions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
          <div className="flex items-center gap-x-3">
            <MessageCircle className="h-6 w-6 text-indigo-600" />
            <h3 className="text-base font-semibold leading-7 text-gray-900">Need Help?</h3>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="mt-6 flex gap-x-3">
            <button
              type="button"
              className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Contact Support
            </button>
            <button
              type="button"
              className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Schedule Demo
            </button>
          </div>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
          <form className="mt-2">
            <label htmlFor="search" className="sr-only">
              Quick search
            </label>
            <div className="relative">
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search help articles..."
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                  ⌘K
                </kbd>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {guides.map((guide) => (
          <div
            key={guide.title}
            className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6"
          >
            <div className="flex items-center gap-x-3">
              <guide.icon className="h-6 w-6 text-indigo-600" />
              <h3 className="text-base font-semibold leading-7 text-gray-900">{guide.title}</h3>
            </div>
            <p className="mt-2 text-sm text-gray-500">{guide.description}</p>
            <ul role="list" className="mt-6 space-y-3">
              {guide.items.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.link}
                    className="group flex items-center gap-x-3 text-sm font-medium text-gray-900 hover:text-indigo-600"
                  >
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-indigo-600" />
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}