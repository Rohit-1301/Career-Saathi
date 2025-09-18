import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Users, 
  TrendingUp, 
  Star, 
  Target, 
  Brain, 
  Lightbulb,
  Award,
  BookOpen,
  BarChart3,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "AI Research Director",
      expertise: "Machine Learning, Career Analytics",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Raj Patel",
      role: "Product Manager",
      expertise: "Career Development, UX Design",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Chen",
      role: "Data Scientist",
      expertise: "Predictive Analytics, Skills Mapping",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Rodriguez",
      role: "Education Specialist",
      expertise: "Learning Pathways, Curriculum Design",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const milestones = [
    { year: "2023", event: "Career Saathi Founded", description: "Started with a vision to democratize career guidance" },
    { year: "2023", event: "AI Model Development", description: "Built our first career recommendation algorithm" },
    { year: "2024", event: "Beta Launch", description: "Launched beta version with 100 students" },
    { year: "2024", event: "Rapid Growth", description: "Reached 5,000+ active users" },
    { year: "2025", event: "Global Expansion", description: "Now serving students in 15+ countries" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Career Saathi</span>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Career Saathi</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to transform career guidance through the power of artificial intelligence, 
            helping students worldwide discover and achieve their professional aspirations.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="shadow-xl border-0">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                To democratize access to personalized career guidance by leveraging cutting-edge AI technology. 
                We believe every student deserves expert-level career advice, regardless of their background or location.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-600">Students Guided</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Career Paths</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="h-8 w-8 text-purple-600" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                To create a world where every student has a clear, personalized roadmap to their ideal career. 
                We envision a future where career uncertainty is eliminated through intelligent, data-driven insights.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">15+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How Career Saathi Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">AI Analysis</h3>
              <p className="text-gray-600">
                Our advanced AI algorithms analyze your skills, interests, and academic background 
                to understand your unique profile and potential.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Smart Matching</h3>
              <p className="text-gray-600">
                We match your profile with thousands of career paths and opportunities, 
                identifying the best fits based on market trends and your preferences.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Personalized Roadmap</h3>
              <p className="text-gray-600">
                Get a customized learning path with specific courses, skills to develop, 
                and milestones to achieve your career goals.
              </p>
            </div>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Makes Us Different
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
                  <p className="text-gray-600">
                    Unlike traditional career counseling, our AI processes vast amounts of industry data 
                    to provide real-time, accurate career predictions and recommendations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Market-Aligned Guidance</h3>
                  <p className="text-gray-600">
                    Our recommendations are based on current job market trends, emerging industries, 
                    and future skill demands, ensuring you're always ahead of the curve.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Success</h3>
                  <p className="text-gray-600">
                    With a 95% success rate, our students consistently achieve their career goals 
                    faster and with greater satisfaction than traditional methods.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Career Clarity Improved</span>
                  <Badge variant="secondary">87%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Faster Goal Achievement</span>
                  <Badge variant="secondary">2.3x</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Student Satisfaction</span>
                  <Badge variant="secondary">4.8/5</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Job Placement Success</span>
                  <Badge variant="secondary">78%</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Journey */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-16 bg-blue-200 mt-4"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.event}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                    <Badge variant="outline" className="mt-2">{milestone.year}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center shadow-lg border-0">
                <CardContent className="pt-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already discovered their ideal career path with Career Saathi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/')} className="px-8">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
              View Dashboard
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">Career Saathi</span>
          </div>
          <p className="text-gray-400 mb-6">
            Empowering students to discover and achieve their career goals through AI-powered insights.
          </p>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-400">&copy; 2025 Career Saathi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;