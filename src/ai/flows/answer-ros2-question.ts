// src/ai/flows/answer-ros2-question.ts
'use server';

/**
 * @fileOverview Answers questions about ROS2, using official ROS2 documentation.
 *
 * - answerRos2Question - A function that answers ROS2 questions.
 * - AnswerRos2QuestionInput - The input type for the answerRos2Question function.
 * - AnswerRos2QuestionOutput - The return type for the answerRos2Question function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import fs from 'fs';
import path from 'path';

const AnswerRos2QuestionInputSchema = z.object({
  question: z.string().describe('The question about ROS2.'),
});
export type AnswerRos2QuestionInput = z.infer<typeof AnswerRos2QuestionInputSchema>;

const AnswerRos2QuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question, grounded in ROS2 and Yamaha Robotics documentation.'),
  sources: z.array(z.string()).describe('The sources used to answer the question.'),
});
export type AnswerRos2QuestionOutput = z.infer<typeof AnswerRos2QuestionOutputSchema>;

/**
 * Simple keyword-based retrieval from local markdown docs.
 * Returns an array of {file, snippet} objects.
 */
async function retrieveRelevantDocs(question: string, maxResults = 3): Promise<{file: string, snippet: string}[]> {
  const docsDir = path.resolve(process.cwd(), 'docs');
  const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));
  const results: {file: string, snippet: string, score: number}[] = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
    // Simple keyword match: count question words in content
    const words = question.toLowerCase().split(/\W+/).filter(Boolean);
    let score = 0;
    for (const w of words) {
      if (content.toLowerCase().includes(w)) score++;
    }
    if (score > 0) {
      // Take a snippet (first 300 chars containing a keyword)
      const idx = content.toLowerCase().indexOf(words[0]);
      const snippet = idx >= 0 ? content.slice(Math.max(0, idx - 50), idx + 250) : content.slice(0, 300);
      results.push({file, snippet, score});
    }
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxResults).map(r => ({file: r.file, snippet: r.snippet}));
}

export async function answerRos2Question(input: AnswerRos2QuestionInput): Promise<AnswerRos2QuestionOutput> {
  // Retrieve relevant docs
  const docs = await retrieveRelevantDocs(input.question);
  const sources = docs.map(d => d.file);
  // Compose context for the LLM
  const context = docs.map(d => `Source: ${d.file}\n${d.snippet}`).join('\n---\n');
  // Call the LLM with context
  const {output} = await prompt({
    question: `${input.question}\n\nContext:\n${context}`
  });
  return {
    answer: output!.answer,
    sources,
  };
}

const prompt = ai.definePrompt({
  name: 'answerRos2QuestionPrompt',
  input: {schema: AnswerRos2QuestionInputSchema},
  output: {schema: AnswerRos2QuestionOutputSchema},
  prompt: `You are a ROS2 expert. Answer the following question, grounding your answer in the official ROS2 documentation. Your answer should be general and applicable to a wide audience of ROS2 users. Avoid referencing specific company's internal documentation or hardware unless the question explicitly asks for it. Format your answer using Markdown for clear presentation, including lists, bolding, and code snippets where appropriate.

Question: {{{question}}}

Answer:`, 
});

const answerRos2QuestionFlow = ai.defineFlow(
  {
    name: 'answerRos2QuestionFlow',
    inputSchema: AnswerRos2QuestionInputSchema,
    outputSchema: AnswerRos2QuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // TODO: Implement RAG to retrieve information from indexed ROS2 documentation.
    // For now, just return the LLM's answer.
    return {
      answer: output!.answer,
      sources: [], // Add sources here when RAG is implemented
    };
  }
);
