# **App Name**: QROS

## Core Features:

- TF Tree Interpreter: Analyzes pasted TF trees to detect issues (missing frames, mismatches) and suggests solutions, using LLM reasoning to act as a troubleshooting tool.
- Launch File Debugger: Debugs launch files (XML/YAML/Python) by identifying structural or syntax issues and proposing fixes, with LLM to analyze and act as debugging tool.
- Colcon Build Error Analyzer: Parses colcon build logs to suggest fixes for common ROS2/CMake errors, using LLM to identify, classify and explain the root cause acting as debugging tool.
- RAG-based Question Answering: Retrieves information from indexed ROS2 documentation and internal Yamaha Robotics documents using RAG to answer user questions, drawing from external ROS2 resources, and internal documentation to help users learn.
- Web Interface: Provides a simple web interface (FastAPI) for question input, result display, and source document reference, displaying external links where possible.
- Documentation Indexing: Index both public ROS2 documentation and private Yamaha Robotics documentation, so that information in both can be incorporated into the RAG assistant.

## Style Guidelines:

- Primary color: Deep Blue (#3F51B5) to reflect the stability and depth of the robotics domain.
- Background color: Light Gray (#F5F5F5) to provide a clean, unobtrusive backdrop.
- Accent color: Teal (#009688) to highlight key elements and calls to action.
- Body and headline font: 'Inter', a grotesque-style sans-serif with a modern, machined, objective, neutral look; suitable for headlines and body text
- Use simple, clear icons to represent different ROS2 concepts and tools.
- Organize the web interface with clear sections for input, results, and documentation references.