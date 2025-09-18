import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Briefcase, 
  DollarSign, 
  Clock, 
  MapPin,
  Star,
  ArrowRight,
  Brain,
  Target,
  BookOpen
} from "lucide-react";

interface Career {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  salaryRange: string;
  growthRate: string;
  workStyle: string;
  location: string;
  requiredSkills: string[];
  skillGaps: string[];
  timeToReady: string;
  demandLevel: 'High' | 'Medium' | 'Low';
  reasoning: string;
}

const CareerRecommendations = () => {
  // Mock data - replace with real AI-generated recommendations
  const careers: Career[] = [
    {
      id: '1',
      title: 'Full Stack Developer',
      description: 'Build complete web applications from frontend to backend, working with modern technologies and frameworks.',
      matchPercentage: 92,
      salaryRange: '₹6-15 LPA',
      growthRate: '+12% annually',
      workStyle: 'Remote/Hybrid',
      location: 'Bangalore, Mumbai, Pune',
      requiredSkills: ['React', 'Node.js', 'Database Design', 'API Development'],
      skillGaps: ['DevOps', 'System Design'],
      timeToReady: '6-8 months',
      demandLevel: 'High',
      reasoning: 'Your programming skills and problem-solving abilities align perfectly with this role. The tech industry offers excellent growth opportunities.'
    },
    {
      id: '2',
      title: 'Data Scientist',
      description: 'Analyze complex data to derive insights and build predictive models that drive business decisions.',
      matchPercentage: 87,
      salaryRange: '₹8-20 LPA',
      growthRate: '+15% annually',
      workStyle: 'Remote/Office',
      location: 'Bangalore, Hyderabad, Delhi',
      requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'SQL'],
      skillGaps: ['Advanced ML', 'Big Data Tools'],
      timeToReady: '8-12 months',
      demandLevel: 'High',
      reasoning: 'Your analytical thinking and mathematics background make you ideal for data science. High demand in the market.'
    },
    {
      id: '3',
      title: 'Product Manager',
      description: 'Lead product development by understanding user needs, defining requirements, and working with cross-functional teams.',
      matchPercentage: 78,
      salaryRange: '₹10-25 LPA',
      growthRate: '+10% annually',
      workStyle: 'Office/Hybrid',
      location: 'Bangalore, Mumbai, Gurgaon',
      requiredSkills: ['Strategy', 'Communication', 'Analytics', 'User Research'],
      skillGaps: ['Technical Understanding', 'Agile Methodologies'],
      timeToReady: '4-6 months',
      demandLevel: 'Medium',
      reasoning: 'Your leadership skills and strategic thinking are well-suited for product management. Growing field with good opportunities.'
    }
  ];

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'High': return 'success';
      case 'Medium': return 'warning';
      case 'Low': return 'destructive';
      default: return 'secondary';
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 85) return 'success';
    if (percentage >= 70) return 'warning';
    return 'destructive';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Target className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">AI Recommendations</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based on your profile analysis, here are the top paths that match your skills, interests, and aspirations.
        </p>
      </div>

      {/* Career Cards */}
      <div className="grid gap-6">
        {careers.map((career, index) => (
          <Card key={career.id} className="bg-gradient-card shadow-medium border-0 hover:shadow-strong transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge 
                      variant="outline" 
                      className="text-xs font-medium bg-gradient-primary text-white border-0"
                    >
                      #{index + 1} Match
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={`text-xs ${getDemandColor(career.demandLevel) === 'success' ? 'bg-success text-success-foreground' : 
                        getDemandColor(career.demandLevel) === 'warning' ? 'bg-warning text-warning-foreground' : 
                        'bg-destructive text-destructive-foreground'} border-0`}
                    >
                      {career.demandLevel} Demand
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{career.title}</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {career.description}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {career.matchPercentage}%
                  </div>
                  <div className="text-xs text-muted-foreground">Match Score</div>
                </div>
              </div>

              {/* Match Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Profile Match</span>
                  <span className="font-medium">{career.matchPercentage}%</span>
                </div>
                <Progress 
                  value={career.matchPercentage} 
                  className={`h-2 ${getMatchColor(career.matchPercentage) === 'success' ? '[&>div]:bg-success' : 
                    getMatchColor(career.matchPercentage) === 'warning' ? '[&>div]:bg-warning' : '[&>div]:bg-destructive'}`}
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-success" />
                  <div>
                    <div className="text-sm font-medium">{career.salaryRange}</div>
                    <div className="text-xs text-muted-foreground">Salary</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-sm font-medium">{career.growthRate}</div>
                    <div className="text-xs text-muted-foreground">Growth</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-warning" />
                  <div>
                    <div className="text-sm font-medium">{career.timeToReady}</div>
                    <div className="text-xs text-muted-foreground">Time to Ready</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">{career.workStyle}</div>
                    <div className="text-xs text-muted-foreground">Work Style</div>
                  </div>
                </div>
              </div>

              {/* Skills Analysis */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-2 text-success" />
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {career.skillGaps.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-warning" />
                      Skills to Develop
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {career.skillGaps.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs bg-warning/10 text-warning border-warning/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* AI Reasoning */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Brain className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium mb-1">AI Analysis</h4>
                    <p className="text-sm text-muted-foreground">{career.reasoning}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button className="flex-1 bg-gradient-primary text-white shadow-glow hover:shadow-strong transition-smooth">
                  View Learning Path
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="outline" className="flex-1 hover:bg-accent transition-smooth">
                  Compare Options
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show More Button */}
      <div className="text-center">
        <Button variant="outline" className="hover:bg-accent transition-smooth">
          <Briefcase className="h-4 w-4 mr-2" />
          Explore More Options
        </Button>
      </div>
    </div>
  );
};

export default CareerRecommendations;