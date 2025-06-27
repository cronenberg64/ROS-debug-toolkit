# QROS AI Flows Documentation

This document describes each AI flow in `src/ai/flows/`.

## 1. analyze-colcon-build-log.ts
- **Purpose:** Analyze colcon build logs to identify common ROS2 and CMake errors and suggest fixes.
- **Input:** `{ log: string }` — The colcon build log to analyze.
- **Output:** `{ issues: [{ title, error, explanation, suggestion }] }` — List of detected issues, explanations, and suggestions.
- **Usage:** Used by the Colcon Build Analyzer page to process pasted build logs.

## 2. analyze-tf-tree.ts
- **Purpose:** Analyze a TF tree for issues like missing frames or coordinate mismatches.
- **Input:** `string` — The TF tree as text.
- **Output:** `{ issues: [{ description, suggestion }] }` — List of issues and suggested solutions.
- **Usage:** Used by the TF Tree Interpreter page to process TF tree input.

## 3. debug-launch-file.ts
- **Purpose:** Debug ROS2 launch files (XML, YAML, Python) for structural or syntax issues.
- **Input:** `{ launchFileContent: string, launchFileType: 'xml' | 'yaml' | 'py' }`
- **Output:** `{ issuesDetected: boolean, suggestions: string, explanation: string }`
- **Usage:** Used by the Launch File Debugger page to process launch file content.

## 4. answer-ros2-question.ts
- **Purpose:** Answer ROS2-related questions using official documentation and internal knowledge bases.
- **Input:** `{ question: string }`
- **Output:** `{ answer: string, sources: string[] }`
- **Usage:** Used by the RAG-based Question Answering page to answer user questions.

---

For implementation details, see the JSDoc comments in each file in `src/ai/flows/`. 