# InfinitiBit Document Flow

A sophisticated document management system built with React and TypeScript, featuring a Microsoft Word-like rich text editor powered by Froala.

![InfinitiBit Logo](public/infinitbit-logo.png)

## 🌟 Features

### Rich Text Editor
- **Microsoft Word-like Interface**: Familiar ribbon-style toolbar and layout
- **Advanced Text Formatting**:
  - Font families and sizes
  - Text and background colors
  - Styles and formatting
  - Subscript and superscript
- **Document Structure**:
  - Headers and paragraphs
  - Lists (ordered and unordered)
  - Tables with full editing capabilities
  - Line height control
  - Indentation and quotes
- **Rich Content Support**:
  - Image insertion and editing
  - Video embedding
  - File attachments
  - Links management
  - Special characters
  - Emoticons
  - Font Awesome icons

### Advanced Features
- **Track Changes**: Document version control and collaboration
- **Code View**: HTML and Markdown support
- **Export Options**: Print and PDF export capabilities
- **File Management**: Image and file manager with upload support
- **Quick Insert**: Fast insertion of common elements
- **Spell Checker**: Built-in spell checking
- **Full-Screen Mode**: Distraction-free editing

### User Interface
- **Dark Mode Support**: Complete dark theme implementation
- **Responsive Design**: Works on all screen sizes
- **Custom Scrollbars**: Modern, hover-based design
- **Sidebar Navigation**: Easy access to all features

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/rahmat-infinitibit/doc-flow.git
cd doc-flow
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Create a .env file in the project root and add your Froala Editor license key:
\`\`\`env
VITE_FROALA_LICENSE_KEY=your_license_key_here
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

## 🛠️ Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Rich Text Editor**: Froala Editor
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Context API
- **Routing**: React Router

## 📂 Project Structure

\`\`\`
frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components
│   │   ├── editor/          # Editor-related components
│   │   └── parsing/         # Document parsing components
│   ├── pages/              # Page components
│   ├── styles/             # Global styles and Tailwind config
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── public/                # Static assets
└── package.json          # Project dependencies and scripts
\`\`\`

## 🔧 Configuration

### Editor Configuration
The editor can be customized by modifying the config object in `src/pages/Editor.tsx`. Available options include:
- Toolbar buttons and their arrangement
- Font families and sizes
- Colors and formatting options
- Plugin settings
- Upload URLs for images and files

### Theme Configuration
Customize the application theme in `tailwind.config.js`:
- Color schemes
- Typography
- Spacing
- Breakpoints
- Custom components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Froala Editor](https://froala.com/wysiwyg-editor/) for the rich text editing capabilities
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- [React](https://reactjs.org/) for the frontend framework

## 📞 Support

For support, email support@infinitibit.com or join our Slack channel.

---

Built with ❤️ by InfinitiBit
