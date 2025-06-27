'use server';

/**
 * @fileOverview Analyzes colcon build logs to identify common ROS2 and CMake errors and suggests fixes.
 *
 * - analyzeColconBuildLog - A function that handles the analysis of colcon build logs.
 * - AnalyzeColconBuildLogInput - The input type for the analyzeColconBuildLog function.
 * - AnalyzeColconBuildLogOutput - The return type for the analyzeColconBuildLog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeColconBuildLogInputSchema = z.object({
  log: z.string().describe('The colcon build log to analyze.'),
});
export type AnalyzeColconBuildLogInput = z.infer<typeof AnalyzeColconBuildLogInputSchema>;

const AnalyzeColconBuildLogOutputSchema = z.object({
  issues: z.array(z.object({
    title: z.string().describe("A short, descriptive title for the issue."),
    error: z.string().describe("The specific error message from the log."),
    explanation: z.string().describe("A clear explanation of the root cause of the error."),
    suggestion: z.string().describe("A specific suggestion or code correction to fix the issue. Use Markdown for formatting, especially for code blocks."),
  })).describe("A list of issues found in the colcon build log. If no issues are found, this array will be empty."),
});
export type AnalyzeColconBuildLogOutput = z.infer<typeof AnalyzeColconBuildLogOutputSchema>;

export async function analyzeColconBuildLog(input: AnalyzeColconBuildLogInput): Promise<AnalyzeColconBuildLogOutput> {
  // Simple check to prevent sending empty logs to the AI, even with client-side validation.
  if (!input.log || input.log.trim().length < 10) {
    return {
      issues: []
    };
  }
  return analyzeColconBuildLogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeColconBuildLogPrompt',
  input: {schema: AnalyzeColconBuildLogInputSchema},
  output: {schema: AnalyzeColconBuildLogOutputSchema},
  prompt: `You are an expert ROS2 & CMake build engineer. Your task is to meticulously analyze the provided 'colcon build' log and identify any and all errors.

**Log to Analyze:**
\`\`\`
{{{log}}}
\`\`\`

**Critical Task:**

1.  **Find All Errors:** Scour the log for critical error indicators such as \`CMake Error\`, \`error:\`, \`Failed <<<\`, and compiler messages. Do not miss any.
2.  **Structure the Output:** For each distinct error you find, create an object with a \`title\`, \`error\`, \`explanation\`, and a \`suggestion\`.
3.  **Return JSON:** You MUST return a single JSON object. The root of this object must be a key named \`issues\` that contains an array of the error objects you created.
4.  **Empty Array for Success:** If and ONLY IF you find absolutely no errors, return an object with an empty \`issues\` array: \`{"issues": []}\`.

---

**High-Quality Example:**

**Input Log:**
\`\`\`
Starting >>> my_robot_package
--- stderr: my_robot_package
CMake Error at CMakeLists.txt:14 (find_package):
  Could not find a package configuration file provided by "rclpy".
CMake Error at CMakeLists.txt:18 (add_excutable):
  Unknown CMake command "add_excutable".
---
Failed   <<< my_robot_package [2.97s, exited with code 1]

Summary: 0 packages finished [3.12s]
  1 package failed: my_robot_package
  1 package had stderr output: my_robot_package
\`\`\`

**Correct JSON Output:**
\`\`\`json
{
  "issues": [
    {
      "title": "Missing 'rclpy' Dependency",
      "error": "CMake Error at CMakeLists.txt:14 (find_package): Could not find a package configuration file provided by \\"rclpy\\".",
      "explanation": "The build system cannot find the 'rclpy' package, which is the Python client library for ROS2. This usually means it's not installed in your workspace or the \`package.xml\` is missing the dependency declaration.",
      "suggestion": "1. Add \`<depend>rclpy</depend>\` to your \`package.xml\` file.\\n2. Re-run \`colcon build\` after updating the file. Make sure you have sourced your ROS2 environment and workspace correctly."
    },
    {
      "title": "Typo in CMake Command",
      "error": "CMake Error at CMakeLists.txt:18 (add_excutable): Unknown CMake command \\"add_excutable\\".",
      "explanation": "There is a typo in the CMake command. The correct command is \`add_executable\`.",
      "suggestion": "In your \`CMakeLists.txt\` file, change \`add_excutable(...)\` to \`add_executable(...)\`."
    }
  ]
}
\`\`\`

Now, analyze the provided log and produce the JSON output. Do not add any other text. Your entire response must be the JSON object.
`,
});

const analyzeColconBuildLogFlow = ai.defineFlow(
  {
    name: 'analyzeColconBuildLogFlow',
    inputSchema: AnalyzeColconBuildLogInputSchema,
    outputSchema: AnalyzeColconBuildLogOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
