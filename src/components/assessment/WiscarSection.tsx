import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";

interface WiscarData {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

interface Props {
  data: WiscarData;
  onUpdate: (data: WiscarData) => void;
  onNext: () => void;
  onPrev: () => void;
}

const wiscarDimensions = [
  {
    key: 'will' as keyof WiscarData,
    title: 'Will (Motivation & Grit)',
    description: 'Your drive and persistence in pursuing AI ethics work',
    scenarios: [
      'You encounter a complex ethical dilemma with no clear solution',
      'You need to advocate for ethical AI practices despite organizational resistance',
      'You must stay updated with rapidly evolving AI ethics landscape'
    ]
  },
  {
    key: 'interest' as keyof WiscarData,
    title: 'Interest (Passion for Ethics)',
    description: 'Your genuine engagement with ethical issues in technology',
    scenarios: [
      'Discussing the societal implications of AI decisions',
      'Researching cross-cultural perspectives on AI ethics',
      'Analyzing case studies of AI bias and fairness'
    ]
  },
  {
    key: 'skill' as keyof WiscarData,
    title: 'Skill (Current Capabilities)',
    description: 'Your present abilities in analysis, communication, and reasoning',
    scenarios: [
      'Writing clear reports on complex ethical issues',
      'Facilitating discussions between technical and non-technical stakeholders',
      'Synthesizing information from diverse sources to make recommendations'
    ]
  },
  {
    key: 'cognitive' as keyof WiscarData,
    title: 'Cognitive Readiness',
    description: 'Your capacity for analytical and empathetic reasoning',
    scenarios: [
      'Balancing multiple ethical frameworks when making decisions',
      'Understanding the perspectives of different stakeholders',
      'Processing ambiguous situations without clear right/wrong answers'
    ]
  },
  {
    key: 'ability' as keyof WiscarData,
    title: 'Ability to Learn',
    description: 'Your openness to feedback and capacity for growth',
    scenarios: [
      'Adapting your approach based on constructive criticism',
      'Learning new technical concepts to better understand AI systems',
      'Evolving your ethical thinking as you encounter new perspectives'
    ]
  },
  {
    key: 'realWorld' as keyof WiscarData,
    title: 'Real-World Alignment',
    description: 'Your understanding of and fit with actual AI ethics work contexts',
    scenarios: [
      'Working in interdisciplinary teams with varying priorities',
      'Navigating organizational politics while maintaining ethical standards',
      'Balancing idealistic ethics with practical business constraints'
    ]
  }
];

export const WiscarSection = ({ data, onUpdate, onNext, onPrev }: Props) => {
  const [currentDimension, setCurrentDimension] = useState(0);
  const [scores, setScores] = useState<WiscarData>(data);
  
  const progress = ((currentDimension + 1) / wiscarDimensions.length) * 100;
  const currentDim = wiscarDimensions[currentDimension];

  const handleScoreChange = (value: number[]) => {
    const newScores = { ...scores, [currentDim.key]: value[0] };
    setScores(newScores);
  };

  const handleNext = () => {
    if (currentDimension < wiscarDimensions.length - 1) {
      setCurrentDimension(currentDimension + 1);
    } else {
      onUpdate(scores);
      onNext();
    }
  };

  const handlePrev = () => {
    if (currentDimension > 0) {
      setCurrentDimension(currentDimension - 1);
    } else {
      onPrev();
    }
  };

  const currentScore = scores[currentDim.key];
  const scoreLabel = currentScore <= 1 ? 'Very Low' : 
                    currentScore <= 2 ? 'Low' : 
                    currentScore <= 3 ? 'Moderate' : 
                    currentScore <= 4 ? 'High' : 'Very High';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-tertiary/10 rounded-xl">
              <Users className="w-8 h-8 text-tertiary" />
            </div>
          </div>
          <CardTitle className="text-2xl">WISCAR Framework Assessment</CardTitle>
          <CardDescription>
            Comprehensive evaluation across 6 key readiness dimensions
          </CardDescription>
          <Progress value={progress} className="mt-4" />
          <div className="text-sm text-muted-foreground mt-2">
            Dimension {currentDimension + 1} of {wiscarDimensions.length}
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentDim.title}</CardTitle>
          <CardDescription>{currentDim.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-4 block">
              Rate your confidence in these scenarios:
            </Label>
            <div className="space-y-3 mb-6">
              {currentDim.scenarios.map((scenario, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-tertiary rounded-full mt-2"></div>
                  <span className="text-sm">{scenario}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Your Overall Confidence:</Label>
              <div className="text-lg font-bold text-tertiary">{scoreLabel}</div>
            </div>
            
            <div className="px-3">
              <Slider
                value={[currentScore]}
                onValueChange={handleScoreChange}
                max={5}
                min={1}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Very Low</span>
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
                <span>Very High</span>
              </div>
            </div>

            <div className="p-4 bg-accent/50 rounded-lg">
              <p className="text-sm">
                <strong>Current rating: {currentScore.toFixed(1)}/5.0</strong>
                <br />
                Consider your current abilities, not your potential. Be honest - this helps create 
                a more accurate learning plan for you.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-6 gap-2">
            {wiscarDimensions.map((dim, index) => (
              <div key={dim.key} className="text-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-1 ${
                    index < currentDimension 
                      ? 'bg-success text-white' 
                      : index === currentDimension 
                      ? 'bg-tertiary text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index < currentDimension ? '✓' : index + 1}
                </div>
                <div className="text-xs text-muted-foreground">
                  {dim.title.split(' ')[0]}
                </div>
                {index < currentDimension && (
                  <div className="text-xs font-medium text-success">
                    {scores[dim.key].toFixed(1)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={handlePrev} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button onClick={handleNext} className="gap-2">
          {currentDimension < wiscarDimensions.length - 1 ? 'Continue' : 'View Results'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};