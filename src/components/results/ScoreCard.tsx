import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  title: string;
  score: number;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'tertiary';
  description: string;
}

export const ScoreCard = ({ title, score, icon: Icon, color, description }: ScoreCardProps) => {
  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-success' };
    if (score >= 70) return { level: 'Good', color: 'text-info' };
    if (score >= 60) return { level: 'Average', color: 'text-warning' };
    return { level: 'Needs Development', color: 'text-destructive' };
  };

  const scoreInfo = getScoreLevel(score);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className={cn(
            "p-2 rounded-lg",
            color === 'primary' && "bg-primary/10",
            color === 'secondary' && "bg-secondary/10", 
            color === 'tertiary' && "bg-tertiary/10"
          )}>
            <Icon className={cn(
              "w-5 h-5",
              color === 'primary' && "text-primary",
              color === 'secondary' && "text-secondary",
              color === 'tertiary' && "text-tertiary"
            )} />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{score}%</span>
            <span className={cn("text-sm font-medium", scoreInfo.color)}>
              {scoreInfo.level}
            </span>
          </div>
          <Progress value={score} className="h-2" />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};