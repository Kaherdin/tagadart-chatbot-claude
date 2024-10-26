// components/qa/question-answer.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Sources } from "./source";

interface Source {
  type: string;
  title: string;
  url?: string;
  page?: string;
}

export function QuestionAnswer() {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [sources, setSources] = React.useState<Source[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [answerId, setAnswerId] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAnswer("");
    setSources([]);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) throw new Error("Failed to get answer");

      const data = await response.json();
      setAnswer(data.answer);
      setSources(data.sources);
      setAnswerId(data.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRating = async (rating: number) => {
    if (!answerId) return;

    try {
      await fetch(`/api/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answerId,
          rating,
        }),
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>

      {error && <Card className="p-4 bg-red-50 text-red-700">{error}</Card>}

      {answer && (
        <Card className="overflow-hidden">
          <div className="p-6">
            <ReactMarkdown className="prose dark:prose-invert max-w-none">
              {answer}
            </ReactMarkdown>
          </div>

          {sources.length > 0 && (
            <div className="border-t bg-muted/50 p-6">
              <Sources sources={sources} />
            </div>
          )}

          <div className="border-t p-4 flex justify-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => handleRating(1)}>
              👍 Helpful
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleRating(-1)}>
              👎 Not helpful
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
