import React from 'react';
import { CheckCircle2, AlertCircle, Clock, ArrowRight } from 'lucide-react';

export interface ParsingStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  errorMessage?: string;
  result?: any;
}

interface ParsingProgressProps {
  steps: ParsingStep[];
  currentStepId: string;
}

export default function ParsingProgress({ steps, currentStepId }: ParsingProgressProps) {
  return (
    <div className="space-y-6">
      <nav aria-label="Progress">
        <ol role="list" className="overflow-hidden">
          {steps.map((step, stepIdx) => (
            <li
              key={step.id}
              className={`relative ${stepIdx !== steps.length - 1 ? 'pb-8' : ''}`}
            >
              {stepIdx !== steps.length - 1 && (
                <div
                  className={`absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 ${
                    step.status === 'completed' ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  aria-hidden="true"
                />
              )}
              <div className="group relative flex items-start">
                <span className="flex h-9 items-center">
                  {step.status === 'completed' && (
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                      <CheckCircle2 className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  )}
                  {step.status === 'processing' && (
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600">
                      <div className="h-5 w-5 rounded-full bg-indigo-600 animate-ping" />
                    </span>
                  )}
                  {step.status === 'error' && (
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-600">
                      <AlertCircle className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  )}
                  {step.status === 'pending' && (
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600">
                      <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                    </span>
                  )}
                </span>
                <div className="ml-4 min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className={`text-sm font-medium ${
                          step.status === 'error'
                            ? 'text-red-600 dark:text-red-400'
                            : step.status === 'completed'
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {step.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                    {step.status === 'completed' && step.result && (
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400"
                        >
                          View
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </span>
                    )}
                  </div>
                  {step.status === 'error' && step.errorMessage && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{step.errorMessage}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
