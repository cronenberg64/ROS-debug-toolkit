import { RosQaForm } from "./ros-qa-form";

export default function RosQaPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Q&A
        </h1>
        <p className="text-muted-foreground mt-2">
          Ask any question about ROS2, and get answers from an AI assistant.
        </p>
      </header>
      <main>
        <RosQaForm />
      </main>
    </div>
  );
}
