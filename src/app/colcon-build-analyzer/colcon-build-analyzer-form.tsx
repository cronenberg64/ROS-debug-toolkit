"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  analyzeColconBuildLog,
  type AnalyzeColconBuildLogOutput,
} from "@/ai/flows/analyze-colcon-build-log";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const formSchema = z.object({
  log: z.string().min(50, "Please provide a more substantial log for analysis."),
});

export function ColconBuildAnalyzerForm() {
  const [result, setResult] = useState<AnalyzeColconBuildLogOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { log: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await analyzeColconBuildLog(values);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="log"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Colcon Build Log</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your full colcon build log here..."
                    className="min-h-[300px] font-mono text-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Log
          </Button>
        </form>
      </Form>

      {isLoading && (
         <div className="flex items-center justify-center pt-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Analyzing log...</p>
        </div>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.issues.length === 0 ? (
                <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>No Issues Found</AlertTitle>
                    <AlertDescription>
                        The analysis did not find any common issues in the provided colcon build log.
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="space-y-4">
                    {result.issues.map((issue, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <AlertTriangle className="h-5 w-5 text-destructive" />
                                    {issue.title}
                                </CardTitle>
                                <CardDescription className="pt-2">
                                  <div className="prose prose-sm dark:prose-invert max-w-full prose-pre:whitespace-pre-wrap">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{issue.explanation}</ReactMarkdown>
                                  </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <h4 className="font-semibold mb-2">Suggestion</h4>
                                <div className="prose prose-sm dark:prose-invert text-muted-foreground max-w-full prose-pre:whitespace-pre-wrap">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{issue.suggestion}</ReactMarkdown>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
