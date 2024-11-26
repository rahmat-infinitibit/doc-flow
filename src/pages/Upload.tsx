import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, File, X, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import AdditionalInfo, { AdditionalInfoData } from '../components/upload/AdditionalInfo';
import { useNavigate } from 'react-router-dom';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  errorMessage?: string;
  category: 'rfp' | 'rfq' | 'support' | 'other';
}

export default function Upload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [currentStep, setCurrentStep] = useState<'upload' | 'info' | 'document-parsing'>('upload');
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoData>({
    projectName: '',
    projectDescription: '',
    expectedDeliveryDate: '',
    budget: '',
    additionalInstructions: '',
  });
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading' as const,
      category: 'other' as const,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(file => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === file.id) {
            const progress = Math.min(f.progress + 20, 100);
            const status = progress === 100 ? 'success' : 'uploading';
            return { ...f, progress, status };
          }
          return f;
        }));
      }, 500);

      // Clear interval when progress reaches 100%
      setTimeout(() => clearInterval(interval), 2500);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const updateFileCategory = (id: string, category: UploadedFile['category']) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, category } : file
    ));
  };

  const handleSubmit = () => {
    if (currentStep === 'info') {
      setCurrentStep('document-parsing');
    } else {
      // Navigate to document parsing with the uploaded files and additional info
      navigate('/document-parsing', {
        state: {
          files,
          additionalInfo
        }
      });
    }
  };

  const handleNext = () => {
    if (currentStep === 'upload' && files.length > 0) {
      setCurrentStep('info');
    }
  };

  const handleBack = () => {
    setCurrentStep('upload');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          {currentStep === 'upload' ? 'Upload Documents' : currentStep === 'info' ? 'Additional Information' : 'Document Parsing'}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {currentStep === 'upload' 
            ? 'Upload your RFPs, RFQs, or supporting documents. Accepted formats: PDF, DOC, DOCX'
            : currentStep === 'info' ? 'Provide additional details about your project' : 'Parsing documents...'}
        </p>
      </div>

      {currentStep === 'upload' ? (
        <>
          <div
            {...getRootProps()}
            className={`
              mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10
              ${isDragActive ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950' : 'border-gray-900/25 dark:border-gray-700'}
              cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200
              dark:bg-gray-900
            `}
          >
            <div className="text-center">
              <UploadIcon
                className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
                <input {...getInputProps()} />
                <span className="relative rounded-md font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Upload a file</span>
                  <span className="text-gray-600 dark:text-gray-400 mx-1">or drag and drop</span>
                </span>
              </div>
              <p className="text-xs leading-5 text-gray-600 dark:text-gray-400">PDF, DOC, or DOCX up to 10MB</p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Files</h3>
              <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                {files.map((file) => (
                  <li key={file.id} className="relative py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center min-w-0 gap-x-4">
                        <File className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                            {file.name}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                            {formatFileSize(file.size)}
                          </p>
                          <select
                            value={file.category}
                            onChange={(e) => updateFileCategory(file.id, e.target.value as UploadedFile['category'])}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 py-1 pl-3 pr-10 text-gray-900 dark:text-white text-xs focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-700"
                          >
                            <option value="rfp">RFP Document</option>
                            <option value="rfq">RFQ Document</option>
                            <option value="support">Supporting Document</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-4">
                        {file.status === 'uploading' && (
                          <div className="w-24">
                            <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                              {file.progress}%
                            </p>
                          </div>
                        )}
                        {file.status === 'success' && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                        {file.status === 'error' && (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <X className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </button>
                      </div>
                    </div>
                    {file.status === 'error' && file.errorMessage && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{file.errorMessage}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {files.length > 0 && (
            <div className="mt-6 flex justify-end gap-x-3">
              <button
                type="button"
                onClick={() => setFiles([])}
                className="rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex items-center gap-x-2"
              >
                Next step
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      ) : currentStep === 'info' ? (
        <>
          <AdditionalInfo
            data={additionalInfo}
            onChange={setAdditionalInfo}
          />

          <div className="mt-6 flex justify-end gap-x-3">
            <button
              type="button"
              onClick={handleBack}
              className="rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Back
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        <div>
          Document parsing in progress...
        </div>
      )}
    </div>
  );
}