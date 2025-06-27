import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCode2, GitFork, HelpCircle, Terminal } from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    icon: <HelpCircle className="h-8 w-8 text-primary" />,
    title: 'RAG-based Question Answering',
    description:
      'Get answers to your ROS2 questions, backed by official documentation and internal knowledge bases.',
    link: '/ros-qa',
    cta: 'Ask a Question',
  },
  {
    icon: <GitFork className="h-8 w-8 text-primary" />,
    title: 'TF Tree Interpreter',
    description:
      'Analyze TF trees to detect issues like missing frames or coordinate mismatches and get troubleshooting suggestions.',
    link: '/tf-tree-analyzer',
    cta: 'Analyze TF Tree',
  },
  {
    icon: <FileCode2 className="h-8 w-8 text-primary" />,
    title: 'Launch File Debugger',
    description:
      'Debug ROS2 launch files (XML, YAML, Python) to find structural or syntax issues and receive proposed fixes.',
    link: '/launch-file-debugger',
    cta: 'Debug Launch File',
  },
  {
    icon: <Terminal className="h-8 w-8 text-primary" />,
    title: 'Colcon Build Analyzer',
    description:
      'Parse colcon build logs to identify common ROS2/CMake errors and get actionable suggestions to fix them.',
    link: '/colcon-build-analyzer',
    cta: 'Analyze Build Log',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">
          QROS: Your ROS2 Co-Pilot
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          An intelligent suite of tools designed to streamline your ROS2 development workflow, from debugging to documentation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 w-full max-w-4xl">
        {tools.map((tool) => (
          <Card key={tool.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
              {tool.icon}
              <div className="flex-1">
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription className="mt-2">{tool.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button asChild className="w-full">
                <Link href={tool.link}>{tool.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
