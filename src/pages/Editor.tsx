import React, { useState, useEffect } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import { Save, ChevronDown } from 'lucide-react';

// Import all Froala Editor plugins
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/code_beautifier.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/entities.min.js';
import 'froala-editor/js/plugins/file.min.js';
import 'froala-editor/js/plugins/files_manager.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/forms.min.js';
import 'froala-editor/js/plugins/fullscreen.min.js';
import 'froala-editor/js/plugins/help.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/image_manager.min.js';
import 'froala-editor/js/plugins/inline_class.min.js';
import 'froala-editor/js/plugins/inline_style.min.js';
import 'froala-editor/js/plugins/line_breaker.min.js';
import 'froala-editor/js/plugins/line_height.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/markdown.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/print.min.js';
import 'froala-editor/js/plugins/quick_insert.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/save.min.js';
import 'froala-editor/js/plugins/special_characters.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/track_changes.min.js';
import 'froala-editor/js/plugins/trim_video.min.js';
import 'froala-editor/js/plugins/url.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/js/third_party/font_awesome.min.js';
import 'froala-editor/js/third_party/spell_checker.min.js';
import 'froala-editor/js/third_party/image_tui.min.js';

export default function Editor() {
  const [content, setContent] = useState('');
  const [documentName, setDocumentName] = useState('Untitled Document');
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    // Modify the Froala branding
    const modifyBranding = () => {
      const poweredByLink = document.querySelector('a[href="https://froala.com/wysiwyg-editor"]');
      if (poweredByLink) {
        const span = poweredByLink.querySelector('span');
        if (span) {
          span.textContent = 'Powered by InfinitiBit';
        }
        poweredByLink.removeAttribute('href');
      }
    };

    // Apply the modification after a short delay to ensure the editor is loaded
    const timer = setTimeout(modifyBranding, 100);
    return () => clearTimeout(timer);
  }, []);

  // Froala Editor configuration
  const config = {
    placeholderText: 'Start typing your content here...',
    charCounterCount: true,
    attribution: false,
    toolbarSticky: true,
    toolbarStickyOffset: 0,
    heightMin: 'calc(100vh - 230px)',
    imageUploadURL: 'http://i.froala.com/upload',
    fileUploadURL: 'http://i.froala.com/upload',
    videoUploadURL: 'http://i.froala.com/upload',
    imageManagerLoadURL: 'http://i.froala.com/load_images',
    fileManagerLoadURL: 'http://i.froala.com/load_files',
    trackChanges: true,
    toolbarButtons: {
      'moreText': {
        'buttons': [
          'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript',
          'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass',
          'inlineStyle', 'clearFormatting'
        ],
        'buttonsVisible': 6
      },
      'moreParagraph': {
        'buttons': [
          'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',
          'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle',
          'lineHeight', 'outdent', 'indent', 'quote'
        ],
        'buttonsVisible': 6
      },
      'moreRich': {
        'buttons': [
          'insertLink', 'insertImage', 'insertVideo', 'insertTable',
          'emoticons', 'fontAwesome', 'specialCharacters', 'embedly',
          'insertFile', 'insertHR'
        ],
        'buttonsVisible': 6
      },
      'moreMisc': {
        'buttons': [
          'undo', 'redo', 'fullscreen', 'print', 'getPDF',
          'spellChecker', 'selectAll', 'html', 'help',
          'trackChanges', 'markdown', 'codeView', 'codeBeautifier'
        ],
        'buttonsVisible': 6
      }
    },
    // Quick Insert buttons
    quickInsertButtons: ['image', 'video', 'embedly', 'table', 'ul', 'ol', 'hr'],
    
    // Image editing
    imageEditButtons: [
      'imageReplace', 'imageAlign', 'imageCaption', 'imageRemove', 'imageLink', 
      'linkOpen', 'linkEdit', 'linkRemove', 'imageDisplay', 'imageStyle', 'imageAlt', 
      'imageSize', 'imageTUI'
    ],
    
    // Table
    tableEditButtons: [
      'tableHeader', 'tableRemove', 'tableRows', 'tableColumns', 'tableStyle',
      'tableCells', 'tableCellBackground', 'tableCellVerticalAlign', 
      'tableCellHorizontalAlign', 'tableCellStyle'
    ],
    
    // Video
    videoEditButtons: [
      'videoReplace', 'videoRemove', 'videoAlign', 'videoDisplay', 'videoStyle',
      'videoLink', 'linkOpen', 'linkEdit', 'linkRemove'
    ],
    
    // Link
    linkList: [
      {
        text: 'InfinitiBit',
        href: 'http://infinitbit.com',
        target: '_blank'
      }
    ],
    
    // Paragraph Formats
    paragraphFormat: {
      N: 'Normal',
      H1: 'Heading 1',
      H2: 'Heading 2',
      H3: 'Heading 3',
      H4: 'Heading 4',
      PRE: 'Code'
    },
    
    // Font Family
    fontFamily: {
      'Calibri, sans-serif': 'Calibri',
      'Arial, sans-serif': 'Arial',
      'Georgia, serif': 'Georgia',
      'Impact, Charcoal, sans-serif': 'Impact',
      'Tahoma, Geneva, sans-serif': 'Tahoma',
      "'Times New Roman', Times, serif": 'Times New Roman',
      'Verdana, Geneva, sans-serif': 'Verdana',
      'Courier New, Courier, monospace': 'Courier New',
      'Monaco, monospace': 'Monaco'
    },
    
    // Font Size
    fontSize: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '30', '36', '48', '60', '72', '96'],
    
    // Line Height
    lineHeights: {
      '0.5': '0.5',
      '1': 'Single',
      '1.15': '1.15',
      '1.5': '1.5',
      '2': 'Double',
      '2.5': '2.5',
      '3': '3'
    },
    
    // Colors
    colorsBackground: [
      '#15E67F', '#E3DE8C', '#D8A076', '#D83131', '#3185FC', 
      '#41CC7C', '#FB6C3F', '#E3E3E3', '#EFEFEF', '#FFFFFF'
    ],
    colorsText: [
      '#15E67F', '#E3DE8C', '#D8A076', '#D83131', '#3185FC', 
      '#41CC7C', '#FB6C3F', '#E3E3E3', '#EFEFEF', '#FFFFFF'
    ],
    
    // Emoticons
    emoticonsStep: 4,
    emoticonsSet: [
      { code: '1f600', desc: 'Grinning face' },
      { code: '1f601', desc: 'Grinning face with smiling eyes' },
      { code: '1f602', desc: 'Face with tears of joy' },
      { code: '1f603', desc: 'Smiling face with open mouth' },
      { code: '1f604', desc: 'Smiling face with open mouth and smiling eyes' },
      { code: '1f605', desc: 'Smiling face with open mouth and cold sweat' }
    ],
    
    // Special Characters
    specialCharacters: [
      '&copy;', '&reg;', '&euro;', '&pound;', '&cent;', '&yen;', '&sect;',
      '&deg;', '&plusmn;', '&para;', '&middot;', '&times;', '&divide;', '&fnof;'
    ],
    
    // Track Changes
    trackChangesEnabled: true,
    
    events: {
      'initialized': function() {
        const poweredByLink = document.querySelector('a[href="https://froala.com/wysiwyg-editor"]');
        if (poweredByLink) {
          const span = poweredByLink.querySelector('span');
          if (span) {
            span.textContent = 'Powered by InfinitiBit';
          }
          poweredByLink.removeAttribute('href');
        }
      },
      'contentChanged': function() {
        console.log('content changed');
      }
    }
  };

  const handleModelChange = (model: string) => {
    setContent(model);
  };

  const handleSave = () => {
    console.log('Saving content:', content);
  };

  const handleDocumentNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingName(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4">
            <img
              src="/infinitbit-logo.png"
              alt="InfinitiBit"
              className="h-8 w-8"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%234f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"%3E%3C/path%3E%3Cpolyline points="14 2 14 8 20 8"%3E%3C/polyline%3E%3Cline x1="16" y1="13" x2="8" y2="13"%3E%3C/line%3E%3Cline x1="16" y1="17" x2="8" y2="17"%3E%3C/line%3E%3Cpolyline points="10 9 9 9 8 9"%3E%3C/polyline%3E%3C/svg%3E';
              }}
            />
            {isEditingName ? (
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                onKeyDown={handleDocumentNameChange}
                onBlur={() => setIsEditingName(false)}
                className="border-b border-indigo-500 focus:outline-none px-1"
                autoFocus
              />
            ) : (
              <div
                onClick={() => setIsEditingName(true)}
                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
              >
                {documentName}
                <ChevronDown className="h-4 w-4 inline-block ml-1" />
              </div>
            )}
          </div>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="max-w-[8.5in] mx-auto bg-white shadow-lg my-8">
        <div className="min-h-[11in]">
          <FroalaEditor
            tag="textarea"
            config={config}
            model={content}
            onModelChange={handleModelChange}
          />
        </div>
      </div>

      {/* Custom CSS for Word-like styling */}
      <style>{`
        /* Hide Froala branding */
        .fr-wrapper > div:last-child a[href="https://froala.com/wysiwyg-editor"] {
          display: none !important;
        }
        .fr-wrapper::after {
          content: "Powered by InfinitiBit";
          display: block;
          padding: 5px 7px;
          font-size: 12px;
          color: #666;
          clear: both;
        }

        /* Word-like styling */
        .fr-box.fr-basic .fr-element {
          font-family: Calibri, sans-serif;
          font-size: 11pt;
          color: #333;
          line-height: 1.5;
          padding: 1in;
        }

        .fr-toolbar {
          border-top: none !important;
          border-radius: 0 !important;
          background: #f3f4f6 !important;
          padding: 8px 4px !important;
        }

        .fr-toolbar .fr-btn-grp {
          margin: 0 8px !important;
        }

        .fr-toolbar .fr-command.fr-btn {
          color: #444 !important;
          padding: 4px 8px !important;
          border-radius: 3px !important;
        }

        .fr-toolbar .fr-command.fr-btn:hover {
          background: #e5e7eb !important;
        }

        .fr-toolbar .fr-command.fr-btn.fr-active {
          background: #dbeafe !important;
          color: #2563eb !important;
        }

        .fr-second-toolbar {
          border: none !important;
          background: #f9fafb !important;
          padding: 8px !important;
        }

        /* Page layout */
        .fr-box.fr-basic {
          border: none !important;
        }

        .fr-element.fr-view {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          background: white !important;
        }

        /* Dropdown menus */
        .fr-dropdown-menu {
          border-radius: 4px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }

        .fr-dropdown-menu .fr-dropdown-wrapper {
          background: white !important;
          border-radius: 4px !important;
        }

        /* Dark mode support */
        .dark .fr-toolbar,
        .dark .fr-second-toolbar {
          background: #1f2937 !important;
          border-color: #374151 !important;
        }

        .dark .fr-toolbar .fr-command.fr-btn {
          color: #e5e7eb !important;
        }

        .dark .fr-toolbar .fr-command.fr-btn:hover {
          background: #374151 !important;
        }

        .dark .fr-toolbar .fr-command.fr-btn.fr-active {
          background: #3b82f6 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}
