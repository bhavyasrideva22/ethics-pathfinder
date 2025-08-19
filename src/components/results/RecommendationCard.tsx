import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Target } from "lucide-react";

interface RecommendationCardProps {
  recommendation: {
    level: 'high' | 'medium' | 'low';
    shouldPursue: boolean;
    confidence: number;
    strengths: string[];
    growthAreas: string[];
    learningPath: Array<{
      title: string;
      description: string;
      resources: string[];
    }>;
  };
}

export const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const getRecommendationIcon = () => {
    switch (recommendation.level) {
      case 'high':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'medium':
        return <AlertTriangle className="w-6 h-6 text-warning" />;
      case 'low':
        return <XCircle className="w-6 h-6 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (recommendation.level) {
      case 'high':
        return 'border-success bg-success/5';
      case 'medium':
        return 'border-warning bg-warning/5';
      case 'low':
        return 'border-destructive bg-destructive/5';
    }
  };

  const getRecommendationText = () => {
    switch (recommendation.level) {
      case 'high':
        return {
          title: 'Highly Recommended',
          subtitle: 'You show strong alignment with AI Ethics careers',
          action: 'Proceed with confidence! Focus on building expertise in your strongest areas.'
        };
      case 'medium':
        return {
          title: 'Recommended with Development',
          subtitle: 'You have good potential with some areas to strengthen',
          action: 'Consider targeted skill development before pursuing AI Ethics roles.'
        };
      case 'low':
        return {
          title: 'Alternative Paths Suggested',
          subtitle: 'Consider related fields or additional preparation',
          action: 'Explore adjacent roles or build foundational skills first.'
        };
    }
  };

  const recText = getRecommendationText();

  return (
    <Card className={getRecommendationColor()}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {getRecommendationIcon()}
          <div>
            <div className="text-xl">{recText.title}</div>
            <CardDescription className="mt-1 text-base">
              {recText.subtitle}
            </CardDescription>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          <span className="font-medium">Confidence Score: {recommendation.confidence}%</span>
        </div>

        <div className="p-4 bg-background/50 rounded-lg">
          <p className="text-sm font-medium mb-2">Our Recommendation:</p>
          <p className="text-sm text-muted-foreground">{recText.action}</p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Key Focus Areas:</h4>
          <div className="grid grid-cols-1 gap-2">
            {recommendation.growthAreas.slice(0, 3).map((area, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                {area}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Next Steps:</h4>
          <div className="space-y-1">
            {recommendation.learningPath.slice(0, 2).map((step, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {step.title}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};