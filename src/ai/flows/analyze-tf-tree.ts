// src/ai/flows/analyze-tf-tree.ts
'use server';

/**
 * @fileOverview Analyzes a TF tree for potential issues like missing frames or coordinate frame mismatches.
 *
 * - analyzeTfTree - A function that analyzes the TF tree and suggests solutions.
 * - AnalyzeTfTreeInput - The input type for the analyzeTfTree function.
 * - AnalyzeTfTreeOutput - The return type for the analyzeTfTree function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTfTreeInputSchema = z.string().describe('The TF tree to analyze.');
export type AnalyzeTfTreeInput = z.infer<typeof AnalyzeTfTreeInputSchema>;

const AnalyzeTfTreeOutputSchema = z.object({
  issues: z.array(
    z.object({
      description: z.string().describe('Description of the issue found.'),
      suggestion: z.string().describe('Suggested solution for the issue.'),
    })
  ).describe('List of issues found in the TF tree.'),
});
export type AnalyzeTfTreeOutput = z.infer<typeof AnalyzeTfTreeOutputSchema>;

export async function analyzeTfTree(input: AnalyzeTfTreeInput): Promise<AnalyzeTfTreeOutput> {
  return analyzeTfTreeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTfTreePrompt',
  input: {schema: AnalyzeTfTreeInputSchema},
  output: {schema: AnalyzeTfTreeOutputSchema},
  prompt: `You are a ROS2 expert. Analyze the following TF tree and identify any potential issues, such as missing frames or coordinate frame mismatches. Provide suggestions for resolving these issues.

TF Tree:
{{{$input}}}

Output the issues as a JSON array, as described by the output schema. Each issue should have a description and a suggested solution. Use Markdown for formatting the description and suggestion.
`,
});

const analyzeTfTreeFlow = ai.defineFlow(
  {
    name: 'analyzeTfTreeFlow',
    inputSchema: AnalyzeTfTreeInputSchema,
    outputSchema: AnalyzeTfTreeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
