import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Users, Target, Lightbulb, BookOpen, Award } from "lucide-react";
import { PsychometricSection } from "@/components/assessment/PsychometricSection";
import { TechnicalSection } from "@/components/assessment/TechnicalSection";
import { WiscarSection } from "@/components/assessment/WiscarSection";

export interface AssessmentData {
  psychometric: {
    interests: number[];
    personality: number[];
    workStyle: number[];
  };
  technical: {
    aptitude: number[];
    knowledge: number[];
    domain: number[];
  };
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
}

const Assessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    psychometric: { interests: [], personality: [], workStyle: [] },
    technical: { aptitude: [], knowledge: [], domain: [] },
    wiscar: { will: 0, interest: 0, skill: 0, cognitive: 0, ability: 0, realWorld: 0 }
  });

  const sections = [
    { 
      id: 'intro',
      title: 'Introduction', 
      icon: Lightbulb,
      description: 'Learn about AI Ethics Analysis'
    },
    { 
      id: 'psychometric',
      title: 'Personality & Interests', 
      icon: Brain,
      description: 'Psychological compatibility assessment'
    },
    { 
      id: 'technical',
      title: 'Technical Aptitude', 
      icon: Target,
      description: 'Skills and knowledge evaluation'
    },
    { 
      id: 'wiscar',
      title: 'WISCAR Analysis', 
      icon: Users,
      description: 'Comprehensive readiness framework'
    }
  ];

  const progress = ((currentSection) / (sections.length)) * 100;

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Navigate to results with assessment data
      navigate('/results', { state: { assessmentData } });
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderCurrentSection = () => {
    switch (sections[currentSection].id) {
      case 'intro':
        return <IntroSection onNext={nextSection} />;
      case 'psychometric':
        return (
          <PsychometricSection 
            data={assessmentData.psychometric}
            onUpdate={(data) => setAssessmentData(prev => ({ ...prev, psychometric: data }))}
            onNext={nextSection}
            onPrev={prevSection}
          />
        );
      case 'technical':
        return (
          <TechnicalSection 
            data={assessmentData.technical}
            onUpdate={(data) => setAssessmentData(prev => ({ ...prev, technical: data }))}
            onNext={nextSection}
            onPrev={prevSection}
          />
        );
      case 'wiscar':
        return (
          <WiscarSection 
            data={assessmentData.wiscar}
            onUpdate={(data) => setAssessmentData(prev => ({ ...prev, wiscar: data }))}
            onNext={nextSection}
            onPrev={prevSection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold bg-hero-gradient bg-clip-text text-transparent">
              E.T.H.I.C. Assessment
            </h1>
            <div className="text-sm text-muted-foreground">
              Section {currentSection + 1} of {sections.length}
            </div>
          </div>
          
          <Progress value={progress} className="mb-4" />
          
          <div className="flex items-center gap-4 text-sm">
            {sections.map((section, index) => (
              <div 
                key={section.id}
                className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
                  index === currentSection 
                    ? 'bg-primary text-primary-foreground' 
                    : index < currentSection 
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Section Content */}
        <div className="max-w-4xl mx-auto">
          {renderCurrentSection()}
        </div>
      </div>
    </div>
  );
};

const IntroSection = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-elegant bg-hero-gradient text-primary-foreground">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/20 rounded-2xl animate-float">
              <Brain className="w-12 h-12" />
            </div>
          </div>
          <CardTitle className="text-4xl mb-4">AI Ethics Analysis Assessment</CardTitle>
          <CardDescription className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Discover if you have the skills, mindset, and passion to shape the ethical future of artificial intelligence
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              What is AI Ethics Analysis?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              AI Ethics Analysts ensure artificial intelligence systems are designed, deployed, and governed 
              in ways that are fair, safe, transparent, and aligned with human values.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                Cross-functional discipline involving law, philosophy, data science
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-tertiary rounded-full"></div>
                Growing field with high impact on society
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Combines technical knowledge with ethical reasoning
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" />
              Career Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                'AI Ethics Analyst',
                'AI Policy Researcher', 
                'Responsible AI Consultant',
                'AI Governance Specialist',
                'Algorithmic Fairness Auditor',
                'Trust & Safety Officer'
              ].map((role) => (
                <div key={role} className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-primary" />
                  {role}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-tertiary" />
              Key Skills & Traits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                'Analytical + philosophical mindset',
                'Empathy & cross-cultural sensitivity',
                'Strong ethical reasoning',
                'Communication skills (oral + written)',
                'Comfort with ambiguity & systems thinking',
                'Familiarity with AI/ML concepts'
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  {skill}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-info" />
              Assessment Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-3">
                This comprehensive assessment evaluates your readiness across multiple dimensions:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Brain className="w-4 h-4 text-primary" />
                  Psychological compatibility & interests
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-secondary" />
                  Technical aptitude & knowledge
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-tertiary" />
                  WISCAR framework analysis
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Duration: 20-30 minutes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button 
          onClick={onNext}
          size="lg"
          className="bg-hero-gradient hover:bg-ai-gradient text-lg px-8 py-3 animate-pulse-glow"
        >
          Begin Assessment
        </Button>
      </div>
    </div>
  );
};

export default Assessment;