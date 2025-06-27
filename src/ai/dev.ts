import { config } from 'dotenv';
config();

import '@/ai/flows/debug-launch-file.ts';
import '@/ai/flows/answer-ros2-question.ts';
import '@/ai/flows/analyze-colcon-build-log.ts';
import '@/ai/flows/analyze-tf-tree.ts';