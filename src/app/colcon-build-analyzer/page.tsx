import { ColconBuildAnalyzerForm } from "./colcon-build-analyzer-form";

export default function ColconBuildAnalyzerPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Colcon Build Error Analyzer
        </h1>
        <p className="text-muted-foreground mt-2">
          Paste your colcon build log to identify common ROS2 and CMake errors
          and receive suggestions for fixes.
        </p>
      </header>
      <main>
        <ColconBuildAnalyzerForm />
      </main>
    </div>
  );
}
