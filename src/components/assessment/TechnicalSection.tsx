import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Target, Code, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

interface TechnicalData {
  aptitude: number[];
  knowledge: number[];
  domain: number[];
}

interface Props {
  data: TechnicalData;
  onUpdate: (data: TechnicalData) => void;
  onNext: () => void;
  onPrev: () => void;
}

const aptitudeQuestions = [
  {
    id: 1,
    question: "If an AI system shows bias against certain groups, what would be your first step?",
    options: [
      "Immediately stop using the system",
      "Analyze the training data for potential bias sources",
      "Adjust the algorithm parameters",
      "Gather more diverse training data"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "A company's facial recognition system works well for some ethnic groups but poorly for others. This is primarily an issue of:",
    options: [
      "Technical limitations",
      "Algorithmic bias and representation",
      "Hardware constraints",
      "User error"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "In ethical decision-making, which approach focuses on the consequences of actions?",
    options: [
      "Deontological ethics",
      "Virtue ethics",
      "Consequentialist ethics",
      "Care ethics"
    ],
    correct: 2
  },
  {
    id: 4,
    question: "What is the primary purpose of AI transparency?",
    options: [
      "To make AI systems faster",
      "To enable understanding and accountability",
      "To reduce computational costs",
      "To improve accuracy"
    ],
    correct: 1
  },
  {
    id: 5,
    question: "If you discover an AI hiring tool discriminates against women, your recommendation should prioritize:",
    options: [
      "Improving the algorithm's accuracy",
      "Ensuring fairness and legal compliance",
      "Reducing processing time",
      "Increasing the dataset size"
    ],
    correct: 1
  }
];

const knowledgeQuestions = [
  {
    id: 6,
    question: "What does GDPR primarily regulate in relation to AI?",
    options: [
      "AI algorithm efficiency",
      "Personal data processing and automated decision-making",
      "AI hardware specifications",
      "AI research funding"
    ],
    correct: 1
  },
  {
    id: 7,
    question: "Which of these is NOT typically considered a principle of responsible AI?",
    options: [
      "Fairness",
      "Transparency",
      "Profitability",
      "Accountability"
    ],
    correct: 2
  },
  {
    id: 8,
    question: "Algorithmic auditing primarily involves:",
    options: [
      "Checking code for bugs",
      "Evaluating AI systems for bias and fairness",
      "Optimizing performance",
      "Reducing costs"
    ],
    correct: 1
  },
  {
    id: 9,
    question: "The concept of 'explainable AI' is important because:",
    options: [
      "It makes AI faster",
      "It helps users understand AI decisions",
      "It reduces memory usage",
      "It improves accuracy"
    ],
    correct: 1
  },
  {
    id: 10,
    question: "In the context of AI ethics, what is 'value alignment'?",
    options: [
      "Aligning AI costs with budgets",
      "Ensuring AI systems reflect human values and goals",
      "Matching AI performance metrics",
      "Coordinating AI development timelines"
    ],
    correct: 1
  }
];

const domainQuestions = [
  {
    id: 11,
    question: "You're reviewing an AI system used in criminal justice. Your main ethical concern should be:",
    options: [
      "System processing speed",
      "Potential bias affecting fair treatment",
      "Database storage capacity",
      "User interface design"
    ],
    correct: 1
  },
  {
    id: 12,
    question: "A healthcare AI makes treatment recommendations. The most critical ethical requirement is:",
    options: [
      "Fast processing",
      "Low cost",
      "Accuracy and patient safety",
      "Easy integration"
    ],
    correct: 2
  },
  {
    id: 13,
    question: "When implementing AI governance in an organization, you should start with:",
    options: [
      "Buying the latest AI tools",
      "Establishing ethical principles and guidelines",
      "Hiring more developers",
      "Increasing computing power"
    ],
    correct: 1
  },
  {
    id: 14,
    question: "If an AI system violates privacy rights, the appropriate response is:",
    options: [
      "Continue use but inform users",
      "Immediately investigate and remediate",
      "Increase security measures only",
      "Ignore if performance is good"
    ],
    correct: 1
  },
  {
    id: 15,
    question: "Cross-cultural AI ethics considerations are important because:",
    options: [
      "They improve technical performance",
      "Different cultures have varying values and norms",
      "They reduce development costs",
      "They speed up deployment"
    ],
    correct: 1
  }
];

export const TechnicalSection = ({ data, onUpdate, onNext, onPrev }: Props) => {
  const [currentSubsection, setCurrentSubsection] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  
  const subsections = [
    { 
      title: "Logical Reasoning", 
      questions: aptitudeQuestions, 
      icon: Target,
      description: "Test your analytical and ethical reasoning skills"
    },
    { 
      title: "AI Ethics Knowledge", 
      questions: knowledgeQuestions, 
      icon: BookOpen,
      description: "Assess your understanding of AI ethics principles"
    },
    { 
      title: "Applied Ethics", 
      questions: domainQuestions, 
      icon: Code,
      description: "Apply ethical thinking to real-world scenarios"
    }
  ];

  const currentQuestions = subsections[currentSubsection].questions;
  const progress = ((currentSubsection + 1) / subsections.length) * 100;

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: parseInt(value) }));
  };

  const canProceed = currentQuestions.every(q => answers[q.id] !== undefined);

  const calculateScore = (questions: typeof aptitudeQuestions) => {
    return questions.map(q => {
      const userAnswer = answers[q.id];
      return userAnswer === q.correct ? 5 : userAnswer !== undefined ? 2 : 0;
    });
  };

  const handleNext = () => {
    if (currentSubsection < subsections.length - 1) {
      setCurrentSubsection(currentSubsection + 1);
    } else {
      // Calculate scores and proceed
      const aptitude = calculateScore(aptitudeQuestions);
      const knowledge = calculateScore(knowledgeQuestions);
      const domain = calculateScore(domainQuestions);
      
      onUpdate({ aptitude, knowledge, domain });
      onNext();
    }
  };

  const handlePrev = () => {
    if (currentSubsection > 0) {
      setCurrentSubsection(currentSubsection - 1);
    } else {
      onPrev();
    }
  };

  const CurrentIcon = subsections[currentSubsection].icon;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-secondary/10 rounded-xl">
              <CurrentIcon className="w-8 h-8 text-secondary" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            {subsections[currentSubsection].title}
          </CardTitle>
          <CardDescription>
            {subsections[currentSubsection].description}
          </CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      <div className="space-y-6">
        {currentQuestions.map((question, qIndex) => (
          <Card key={question.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-full text-secondary font-bold text-sm">
                    {qIndex + 1}
                  </div>
                  <p className="font-medium flex-1">{question.question}</p>
                </div>
                <RadioGroup
                  value={answers[question.id]?.toString() || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  className="pl-11 space-y-3"
                >
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={optIndex.toString()} 
                        id={`${question.id}-${optIndex}`} 
                      />
                      <Label 
                        htmlFor={`${question.id}-${optIndex}`}
                        className="cursor-pointer flex-1"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={handlePrev} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!canProceed}
          className="gap-2"
        >
          {currentSubsection < subsections.length - 1 ? 'Continue' : 'Next Section'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};