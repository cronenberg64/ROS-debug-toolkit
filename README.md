# QROS Copilot

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
![Node.js](https://img.shields.io/badge/node-%3E=20.0.0-brightgreen)
![Next.js](https://img.shields.io/badge/next.js-15-blue)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

> **Live Demo:** _Coming Soon_

QROS Copilot is an AI-powered web assistant that streamlines ROS2 (Robot Operating System 2) development. It provides intelligent tools for debugging, documentation, and troubleshooting, all accessible through a modern Next.js web interface.

---

## Features

- **RAG-based Question Answering:** Get answers to your ROS2 questions, backed by official documentation and internal knowledge bases.
- **TF Tree Interpreter:** Analyze TF trees to detect issues like missing frames or coordinate mismatches and get troubleshooting suggestions.
- **Launch File Debugger:** Debug ROS2 launch files (XML, YAML, Python) to find structural or syntax issues and receive proposed fixes.
- **Colcon Build Analyzer:** Parse colcon build logs to identify common ROS2/CMake errors and get actionable suggestions to fix them.

---

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **AI Integration:** Genkit, Google AI, Zod
- **UI Components:** shadcn/ui, Lucide Icons
- **Backend/Logic:** Genkit flows, custom prompt engineering
- **Hosting/Deployment:** Firebase App Hosting (config-ready), Vercel/Netlify compatible

---

## Setup Instructions

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone <repo-url>
cd QROS
npm install
```

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:9002` by default.

---

## Usage

1. **Open the web interface** at `http://localhost:9002` (or your deployed URL)
2. **Choose a tool** from the sidebar:
   - Q&A: `/ros-qa`
   - TF Tree Analyzer: `/tf-tree-analyzer`
   - Launch File Debugger: `/launch-file-debugger`
   - Colcon Build Analyzer: `/colcon-build-analyzer`
3. **Interact** with the forms to analyze logs, debug files, or ask questions.

---

## Project Structure

```
QROS/
├── src/
│   ├── ai/                 # AI flows and prompt logic
│   │   └── flows/          # Individual AI tools
│   ├── app/                # Next.js App Router (pages, forms, layouts)
│   ├── components/         # React UI components (shadcn/ui, sidebar, etc.)
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── docs/                   # Documentation
├── public/                 # Static assets (if any)
├── package.json            # Project metadata and scripts
└── ...                     # Config files, etc.
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript and Next.js best practices
- Write clear, maintainable code
- Update documentation for new features
- Ensure compatibility with ROS2 workflows

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## How to Cite

If you use QROS Copilot in your research, projects, or products, please cite this repository as follows:

```
@software{qros_copilot,
  author = {cronenberg64 (Jonathan Setiawan)},
  title = {QROS Copilot: An AI Assistant for ROS2 Development},
  year = {2024},
  url = {https://github.com/yourusername/qros-copilot}
}
```

---

## Acknowledgements

- **ROS2** – Robot Operating System 2
- **Next.js** – React framework for web apps
- **shadcn/ui** – UI component library
- **Genkit** – AI orchestration and prompt flows
- **Google AI** – LLM and AI backend
- **Tailwind CSS** – Utility-first CSS framework
- **Lucide Icons** – Icon set for React
- **Firebase** – Hosting and backend infrastructure
- **Zod** – TypeScript-first schema validation

---
