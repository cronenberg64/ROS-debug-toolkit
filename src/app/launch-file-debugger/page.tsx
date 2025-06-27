import { LaunchFileDebuggerForm } from "./launch-file-debugger-form";

export default function LaunchFileDebuggerPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Launch File Debugger
        </h1>
        <p className="text-muted-foreground mt-2">
          Debug your ROS2 launch files (XML, YAML, or Python) by identifying
          structural or syntax issues and getting proposed fixes.
        </p>
      </header>
      <main>
        <LaunchFileDebuggerForm />
      </main>
    </div>
  );
}
