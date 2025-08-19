import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, TrendingUp, Users, Target } from "lucide-react";

interface CareerPathCardProps {
  paths: Array<{
    title: string;
    match: number;
    description: string;
    requirements: string[];
    growth: string;
  }>;
}

export const CareerPathCard = ({ paths }: CareerPathCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-info" />
          Recommended Career Paths
        </CardTitle>
        <CardDescription>
          AI Ethics roles ranked by your assessment fit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {paths.map((path, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-base">{path.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{path.match}%</div>
                <div className="text-xs text-muted-foreground">Match</div>
              </div>
            </div>

            <Progress value={path.match} className="h-2" />

            <div className="grid grid-cols-1 gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">Key Requirements:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {path.requirements.map((req, reqIndex) => (
                    <Badge key={reqIndex} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-success mt-0.5" />
                <div>
                  <span className="text-sm font-medium">Growth Outlook:</span>
                  <p className="text-xs text-muted-foreground">{path.growth}</p>
                </div>
              </div>
            </div>

            {index < paths.length - 1 && <hr className="border-border" />}
          </div>
        ))}

        <div className="mt-6 p-4 bg-accent/50 rounded-lg">
          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 text-info mt-0.5" />
            <div>
              <p className="text-sm font-medium">Industry Insight</p>
              <p className="text-xs text-muted-foreground mt-1">
                AI Ethics is a rapidly growing field with increasing demand across tech, 
                healthcare, finance, and government sectors. Early career professionals 
                can expect strong growth opportunities.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};