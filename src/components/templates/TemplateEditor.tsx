import React, { useState } from 'react';
import { Save, Trash2, Plus, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export interface TemplateSection {
  id: string;
  title: string;
  description: string;
  defaultContent: string;
  required: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'rfp' | 'rfq' | 'general';
  sections: TemplateSection[];
}

interface TemplateEditorProps {
  template: Template;
  onSave: (template: Template) => void;
  onDelete?: () => void;
  isNew?: boolean;
}

export default function TemplateEditor({
  template: initialTemplate,
  onSave,
  onDelete,
  isNew = false,
}: TemplateEditorProps) {
  const [template, setTemplate] = useState<Template>(initialTemplate);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const handleTemplateChange = (field: keyof Template, value: any) => {
    setTemplate(prev => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (sectionId: string, field: keyof TemplateSection, value: any) => {
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, [field]: value } : section
      ),
    }));
  };

  const handleAddSection = () => {
    const newSection: TemplateSection = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Section',
      description: 'Describe this section',
      defaultContent: '',
      required: false,
    };
    setTemplate(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
    setEditingSection(newSection.id);
  };

  const handleDeleteSection = (sectionId: string) => {
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId),
    }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sections = Array.from(template.sections);
    const [reorderedSection] = sections.splice(result.source.index, 1);
    sections.splice(result.destination.index, 0, reorderedSection);

    setTemplate(prev => ({ ...prev, sections }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Template Name
            </label>
            <input
              type="text"
              value={template.name}
              onChange={e => handleTemplateChange('name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={template.description}
              onChange={e => handleTemplateChange('description', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={template.category}
              onChange={e => handleTemplateChange('category', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            >
              <option value="rfp">RFP</option>
              <option value="rfq">RFQ</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Sections
          </h3>
          <button
            type="button"
            onClick={handleAddSection}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Section
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {template.sections.map((section, index) => (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="bg-white dark:bg-gray-800 shadow rounded-lg p-4"
                      >
                        <div className="flex items-start space-x-4">
                          <div
                            {...provided.dragHandleProps}
                            className="flex items-center"
                          >
                            <GripVertical className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Section Title
                                </label>
                                <input
                                  type="text"
                                  value={section.title}
                                  onChange={e =>
                                    handleSectionChange(
                                      section.id,
                                      'title',
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                />
                              </div>
                              <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={section.required}
                                    onChange={e =>
                                      handleSectionChange(
                                        section.id,
                                        'required',
                                        e.target.checked
                                      )
                                    }
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                  />
                                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    Required
                                  </span>
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteSection(section.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description
                              </label>
                              <input
                                type="text"
                                value={section.description}
                                onChange={e =>
                                  handleSectionChange(
                                    section.id,
                                    'description',
                                    e.target.value
                                  )
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Default Content
                              </label>
                              <textarea
                                value={section.defaultContent}
                                onChange={e =>
                                  handleSectionChange(
                                    section.id,
                                    'defaultContent',
                                    e.target.value
                                  )
                                }
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="flex justify-end space-x-4">
        {onDelete && !isNew && (
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete Template
          </button>
        )}
        <button
          type="button"
          onClick={() => onSave(template)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="h-4 w-4 mr-1" />
          {isNew ? 'Create Template' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
