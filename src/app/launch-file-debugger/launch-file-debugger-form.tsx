"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  debugLaunchFile,
  type DebugLaunchFileOutput,
} from "@/ai/flows/debug-launch-file";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const formSchema = z.object({
  launchFileContent: z
    .string()
    .min(20, "Please provide a more substantial launch file for debugging."),
  launchFileType: z.enum(["xml", "yaml", "py"], {
    required_error: "You need to select a launch file type.",
  }),
});

export function LaunchFileDebuggerForm() {
  const [result, setResult] = useState<DebugLaunchFileOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { launchFileContent: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await debugLaunchFile(values);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Debug Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="launchFileContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Launch File Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your launch file content here..."
                    className="min-h-[300px] font-mono text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="launchFileType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Launch File Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="xml" />
                      </FormControl>
                      <FormLabel className="font-normal">XML</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yaml" />
                      </FormControl>
                      <FormLabel className="font-normal">YAML</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="py" />
                      </FormControl>
                      <FormLabel className="font-normal">Python</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Debug File
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="flex items-center justify-center pt-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Debugging file...</p>
        </div>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Debug Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant={result.issuesDetected ? "destructive" : "default"}>
              {result.issuesDetected ? (
                <AlertTriangle className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              <AlertTitle>
                {result.issuesDetected
                  ? "Issues Detected"
                  : "No Issues Detected"}
              </AlertTitle>
              <AlertDescription>
                <div className="prose prose-sm dark:prose-invert max-w-full prose-pre:whitespace-pre-wrap">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result.explanation}
                  </ReactMarkdown>
                </div>
              </AlertDescription>
            </Alert>
            {result.issuesDetected && (
              <div>
                <h3 className="font-semibold mb-2">Suggestions</h3>
                <div className="prose prose-sm dark:prose-invert max-w-full prose-pre:whitespace-pre-wrap">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result.suggestions}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
