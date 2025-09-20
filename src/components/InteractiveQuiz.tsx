import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  RefreshCcw, 
  CheckCircle2, 
  XCircle, 
  Brain,
  Target,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "earthquake1",
    question: "During an earthquake, what should you do first?",
    options: ["Run outside immediately", "Drop, cover, and hold on", "Stand in a doorway", "Hide under a bed"],
    correctAnswer: 1,
    explanation: "Drop to hands and knees, take cover under sturdy furniture, and hold on until shaking stops.",
    category: "Natural Disasters",
    difficulty: "easy"
  },
  {
    id: "fire1", 
    question: "If your clothes catch fire, what should you do?",
    options: ["Run to get help", "Stop, drop, and roll", "Jump in water", "Remove clothes quickly"],
    correctAnswer: 1,
    explanation: "Stop, drop to the ground, and roll to smother the flames. Running makes fire burn faster.",
    category: "Fire Safety",
    difficulty: "easy"
  },
  {
    id: "medical1",
    question: "What are the signs of a heart attack?",
    options: [
      "Only chest pain", 
      "Chest pain, shortness of breath, nausea, sweating",
      "Just feeling tired",
      "Only arm pain"
    ],
    correctAnswer: 1,
    explanation: "Heart attack symptoms include chest pain/discomfort, shortness of breath, nausea, sweating, and pain in arms, neck, or jaw.",
    category: "Medical Emergency",
    difficulty: "medium"
  },
  {
    id: "tsunami1",
    question: "How much time do you typically have to evacuate after feeling an earthquake near the coast?",
    options: ["30 minutes", "1 hour", "5-20 minutes", "2 hours"],
    correctAnswer: 2,
    explanation: "You may have only 5-20 minutes to reach high ground after a strong coastal earthquake. Don't wait for warnings!",
    category: "Natural Disasters", 
    difficulty: "hard"
  },
  {
    id: "kit1",
    question: "How much water should you store per person per day in an emergency kit?",
    options: ["1/2 gallon", "1 gallon", "2 gallons", "1/4 gallon"],
    correctAnswer: 1,
    explanation: "Store at least 1 gallon of water per person per day for drinking, cooking, and sanitation.",
    category: "Emergency Preparedness",
    difficulty: "medium"
  }
];

const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizQuestions.length).fill(false));
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct! Well done! 🎉");
    } else {
      toast.error("Not quite right. Check the explanation!");
    }

    // Mark question as answered
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      toast.success(`Quiz completed! Final score: ${score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 1 : 0)}/${quizQuestions.length}`);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
    setQuizCompleted(false);
    toast.success("Quiz reset! Good luck!");
  };

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / quizQuestions.length) * 100;
  const finalScore = quizCompleted ? score + (selectedAnswer === currentQ?.correctAnswer ? 1 : 0) : score;

  if (quizCompleted) {
    const percentage = (finalScore / quizQuestions.length) * 100;
    return (
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-10 h-10 text-success" />
              </div>
              <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-4xl font-bold text-foreground">
                {finalScore}/{quizQuestions.length}
              </div>
              <div className="text-xl text-muted-foreground">
                {percentage >= 80 ? "Excellent work! 🏆" :
                 percentage >= 60 ? "Good job! 👍" :
                 "Keep practicing! 💪"}
              </div>
              
              <div className="space-y-2">
                <Progress value={percentage} className="h-4" />
                <p className="text-sm text-muted-foreground">
                  {percentage.toFixed(0)}% Correct
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-success font-semibold">Strengths</div>
                  <div className="text-muted-foreground">
                    {percentage >= 60 ? "Emergency procedures" : "Basic safety knowledge"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-accent font-semibold">Focus Areas</div>
                  <div className="text-muted-foreground">
                    {percentage < 60 ? "Review all categories" : "Advanced scenarios"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={resetQuiz} className="bg-primary hover:bg-primary-dark text-primary-foreground">
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
                <Button variant="outline">
                  View Learning Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Brain className="w-5 h-5" />
            Interactive Learning
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Test Your Knowledge
          </h2>
          <p className="text-lg text-muted-foreground">
            Challenge yourself with real disaster scenarios and safety questions
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm text-muted-foreground">
                Score: {score}/{Math.max(currentQuestion, 1)}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {currentQ.category}
              </Badge>
              <Badge 
                variant={currentQ.difficulty === 'hard' ? 'destructive' : 
                       currentQ.difficulty === 'medium' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {currentQ.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                let buttonStyle = "text-left h-auto p-4 justify-start";
                
                if (showResult) {
                  if (index === currentQ.correctAnswer) {
                    buttonStyle += " bg-success/10 border-success text-success hover:bg-success/20";
                  } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                    buttonStyle += " bg-destructive/10 border-destructive text-destructive hover:bg-destructive/20";
                  } else {
                    buttonStyle += " opacity-50";
                  }
                } else if (selectedAnswer === index) {
                  buttonStyle += " bg-primary/10 border-primary text-primary";
                }

                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={buttonStyle}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {showResult && index === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      )}
                      {showResult && index === selectedAnswer && index !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <Card className="bg-secondary/50 border-secondary">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Explanation</h4>
                      <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {!showResult ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                >
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <>
                      Next Question
                      <Zap className="ml-2 w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Finish Quiz
                      <Trophy className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={resetQuiz}
                className="px-6"
              >
                <RefreshCcw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InteractiveQuiz;