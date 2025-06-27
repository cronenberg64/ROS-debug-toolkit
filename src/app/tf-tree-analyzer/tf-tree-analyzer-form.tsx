"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  analyzeTfTree,
  type AnalyzeTfTreeOutput,
} from "@/ai/flows/analyze-tf-tree";
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
  tree: z
    .string()
    .min(20, "Please provide a more substantial TF tree for analysis."),
});

export function TfTreeAnalyzerForm() {
  const [result, setResult] = useState<AnalyzeTfTreeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { tree: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await analyzeTfTree(values.tree);
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
            name="tree"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">TF Tree</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your TF tree from 'ros2 run tf2_tools view_frames' here..."
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
            Analyze Tree
          </Button>
        </form>
      </Form>

      {isLoading && (
         <div className="flex items-center justify-center pt-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Analyzing tree...</p>
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
                        The analysis did not find any common issues in the provided TF tree.
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="space-y-4">
                    {result.issues.map((issue, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <AlertTriangle className="h-5 w-5 text-destructive" />
                                    Issue #{index + 1}
                                </CardTitle>
                                <CardDescription>
                                  <div className="prose prose-sm dark:prose-invert max-w-full prose-pre:whitespace-pre-wrap">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{issue.description}</ReactMarkdown>
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
