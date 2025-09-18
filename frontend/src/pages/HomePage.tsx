import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Career Saathi</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => navigate('/about')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </button>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your AI-Powered
              <span className="text-blue-600 block">Career Companion</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover your ideal career path with personalized recommendations, skill gap analysis, 
              and curated learning roadmaps powered by artificial intelligence.
            </p>
          </div>

          {/* Authentication Forms */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Get Started</CardTitle>
                <CardDescription>
                  Join thousands of students discovering their career path
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-center text-gray-600 mb-6">
                    Ready to discover your perfect career path?
                  </p>
                  <div className="space-y-3">
                    <Button 
                      onClick={handleSignupClick}
                      className="w-full"
                      size="lg"
                    >
                      Create Free Account
                    </Button>
                    <Button 
                      onClick={handleLoginClick}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      Sign In
                    </Button>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Join thousands of students who have found their career direction
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Trusted by Students Worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-gray-600">Career Paths</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">AI Support</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6" />
                <span className="text-xl font-bold">Career Saathi</span>
              </div>
              <p className="text-gray-400">
                Empowering students to discover and achieve their career goals through AI-powered insights.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">API</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Career Saathi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
