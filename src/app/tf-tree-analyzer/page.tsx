import { TfTreeAnalyzerForm } from "./tf-tree-analyzer-form";

export default function TfTreeAnalyzerPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          TF Tree Interpreter
        </h1>
        <p className="text-muted-foreground mt-2">
          Analyze a TF tree to detect potential issues like missing frames or
          coordinate frame mismatches and get suggested solutions.
        </p>
      </header>
      <main>
        <TfTreeAnalyzerForm />
      </main>
    </div>
  );
}
