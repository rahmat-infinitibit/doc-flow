import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ParsingProgress, { ParsingStep } from '../components/parsing/ParsingProgress';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ParsedResult {
  projectType?: string;
  domain?: string;
  complexity?: 'Low' | 'Medium' | 'High';
  challenges?: string[];
  similarDocuments?: {
    id: string;
    name: string;
    similarity: number;
  }[];
}

const initialSteps: ParsingStep[] = [
  {
    id: 'document-parsing',
    name: 'Document Parsing',
    description: 'Extracting content from uploaded documents using LangChain parser',
    status: 'pending',
  },
  {
    id: 'project-analysis',
    name: 'Project Analysis',
    description: 'Identifying project type, domain, and complexity',
    status: 'pending',
  },
  {
    id: 'historical-data',
    name: 'Historical Data Analysis',
    description: 'Finding similar projects from knowledge store',
    status: 'pending',
  },
  {
    id: 'validation',
    name: 'Validation',
    description: 'Validating project complexity and challenges',
    status: 'pending',
  },
];

export default function DocumentParsing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [steps, setSteps] = useState<ParsingStep[]>(initialSteps);
  const [currentStepId, setCurrentStepId] = useState('document-parsing');
  const [parsedResult, setParsedResult] = useState<ParsedResult>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Simulate parsing process
  useEffect(() => {
    const simulateParsingStep = (stepId: string, delay: number) => {
      setTimeout(() => {
        setSteps(prevSteps =>
          prevSteps.map(step => {
            if (step.id === stepId) {
              return { ...step, status: 'processing' };
            }
            return step;
          })
        );

        // Simulate processing time
        setTimeout(() => {
          setSteps(prevSteps =>
            prevSteps.map(step => {
              if (step.id === stepId) {
                return {
                  ...step,
                  status: 'completed',
                  result: getMockResult(stepId),
                };
              }
              return step;
            })
          );

          // Move to next step
          const currentIndex = steps.findIndex(s => s.id === stepId);
          if (currentIndex < steps.length - 1) {
            const nextStep = steps[currentIndex + 1];
            setCurrentStepId(nextStep.id);
          } else {
            setShowConfirmation(true);
          }
        }, 2000);
      }, delay);
    };

    // Start the parsing process
    simulateParsingStep('document-parsing', 0);
    simulateParsingStep('project-analysis', 3000);
    simulateParsingStep('historical-data', 6000);
    simulateParsingStep('validation', 9000);
  }, []);

  const getMockResult = (stepId: string): any => {
    switch (stepId) {
      case 'project-analysis':
        return {
          projectType: 'Software Development',
          domain: 'Healthcare',
          complexity: 'High',
          challenges: [
            'Integration with legacy systems',
            'HIPAA compliance requirements',
            'Real-time data processing',
          ],
        };
      case 'historical-data':
        return {
          similarDocuments: [
            { id: '1', name: 'Healthcare System RFP 2022', similarity: 85 },
            { id: '2', name: 'Medical Data Platform Proposal', similarity: 72 },
          ],
        };
      default:
        return null;
    }
  };

  const handleConfirm = () => {
    // In a real application, you would save the results to your state management solution
    navigate('/proposal-generation', { 
      state: { 
        parsedResult,
        uploadedFiles: location.state?.files,
        additionalInfo: location.state?.additionalInfo,
      } 
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Document Analysis
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Analyzing your documents to prepare for proposal generation
        </p>
      </div>

      <ParsingProgress steps={steps} currentStepId={currentStepId} />

      {showConfirmation && (
        <div className="rounded-md bg-green-50 dark:bg-green-900 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                Analysis Complete
              </h3>
              <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                <p>
                  We have analyzed your documents and identified the project characteristics.
                  Please review the results and confirm to proceed with proposal generation.
                </p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="rounded-md bg-green-50 dark:bg-green-900 px-3 py-2 text-sm font-medium text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  >
                    Proceed to Proposal Generation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {steps.some(step => step.status === 'error') && (
        <div className="rounded-md bg-red-50 dark:bg-red-900 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Analysis Error
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>
                  There was an error during the document analysis. Please check the error messages
                  above and try again.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
