# QROS Usage Guide

This guide explains how to use each main feature of QROS via the web interface.

## 1. RAG-based Question Answering
- **Page:** `/ros-qa`
- **Purpose:** Ask any ROS2-related question and receive answers grounded in official documentation and internal knowledge bases.
- **How to Use:**
  1. Navigate to the 'RAG-based Question Answering' page.
  2. Enter your question in the input box.
  3. Submit to receive a detailed answer and references.

## 2. TF Tree Interpreter
- **Page:** `/tf-tree-analyzer`
- **Purpose:** Analyze a TF tree (as text) to detect issues like missing frames or coordinate mismatches.
- **How to Use:**
  1. Go to the 'TF Tree Interpreter' page.
  2. Paste your TF tree output into the input area.
  3. Submit to get a list of detected issues and suggested fixes.

## 3. Launch File Debugger
- **Page:** `/launch-file-debugger`
- **Purpose:** Debug ROS2 launch files (XML, YAML, Python) for structural or syntax issues.
- **How to Use:**
  1. Open the 'Launch File Debugger' page.
  2. Paste your launch file content and select the file type.
  3. Submit to receive detected issues, explanations, and suggestions for fixes.

## 4. Colcon Build Analyzer
- **Page:** `/colcon-build-analyzer`
- **Purpose:** Analyze colcon build logs to identify and explain errors, with actionable suggestions.
- **How to Use:**
  1. Visit the 'Colcon Build Analyzer' page.
  2. Paste your build log into the input area.
  3. Submit to get a structured list of errors, explanations, and recommended fixes.

---

For more details on each tool's logic, see the JSDoc comments in `src/ai/flows/`. 