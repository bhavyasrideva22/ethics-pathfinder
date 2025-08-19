import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Users,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Download,
  Share2,
  Home
} from "lucide-react";
import { AssessmentData } from "./Assessment";
import { RadarChart } from "@/components/results/RadarChart";
import { ScoreCard } from "@/components/results/ScoreCard";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { CareerPathCard } from "@/components/results/CareerPathCard";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const assessmentData = location.state?.assessmentData as AssessmentData;

  if (!assessmentData) {
    navigate('/');
    return null;
  }

  // Calculate scores based on assessment data
  const scores = calculateScores(assessmentData);
  const recommendation = generateRecommendation(scores);
  const careerPaths = generateCareerPaths(scores);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-4">
            Your AI Ethics Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Based on your responses, here's your comprehensive readiness analysis for AI Ethics careers
          </p>
        </div>

        {/* Overall Score */}
        <Card className="mb-8 border-0 shadow-elegant bg-hero-gradient text-primary-foreground">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-6 bg-white/20 rounded-2xl">
                <Award className="w-16 h-16" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">
              Overall Readiness: {scores.overall}%
            </CardTitle>
            <CardDescription className="text-xl text-primary-foreground/90">
              {recommendation.level === 'high' && 'Excellent fit for AI Ethics careers!'}
              {recommendation.level === 'medium' && 'Good potential with some development needed'}
              {recommendation.level === 'low' && 'Consider related paths or additional preparation'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4 mt-4">
              <Button variant="secondary" className="gap-2">
                <Download className="w-4 h-4" />
                Download Report
              </Button>
              <Button variant="secondary" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share Results
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                WISCAR Framework Analysis
              </CardTitle>
              <CardDescription>
                Your readiness across 6 key dimensions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadarChart data={scores.wiscar} />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <ScoreCard
              title="Psychological Fit"
              score={scores.psychological}
              icon={Brain}
              color="primary"
              description="Interest, personality, and work style compatibility"
            />
            <ScoreCard
              title="Technical Readiness"
              score={scores.technical}
              icon={Target}
              color="secondary"
              description="Aptitude, knowledge, and domain understanding"
            />
            <ScoreCard
              title="Career Alignment"
              score={scores.career}
              icon={TrendingUp}
              color="tertiary"
              description="Fit with AI ethics career requirements"
            />
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <RecommendationCard recommendation={recommendation} />
          <CareerPathCard paths={careerPaths} />
        </div>

        {/* Strengths and Growth Areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <CheckCircle className="w-5 h-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendation.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <span className="text-sm">{strength}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertCircle className="w-5 h-5" />
                Growth Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendation.growthAreas.map((area, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <span className="text-sm">{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-info" />
              Recommended Learning Path
            </CardTitle>
            <CardDescription>
              Tailored development plan based on your assessment results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recommendation.learningPath.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.resources.map((resource, rIndex) => (
                        <Badge key={rIndex} variant="outline" className="text-xs">
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
            <Button onClick={() => navigate('/assessment')} className="gap-2">
              <ArrowRight className="w-4 h-4" />
              Retake Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for score calculation and recommendations
function calculateScores(data: AssessmentData) {
  // Simplified scoring logic - in real implementation this would be more sophisticated
  const psychScore = Math.round(
    (data.psychometric.interests.reduce((a, b) => a + b, 0) / data.psychometric.interests.length || 0) * 20
  );
  
  const techScore = Math.round(
    (data.technical.knowledge.reduce((a, b) => a + b, 0) / data.technical.knowledge.length || 0) * 20
  );
  
  const wiscarAvg = Object.values(data.wiscar).reduce((a, b) => a + b, 0) / 6;
  const careerScore = Math.round(wiscarAvg * 20);
  
  const overall = Math.round((psychScore + techScore + careerScore) / 3);

  return {
    overall,
    psychological: psychScore,
    technical: techScore,
    career: careerScore,
    wiscar: {
      will: data.wiscar.will * 20,
      interest: data.wiscar.interest * 20,
      skill: data.wiscar.skill * 20,
      cognitive: data.wiscar.cognitive * 20,
      ability: data.wiscar.ability * 20,
      realWorld: data.wiscar.realWorld * 20
    }
  };
}

function generateRecommendation(scores: ReturnType<typeof calculateScores>) {
  const level: 'high' | 'medium' | 'low' = scores.overall >= 80 ? 'high' : scores.overall >= 60 ? 'medium' : 'low';
  
  return {
    level,
    shouldPursue: scores.overall >= 60,
    confidence: scores.overall,
    strengths: [
      'Strong analytical thinking capabilities',
      'Good ethical reasoning foundation',
      'Interest in technology and society intersection',
      'Collaborative work style preference'
    ],
    growthAreas: [
      'Technical AI/ML knowledge could be strengthened',
      'Policy and regulatory awareness needs development',
      'Cross-cultural communication skills',
      'Hands-on experience with AI systems'
    ],
    learningPath: [
      {
        title: 'Foundation Building',
        description: 'Start with AI fundamentals and ethical frameworks',
        resources: ['AI for Everyone (Coursera)', 'Ethics in AI Course', 'Philosophy of Technology']
      },
      {
        title: 'Technical Development',
        description: 'Build understanding of AI systems and bias detection',
        resources: ['Machine Learning Basics', 'Algorithmic Bias Workshop', 'Data Ethics Toolkit']
      },
      {
        title: 'Specialization',
        description: 'Focus on specific areas of AI ethics',
        resources: ['AI Policy Research', 'Fairness in ML', 'Human-AI Interaction']
      }
    ]
  };
}

function generateCareerPaths(scores: ReturnType<typeof calculateScores>) {
  return [
    {
      title: 'AI Ethics Analyst',
      match: scores.overall,
      description: 'Audit AI systems for ethical compliance and bias',
      requirements: ['Strong analytical skills', 'Ethics knowledge', 'Technical understanding'],
      growth: 'High demand, $80-120k salary range'
    },
    {
      title: 'Responsible AI Consultant',
      match: Math.max(scores.psychological, scores.career),
      description: 'Help organizations implement ethical AI practices',
      requirements: ['Communication skills', 'Business acumen', 'AI ethics expertise'],
      growth: 'Consulting opportunities, $90-150k range'
    },
    {
      title: 'AI Policy Researcher',
      match: scores.psychological,
      description: 'Research and develop AI governance frameworks',
      requirements: ['Research skills', 'Policy knowledge', 'Academic background'],
      growth: 'Academic and think tank positions'
    }
  ];
}

export default Results;