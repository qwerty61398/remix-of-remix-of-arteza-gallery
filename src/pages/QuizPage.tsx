import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: { label: string; collections: string[] }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What colors make you feel most at peace?",
    options: [
      { label: "Warm earth tones (orange, brown, terracotta)", collections: ["cultural-chronicles", "natures-palette"] },
      { label: "Bold and vibrant (red, blue, yellow)", collections: ["abstract-expressions"] },
      { label: "Soft and dreamy (pastels, muted tones)", collections: ["dreamscapes", "portraits-and-personalities"] },
      { label: "Cool and serene (blue, green, purple)", collections: ["natures-palette", "dreamscapes"] },
    ],
  },
  {
    id: 2,
    question: "What mood do you want your art to evoke?",
    options: [
      { label: "Energy and passion", collections: ["abstract-expressions"] },
      { label: "Tranquility and calm", collections: ["natures-palette", "dreamscapes"] },
      { label: "Connection and emotion", collections: ["portraits-and-personalities"] },
      { label: "Cultural pride and heritage", collections: ["cultural-chronicles"] },
    ],
  },
  {
    id: 3,
    question: "What subjects interest you most?",
    options: [
      { label: "Landscapes and nature", collections: ["natures-palette"] },
      { label: "People and portraits", collections: ["portraits-and-personalities"] },
      { label: "Abstract shapes and colors", collections: ["abstract-expressions"] },
      { label: "Cultural and traditional themes", collections: ["cultural-chronicles"] },
    ],
  },
  {
    id: 4,
    question: "Where would you hang your new painting?",
    options: [
      { label: "Living room - a statement piece", collections: ["abstract-expressions", "cultural-chronicles"] },
      { label: "Bedroom - something calming", collections: ["dreamscapes", "natures-palette"] },
      { label: "Office - inspiring and thoughtful", collections: ["portraits-and-personalities", "abstract-expressions"] },
      { label: "Hallway - eye-catching and colorful", collections: ["cultural-chronicles", "natures-palette"] },
    ],
  },
  {
    id: 5,
    question: "How would you describe your personal style?",
    options: [
      { label: "Modern and minimalist", collections: ["abstract-expressions"] },
      { label: "Bohemian and eclectic", collections: ["cultural-chronicles", "dreamscapes"] },
      { label: "Classic and elegant", collections: ["portraits-and-personalities", "natures-palette"] },
      { label: "Romantic and dreamy", collections: ["dreamscapes", "portraits-and-personalities"] },
    ],
  },
];

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
      setAnswers(answers.slice(0, -1));
    }
  };

  const getRecommendedCollection = () => {
    const collectionScores: Record<string, number> = {};

    answers.forEach((answerIndex, questionIndex) => {
      const option = questions[questionIndex].options[answerIndex];
      option.collections.forEach((collection) => {
        collectionScores[collection] = (collectionScores[collection] || 0) + 1;
      });
    });

    const topCollection = Object.entries(collectionScores).sort((a, b) => b[1] - a[1])[0];
    return topCollection?.[0] || "natures-palette";
  };

  if (showResult) {
    const recommendedSlug = getRecommendedCollection();
    const collectionNames: Record<string, string> = {
      "abstract-expressions": "Abstract Expressions",
      "cultural-chronicles": "Cultural Chronicles",
      "dreamscapes": "Dreamscapes",
      "natures-palette": "Nature's Palette",
      "portraits-and-personalities": "Portraits and Personalities",
    };

    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 animate-fade-in">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <Check className="h-10 w-10 text-primary" />
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Perfect Match Found!
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Based on your answers, we recommend exploring our
            </p>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                {collectionNames[recommendedSlug]}
              </h2>
              <p className="text-muted-foreground">
                This collection aligns perfectly with your taste and preferences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate(`/gallery/${recommendedSlug}`)} className="gap-2">
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setSelectedOption(null);
                  setShowResult(false);
                }}
              >
                Retake Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-[80vh] flex items-center py-12">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-primary animate-float" />
            </div>
            <span className="text-sm font-medium text-primary">Get Inspired</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
              Light Up Your Art Journey With A Collection That Speaks To You
            </h1>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Answer a few questions and discover artwork that matches your unique taste
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div key={currentQuestion} className="bg-card border border-border rounded-xl p-8 animate-fade-in">
            <h2 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-6 text-center">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  className={cn(
                    "w-full p-4 rounded-lg border text-left transition-all",
                    selectedOption === index
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="gap-2"
            >
              {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
