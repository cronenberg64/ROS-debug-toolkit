'use server';

/**
 * @fileOverview A launch file debugger AI agent.
 *
 * - debugLaunchFile - A function that handles the launch file debugging process.
 * - DebugLaunchFileInput - The input type for the debugLaunchFile function.
 * - DebugLaunchFileOutput - The return type for the debugLaunchFile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DebugLaunchFileInputSchema = z.object({
  launchFileContent: z
    .string()
    .describe('The content of the launch file (XML, YAML, or Python).'),
  launchFileType: z
    .enum(['xml', 'yaml', 'py'])
    .describe('The type of the launch file.'),
});
export type DebugLaunchFileInput = z.infer<typeof DebugLaunchFileInputSchema>;

const DebugLaunchFileOutputSchema = z.object({
  issuesDetected: z.boolean().describe('Whether or not issues were detected.'),
  suggestions: z
    .string()
    .describe('Suggestions for fixing the launch file, if any.'),
  explanation: z.string().describe('Explanation of detected issues.'),
});
export type DebugLaunchFileOutput = z.infer<typeof DebugLaunchFileOutputSchema>;

export async function debugLaunchFile(
  input: DebugLaunchFileInput
): Promise<DebugLaunchFileOutput> {
  return debugLaunchFileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'debugLaunchFilePrompt',
  input: {schema: DebugLaunchFileInputSchema},
  output: {schema: DebugLaunchFileOutputSchema},
  prompt: `You are an expert ROS2 developer specializing in debugging launch files.

You will analyze the provided launch file content and identify any structural or syntax issues.
Based on the identified issues, you will provide suggestions for fixing them and an explanation of the issues detected. Use Markdown for formatting your suggestions and explanation, including code blocks for any code changes.

Launch File Type: {{{launchFileType}}}
Launch File Content:
\`\`\`
{{{launchFileContent}}}
\`\`\`

Your response should include whether issues were detected, suggestions for fixing them (if any), and a clear explanation of the detected issues.
`,
});

const debugLaunchFileFlow = ai.defineFlow(
  {
    name: 'debugLaunchFileFlow',
    inputSchema: DebugLaunchFileInputSchema,
    outputSchema: DebugLaunchFileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
