import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  BookOpen, 
  Clock, 
  Play, 
  CheckCircle, 
  Trophy,
  Target,
  Calendar,
  ArrowRight,
  Star,
  Download,
  Share
} from "lucide-react";

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Course' | 'Project' | 'Reading' | 'Practice';
  completed: boolean;
  resources: string[];
  skills: string[];
}

interface LearningPhase {
  id: string;
  title: string;
  description: string;
  duration: string;
  modules: LearningModule[];
  completed: boolean;
}

const LearningRoadmap = () => {
  const [selectedPhase, setSelectedPhase] = useState<string>('foundation');
  
  // Mock data - replace with AI-generated roadmap
  const roadmap: LearningPhase[] = [
    {
      id: 'foundation',
      title: 'Foundation Phase',
      description: 'Build core programming and development fundamentals',
      duration: '2-3 months',
      completed: false,
      modules: [
        {
          id: 'js-fundamentals',
          title: 'JavaScript Fundamentals',
          description: 'Master ES6+, async programming, and core concepts',
          duration: '3 weeks',
          difficulty: 'Beginner',
          type: 'Course',
          completed: true,
          resources: ['MDN JavaScript Guide', 'JavaScript.info', 'FreeCodeCamp'],
          skills: ['JavaScript', 'ES6+', 'Async Programming']
        },
        {
          id: 'react-basics',
          title: 'React Development',
          description: 'Learn React components, hooks, and state management',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          type: 'Course',
          completed: true,
          resources: ['React Official Docs', 'React Tutorial', 'Create React App'],
          skills: ['React', 'JSX', 'Hooks', 'State Management']
        },
        {
          id: 'first-project',
          title: 'Personal Portfolio Website',
          description: 'Build your first React project with modern design',
          duration: '2 weeks',
          difficulty: 'Beginner',
          type: 'Project',
          completed: false,
          resources: ['Portfolio Templates', 'Design Inspiration', 'Deployment Guide'],
          skills: ['React', 'CSS', 'Responsive Design']
        }
      ]
    },
    {
      id: 'intermediate',
      title: 'Intermediate Phase',
      description: 'Develop full-stack capabilities and advanced skills',
      duration: '3-4 months',
      completed: false,
      modules: [
        {
          id: 'backend-fundamentals',
          title: 'Backend Development with Node.js',
          description: 'Learn server-side development, APIs, and databases',
          duration: '5 weeks',
          difficulty: 'Intermediate',
          type: 'Course',
          completed: false,
          resources: ['Node.js Docs', 'Express.js Guide', 'Database Design Course'],
          skills: ['Node.js', 'Express.js', 'REST APIs', 'Database Design']
        },
        {
          id: 'fullstack-project',
          title: 'Full-Stack Web Application',
          description: 'Build a complete CRUD application with authentication',
          duration: '6 weeks',
          difficulty: 'Intermediate',
          type: 'Project',
          completed: false,
          resources: ['Project Requirements', 'Authentication Guide', 'Deployment Tutorial'],
          skills: ['Full-Stack', 'Authentication', 'Database Integration']
        },
        {
          id: 'testing',
          title: 'Testing & Quality Assurance',
          description: 'Learn unit testing, integration testing, and TDD',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          type: 'Course',
          completed: false,
          resources: ['Jest Documentation', 'Testing Library', 'TDD Guide'],
          skills: ['Unit Testing', 'Integration Testing', 'TDD']
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Phase',
      description: 'Master system design, architecture, and advanced concepts',
      duration: '4-5 months',
      completed: false,
      modules: [
        {
          id: 'system-design',
          title: 'System Design Fundamentals',
          description: 'Learn to design scalable and reliable systems',
          duration: '6 weeks',
          difficulty: 'Advanced',
          type: 'Course',
          completed: false,
          resources: ['System Design Primer', 'High Scalability', 'Design Patterns'],
          skills: ['System Design', 'Scalability', 'Architecture']
        },
        {
          id: 'devops',
          title: 'DevOps & Cloud Deployment',
          description: 'Master containerization, CI/CD, and cloud platforms',
          duration: '5 weeks',
          difficulty: 'Advanced',
          type: 'Course',
          completed: false,
          resources: ['Docker Tutorial', 'Kubernetes Basics', 'AWS Fundamentals'],
          skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms']
        },
        {
          id: 'capstone',
          title: 'Capstone Project',
          description: 'Build a production-ready application with advanced features',
          duration: '8 weeks',
          difficulty: 'Advanced',
          type: 'Project',
          completed: false,
          resources: ['Project Ideas', 'Architecture Guide', 'Code Review Checklist'],
          skills: ['Full-Stack', 'System Design', 'Production Deployment']
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'destructive';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Course': return BookOpen;
      case 'Project': return Target;
      case 'Reading': return BookOpen;
      case 'Practice': return Play;
      default: return BookOpen;
    }
  };

  const calculatePhaseProgress = (phase: LearningPhase) => {
    const completedModules = phase.modules.filter(m => m.completed).length;
    return (completedModules / phase.modules.length) * 100;
  };

  const totalProgress = roadmap.reduce((acc, phase) => {
    return acc + calculatePhaseProgress(phase);
  }, 0) / roadmap.length;

  const currentPhase = roadmap.find(phase => phase.id === selectedPhase);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Personalized Learning Roadmap</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your AI-generated path to becoming a Full Stack Developer, tailored to your current skills and career goals.
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-primary" />
                Overall Progress
              </CardTitle>
              <CardDescription>Your journey to Full Stack Developer</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-primary">{Math.round(totalProgress)}%</span>
              <span className="text-sm text-muted-foreground">Complete</span>
            </div>
            <Progress value={totalProgress} className="h-3" />
            
            <div className="grid grid-cols-3 gap-4">
              {roadmap.map((phase) => {
                const progress = calculatePhaseProgress(phase);
                return (
                  <div key={phase.id} className="text-center">
                    <div className="text-lg font-bold text-primary">{Math.round(progress)}%</div>
                    <div className="text-xs text-muted-foreground">{phase.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {roadmap.map((phase) => {
          const progress = calculatePhaseProgress(phase);
          return (
            <Button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id)}
              variant={selectedPhase === phase.id ? "default" : "outline"}
              className={`transition-smooth ${
                selectedPhase === phase.id 
                  ? "bg-gradient-primary text-white shadow-glow" 
                  : "hover:bg-accent"
              }`}
            >
              {phase.title}
              <Badge variant="secondary" className="ml-2 text-xs">
                {Math.round(progress)}%
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* Current Phase Details */}
      {currentPhase && (
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{currentPhase.title}</CardTitle>
                <CardDescription className="mt-1">{currentPhase.description}</CardDescription>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{currentPhase.duration}</span>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={calculatePhaseProgress(currentPhase)} className="h-2" />
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Learning Modules */}
      <div className="space-y-4">
        {currentPhase?.modules.map((module, index) => {
          const TypeIcon = getTypeIcon(module.type);
          
          return (
            <Card key={module.id} className={`bg-gradient-card shadow-soft border-0 hover:shadow-medium transition-smooth hover-lift ${module.completed ? 'ring-2 ring-success/20' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Module Icon & Checkbox */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      module.completed 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {module.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <TypeIcon className="h-5 w-5" />
                      )}
                    </div>
                    <Checkbox 
                      checked={module.completed}
                      className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                    />
                  </div>

                  {/* Module Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{module.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{module.description}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            getDifficultyColor(module.difficulty) === 'success' ? 'bg-success/10 text-success border-success/20' :
                            getDifficultyColor(module.difficulty) === 'warning' ? 'bg-warning/10 text-warning border-warning/20' :
                            'bg-destructive/10 text-destructive border-destructive/20'
                          }`}
                        >
                          {module.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {module.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{module.duration}</span>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Skills You'll Learn:</h4>
                      <div className="flex flex-wrap gap-2">
                        {module.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs bg-primary/5">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Learning Resources:</h4>
                      <div className="flex flex-wrap gap-2">
                        {module.resources.map((resource) => (
                          <Badge key={resource} variant="outline" className="text-xs hover:bg-accent cursor-pointer transition-smooth">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      {module.completed ? (
                        <Button variant="outline" className="w-full" disabled>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </Button>
                      ) : (
                        <Button className="w-full bg-gradient-primary text-white shadow-glow hover:shadow-strong transition-smooth">
                          <Play className="h-4 w-4 mr-2" />
                          Start Learning
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievement Card */}
      <Card className="bg-gradient-secondary text-secondary-foreground shadow-glow border-0">
        <CardContent className="p-6 text-center">
          <Trophy className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Complete Your Journey</h3>
          <p className="mb-4 opacity-90">
            Follow this roadmap to become job-ready in 9-12 months. Each completed module brings you closer to your goal!
          </p>
          <Button variant="outline" size="lg" className="bg-white text-secondary-foreground hover:bg-white/90">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Study Sessions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningRoadmap;