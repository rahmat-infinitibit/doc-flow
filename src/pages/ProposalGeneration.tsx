import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, Download, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ProposalSection {
  id: string;
  title: string;
  content: string;
  status: 'pending' | 'generating' | 'completed' | 'error';
}

interface LocationState {
  parsedResult: {
    projectType?: string;
    domain?: string;
    complexity?: string;
    challenges?: string[];
    similarDocuments?: Array<{
      id: string;
      name: string;
      similarity: number;
    }>;
  };
  uploadedFiles?: File[];
  additionalInfo?: {
    projectName: string;
    clientName: string;
    deadline: string;
    budget: string;
    requirements: string;
  };
}

export default function ProposalGeneration() {
  const location = useLocation();
  const navigate = useNavigate();
  const { parsedResult = {}, uploadedFiles = [], additionalInfo = {} } = (location.state as LocationState) || {};

  // Redirect if no parsed result
  React.useEffect(() => {
    if (!location.state) {
      navigate('/upload', { replace: true });
    }
  }, [location.state, navigate]);

  const [sections, setSections] = useState<ProposalSection[]>([
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      content: '',
      status: 'pending',
    },
    {
      id: 'project-overview',
      title: 'Project Overview',
      content: '',
      status: 'pending',
    },
    {
      id: 'technical-approach',
      title: 'Technical Approach',
      content: '',
      status: 'pending',
    },
    {
      id: 'methodology',
      title: 'Methodology',
      content: '',
      status: 'pending',
    },
    {
      id: 'timeline',
      title: 'Timeline and Milestones',
      content: '',
      status: 'pending',
    },
    {
      id: 'budget',
      title: 'Budget Breakdown',
      content: '',
      status: 'pending',
    },
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  const generateSection = async (sectionId: string) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? { ...section, status: 'generating' }
          : section
      )
    );

    // Simulate API call to generate content
    await new Promise(resolve => setTimeout(resolve, 2000));

    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              status: 'completed',
              content: getMockContent(section.id),
            }
          : section
      )
    );
  };

  const getMockContent = (sectionId: string): string => {
    const mockContents: { [key: string]: string } = {
      'executive-summary': `This proposal outlines our comprehensive solution for ${additionalInfo?.clientName || '[Client Name]'}'s ${parsedResult?.projectType || '[Project Type]'} project in the ${parsedResult?.domain || '[Domain]'} sector. With our extensive experience and proven track record, we are confident in delivering a high-quality solution that meets all specified requirements within the given timeline and budget.`,
      'project-overview': `Project Name: ${additionalInfo?.projectName || '[Project Name]'}\nClient: ${additionalInfo?.clientName || '[Client Name]'}\nDomain: ${parsedResult?.domain || '[Domain]'}\nComplexity: ${parsedResult?.complexity || '[Complexity]'}\n\nKey Challenges:\n${parsedResult?.challenges?.map(challenge => `- ${challenge}`).join('\n') || '- No challenges specified'}`,
      'technical-approach': 'Our technical approach leverages cutting-edge technologies and industry best practices to ensure robust, scalable, and maintainable solutions. We will implement a microservices architecture using cloud-native technologies to ensure high availability and performance.',
      'methodology': 'We follow an Agile development methodology with two-week sprint cycles. This approach allows for regular feedback and adjustments throughout the development process, ensuring alignment with project goals and requirements.',
      'timeline': `Project Timeline: ${additionalInfo?.deadline || '[Timeline]'}\n\nKey Milestones:\n- Requirements Analysis and Planning: 2 weeks\n- Design and Architecture: 3 weeks\n- Development Phase 1: 6 weeks\n- Testing and QA: 3 weeks\n- Deployment and Training: 2 weeks`,
      'budget': `Total Budget: ${additionalInfo?.budget || '[Budget]'}\n\nBreakdown:\n- Development: 60%\n- Testing and QA: 15%\n- Project Management: 10%\n- Training and Documentation: 10%\n- Contingency: 5%`,
    };

    return mockContents[sectionId] || 'Content generation in progress...';
  };

  const generateAll = async () => {
    setIsGenerating(true);
    for (const section of sections) {
      await generateSection(section.id);
    }
    setIsGenerating(false);
    setDownloadReady(true);
  };

  const handleDownload = () => {
    const content = sections
      .map(section => `# ${section.title}\n\n${section.content}\n\n`)
      .join('---\n\n');
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${additionalInfo?.projectName || 'proposal'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Proposal Generation
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Generate and customize your proposal sections
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={generateAll}
            disabled={isGenerating}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <RefreshCw className="animate-spin -ml-1 mr-2 h-5 w-5" />
            ) : (
              <FileText className="-ml-1 mr-2 h-5 w-5" />
            )}
            {isGenerating ? 'Generating...' : 'Generate All Sections'}
          </button>
          {downloadReady && (
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Download className="-ml-1 mr-2 h-5 w-5" />
              Download Proposal
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sections.map(section => (
          <div
            key={section.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {section.title}
              </h3>
              {section.status === 'completed' && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
            </div>
            {section.content ? (
              <div className="prose dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-gray-300">
                  {section.content}
                </pre>
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-sm italic">
                Content will be generated automatically
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
