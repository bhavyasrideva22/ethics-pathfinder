import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Users, ArrowRight, CheckCircle, Star, Award } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const startAssessment = () => {
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-accent/50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-hero-gradient rounded-2xl animate-float">
              <Brain className="w-16 h-16 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-6">
            E.T.H.I.C. Pathfinder
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover if you have the skills, mindset, and passion to shape the 
            <span className="text-primary font-semibold"> ethical future of artificial intelligence</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Target className="w-4 h-4 mr-2" />
              20-30 Minutes
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-2" />
              Comprehensive Analysis
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Award className="w-4 h-4 mr-2" />
              Personalized Results
            </Badge>
          </div>

          <Button 
            onClick={startAssessment}
            variant="hero"
            size="lg"
            className="text-xl px-12 py-6 h-auto animate-pulse-glow"
          >
            Start Assessment
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-xl">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Psychological Assessment</CardTitle>
              <CardDescription>
                Evaluate your personality, interests, and work style compatibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  'Interest in ethical challenges',
                  'Personality trait alignment',
                  'Work style preferences',
                  'Cognitive compatibility'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-secondary/10 rounded-xl">
                  <Target className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <CardTitle className="text-xl">Technical Readiness</CardTitle>
              <CardDescription>
                Assess your current knowledge and learning aptitude
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  'AI ethics knowledge',
                  'Analytical reasoning',
                  'Ethical frameworks',
                  'Real-world application'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-tertiary/10 rounded-xl">
                  <Users className="w-8 h-8 text-tertiary" />
                </div>
              </div>
              <CardTitle className="text-xl">WISCAR Analysis</CardTitle>
              <CardDescription>
                Comprehensive career readiness framework evaluation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  'Will & motivation',
                  'Interest & passion',
                  'Skills & abilities',
                  'Real-world alignment'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get */}
        <Card className="bg-hero-gradient text-primary-foreground border-0 shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">What You'll Receive</CardTitle>
            <CardDescription className="text-xl text-primary-foreground/90">
              A comprehensive analysis tailored to your unique profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                {[
                  'Detailed readiness score across multiple dimensions',
                  'Personalized career path recommendations',
                  'Specific skill development plan',
                  'Learning resource recommendations'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  'Strengths and growth area analysis',
                  'Industry insights and salary expectations',
                  'Next steps and action items',
                  'Downloadable results report'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-8">
            Ready to discover your AI Ethics potential?
          </p>
          <Button 
            onClick={startAssessment}
            variant="hero"
            size="lg"
            className="text-xl px-12 py-6 h-auto"
          >
            Begin Your Journey
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
