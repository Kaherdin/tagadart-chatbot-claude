import { QuestionAnswer } from "./components/question-answer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Website Assistant</h1>
            <p className="text-lg text-gray-600">
              Ask me anything about our website content
            </p>
          </header>
          <QuestionAnswer />
        </div>
      </div>
    </main>
  );
}
