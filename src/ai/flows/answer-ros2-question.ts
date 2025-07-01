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

const AnswerRos2QuestionInputSchema = z.object({
  question: z.string().describe('The question about ROS2.'),
});
export type AnswerRos2QuestionInput = z.infer<typeof AnswerRos2QuestionInputSchema>;

const AnswerRos2QuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question, grounded in ROS2 and Yamaha Robotics documentation.'),
  sources: z.array(z.string()).describe('The sources used to answer the question.'),
});
export type AnswerRos2QuestionOutput = z.infer<typeof AnswerRos2QuestionOutputSchema>;

export async function answerRos2Question(input: AnswerRos2QuestionInput): Promise<AnswerRos2QuestionOutput> {
  return answerRos2QuestionFlow(input);
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
