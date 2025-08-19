import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Users, ChevronLeft, ChevronRight } from "lucide-react";

interface PsychometricData {
  interests: number[];
  personality: number[];
  workStyle: number[];
}

interface Props {
  data: PsychometricData;
  onUpdate: (data: PsychometricData) => void;
  onNext: () => void;
  onPrev: () => void;
}

const interestQuestions = [
  {
    id: 1,
    question: "I enjoy analyzing complex problems and finding ethical solutions",
    category: "analytical"
  },
  {
    id: 2,
    question: "I feel motivated when working on technology that impacts society",
    category: "social-impact"
  },
  {
    id: 3,
    question: "I find philosophical discussions about right and wrong engaging",
    category: "ethics"
  },
  {
    id: 4,
    question: "I'm drawn to understanding how AI systems make decisions",
    category: "technical-curiosity"
  },
  {
    id: 5,
    question: "I care deeply about fairness and bias in automated systems",
    category: "justice"
  }
];

const personalityQuestions = [
  {
    id: 6,
    question: "I remain calm and objective when facing ethical dilemmas",
    category: "emotional-stability"
  },
  {
    id: 7,
    question: "I can see multiple perspectives on controversial issues",
    category: "openness"
  },
  {
    id: 8,
    question: "I prefer collaborative problem-solving over working alone",
    category: "agreeableness"
  },
  {
    id: 9,
    question: "I'm comfortable with ambiguity and uncertain outcomes",
    category: "tolerance-ambiguity"
  },
  {
    id: 10,
    question: "I actively seek feedback to improve my thinking",
    category: "growth-mindset"
  }
];

const workStyleQuestions = [
  {
    id: 11,
    question: "I prefer structured frameworks when making decisions",
    category: "structure-preference"
  },
  {
    id: 12,
    question: "I enjoy communicating complex ideas to diverse audiences",
    category: "communication"
  },
  {
    id: 13,
    question: "I'm energized by interdisciplinary collaboration",
    category: "collaboration"
  },
  {
    id: 14,
    question: "I can maintain focus on long-term ethical implications",
    category: "long-term-thinking"
  },
  {
    id: 15,
    question: "I feel responsible for the broader impact of my work",
    category: "responsibility"
  }
];

export const PsychometricSection = ({ data, onUpdate, onNext, onPrev }: Props) => {
  const [currentSubsection, setCurrentSubsection] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  
  const subsections = [
    { 
      title: "Interest Assessment", 
      questions: interestQuestions, 
      icon: Heart,
      description: "How much do these activities appeal to you?"
    },
    { 
      title: "Personality Traits", 
      questions: personalityQuestions, 
      icon: Brain,
      description: "How well do these statements describe you?"
    },
    { 
      title: "Work Style Preferences", 
      questions: workStyleQuestions, 
      icon: Users,
      description: "What kind of work environment suits you?"
    }
  ];

  const currentQuestions = subsections[currentSubsection].questions;
  const progress = ((currentSubsection + 1) / subsections.length) * 100;

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: parseInt(value) }));
  };

  const canProceed = currentQuestions.every(q => answers[q.id] !== undefined);

  const handleNext = () => {
    if (currentSubsection < subsections.length - 1) {
      setCurrentSubsection(currentSubsection + 1);
    } else {
      // Save all answers and proceed to next section
      const interests = interestQuestions.map(q => answers[q.id] || 0);
      const personality = personalityQuestions.map(q => answers[q.id] || 0);
      const workStyle = workStyleQuestions.map(q => answers[q.id] || 0);
      
      onUpdate({ interests, personality, workStyle });
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
            <div className="p-3 bg-primary/10 rounded-xl">
              <CurrentIcon className="w-8 h-8 text-primary" />
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
        {currentQuestions.map((question) => (
          <Card key={question.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="font-medium">{question.question}</p>
                <RadioGroup
                  value={answers[question.id]?.toString() || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  className="flex flex-col space-y-2"
                >
                  {[
                    { value: "1", label: "Strongly Disagree" },
                    { value: "2", label: "Disagree" },
                    { value: "3", label: "Neutral" },
                    { value: "4", label: "Agree" },
                    { value: "5", label: "Strongly Agree" }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                      <Label 
                        htmlFor={`${question.id}-${option.value}`}
                        className="cursor-pointer flex-1"
                      >
                        {option.label}
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