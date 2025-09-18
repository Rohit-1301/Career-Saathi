import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  BookOpen,
  Star,
  TrendingUp,
  Target,
  Award
} from "lucide-react";

interface Skill {
  name: string;
  category: string;
  currentLevel: number;
  requiredLevel: number;
  importance: 'Critical' | 'Important' | 'Nice to Have';
  learningResources: string[];
  estimatedTime: string;
}

const SkillsGapAnalysis = () => {
  // Mock data - replace with real analysis
  const skills: Skill[] = [
    {
      name: 'React Development',
      category: 'Frontend',
      currentLevel: 80,
      requiredLevel: 90,
      importance: 'Critical',
      learningResources: ['React Official Docs', 'Frontend Masters', 'Practice Projects'],
      estimatedTime: '2-3 weeks'
    },
    {
      name: 'System Design',
      category: 'Architecture',
      currentLevel: 30,
      requiredLevel: 80,
      importance: 'Critical',
      learningResources: ['System Design Primer', 'High Scalability', 'Design Patterns'],
      estimatedTime: '3-4 months'
    },
    {
      name: 'Database Design',
      category: 'Backend',
      currentLevel: 60,
      requiredLevel: 85,
      importance: 'Important',
      learningResources: ['SQL Tutorials', 'Database Design Course', 'PostgreSQL Docs'],
      estimatedTime: '1-2 months'
    },
    {
      name: 'DevOps & CI/CD',
      category: 'Infrastructure',
      currentLevel: 25,
      requiredLevel: 70,
      importance: 'Important',
      learningResources: ['Docker Tutorial', 'Kubernetes Basics', 'GitHub Actions'],
      estimatedTime: '2-3 months'
    },
    {
      name: 'API Development',
      category: 'Backend',
      currentLevel: 75,
      requiredLevel: 80,
      importance: 'Critical',
      learningResources: ['REST API Design', 'GraphQL Tutorial', 'API Testing'],
      estimatedTime: '2-4 weeks'
    },
    {
      name: 'Cloud Platforms',
      category: 'Infrastructure',
      currentLevel: 40,
      requiredLevel: 75,
      importance: 'Nice to Have',
      learningResources: ['AWS Fundamentals', 'Cloud Architecture', 'Serverless'],
      estimatedTime: '2-3 months'
    }
  ];

  const getSkillStatus = (current: number, required: number) => {
    const gap = required - current;
    if (gap <= 0) return 'complete';
    if (gap <= 20) return 'close';
    return 'needs-work';
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'Critical': return 'destructive';
      case 'Important': return 'warning';
      case 'Nice to Have': return 'secondary';
      default: return 'secondary';
    }
  };

  const completedSkills = skills.filter(skill => getSkillStatus(skill.currentLevel, skill.requiredLevel) === 'complete');
  const skillsInProgress = skills.filter(skill => getSkillStatus(skill.currentLevel, skill.requiredLevel) === 'close');
  const skillsNeedingWork = skills.filter(skill => getSkillStatus(skill.currentLevel, skill.requiredLevel) === 'needs-work');

  const overallProgress = (skills.reduce((acc, skill) => acc + (skill.currentLevel / skill.requiredLevel * 100), 0) / skills.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Target className="h-8 w-8 text-secondary-foreground" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Skills Gap Analysis</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Understand where you stand and what skills you need to develop for your target career.
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-primary" />
            Overall Skill Readiness
          </CardTitle>
          <CardDescription>
            Your current progress towards career requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-primary">{Math.round(overallProgress)}%</span>
              <span className="text-sm text-muted-foreground">Career Ready</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-lg font-bold text-success">{completedSkills.length}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-warning">{skillsInProgress.length}</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-destructive">{skillsNeedingWork.length}</div>
                <div className="text-xs text-muted-foreground">Need Focus</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Breakdown */}
      <div className="grid gap-4">
        {skills.map((skill, index) => {
          const status = getSkillStatus(skill.currentLevel, skill.requiredLevel);
          const gap = skill.requiredLevel - skill.currentLevel;
          
          return (
            <Card key={index} className="bg-gradient-card shadow-soft border-0 hover:shadow-medium transition-smooth hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{skill.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {skill.category}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={`text-xs ${
                          getImportanceColor(skill.importance) === 'destructive' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                          getImportanceColor(skill.importance) === 'warning' ? 'bg-warning/10 text-warning border-warning/20' :
                          'bg-secondary/10 text-secondary border-secondary/20'
                        }`}
                      >
                        {skill.importance}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {status === 'complete' ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : status === 'close' ? (
                        <Clock className="h-5 w-5 text-warning" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        {status === 'complete' ? 'Skill Mastered!' : 
                         status === 'close' ? 'Almost There' : 
                         'Needs Development'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">Progress</div>
                    <div className="text-2xl font-bold text-primary">
                      {skill.currentLevel}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Target: {skill.requiredLevel}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Current Level</span>
                    <span>{skill.currentLevel}% / {skill.requiredLevel}%</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={(skill.currentLevel / skill.requiredLevel) * 100} 
                      className={`h-2 ${
                        status === 'complete' ? '[&>div]:bg-success' :
                        status === 'close' ? '[&>div]:bg-warning' :
                        '[&>div]:bg-destructive'
                      }`}
                    />
                    {/* Target indicator */}
                    <div 
                      className="absolute top-0 w-0.5 h-2 bg-border"
                      style={{ left: '100%' }}
                    />
                  </div>
                </div>

                {/* Gap Info */}
                {gap > 0 && (
                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-warning" />
                        <span className="font-medium">Skill Gap: {gap}%</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{skill.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Learning Resources */}
                <div className="space-y-3">
                  <h4 className="flex items-center text-sm font-medium">
                    <BookOpen className="h-4 w-4 mr-2 text-primary" />
                    Recommended Resources
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.learningResources.map((resource, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10 cursor-pointer transition-smooth">
                        {resource}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full mt-3 bg-gradient-primary text-white shadow-glow hover:shadow-strong transition-smooth"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Start Learning Path
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Panel */}
      <Card className="bg-gradient-primary text-white shadow-glow border-0">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Ready to Bridge the Gap?</h3>
          <p className="text-white/90 mb-4">
            Get a personalized learning roadmap to achieve your career goals faster.
          </p>
          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
            <BookOpen className="h-4 w-4 mr-2" />
            Create Learning Plan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsGapAnalysis;