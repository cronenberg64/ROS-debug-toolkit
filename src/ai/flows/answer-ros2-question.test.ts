import { answerRos2Question } from './answer-ros2-question';
import fs from 'fs';

describe('answerRos2Question', () => {
  beforeAll(() => {
    // Create a mock doc file for retrieval
    fs.writeFileSync('docs/test-doc.md', 'ROS2 is a set of software libraries and tools. Custom messages are defined in .msg files.');
  });
  afterAll(() => {
    fs.unlinkSync('docs/test-doc.md');
  });

  it('should retrieve relevant docs and return sources', async () => {
    // Mock the LLM prompt (patch global.prompt if needed)
    const result = await answerRos2Question({ question: 'How do I define a custom message in ROS2?' });
    expect(result.sources).toContain('test-doc.md');
    expect(typeof result.answer).toBe('string');
  });
}); 