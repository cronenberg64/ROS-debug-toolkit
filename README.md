# QROS: Your ROS2 Co-Pilot

QROS is an intelligent suite of tools designed to streamline your ROS2 development workflow, from debugging to documentation. Built with Next.js, Genkit, and a modern UI, QROS provides AI-powered analysis and troubleshooting for ROS2 developers.

## Features

- **RAG-based Question Answering**: Get answers to your ROS2 questions, backed by official documentation and internal knowledge bases.
- **TF Tree Interpreter**: Analyze TF trees to detect issues like missing frames or coordinate mismatches and get troubleshooting suggestions.
- **Launch File Debugger**: Debug ROS2 launch files (XML, YAML, Python) to find structural or syntax issues and receive proposed fixes.
- **Colcon Build Analyzer**: Parse colcon build logs to identify common ROS2/CMake errors and get actionable suggestions to fix them.

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd QROS
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:9002](http://localhost:9002).

### AI/Genkit Development
- To start Genkit in development mode:
  ```sh
  npm run genkit:dev
  ```
- To watch for changes:
  ```sh
  npm run genkit:watch
  ```

## Project Structure

- `src/app/` — Next.js app directory, with pages for each tool
- `src/ai/flows/` — AI flows for each feature (Colcon Build Analyzer, TF Tree Interpreter, etc.)
- `src/components/ui/` — Reusable UI components
- `docs/` — Project documentation and blueprints

## Documentation

- See [`docs/blueprint.md`](docs/blueprint.md) for a high-level overview and style guidelines.
- Each AI flow is documented in the `src/ai/flows/` directory with JSDoc comments.

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, new features, or documentation improvements.

## License

[MIT](LICENSE) (add a LICENSE file if not present)

---

QROS is not affiliated with or endorsed by Open Robotics or Yamaha Robotics. For more information, see the documentation in the `docs/` folder.
