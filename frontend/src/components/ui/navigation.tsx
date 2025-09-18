import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User, 
  BarChart3, 
  BookOpen, 
  Target, 
  Menu, 
  X,
  Brain,
  TrendingUp,
  LogOut,
  Settings
} from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isProfileSetup?: boolean;
}

const Navigation = ({ currentView, onViewChange, isProfileSetup = false }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditProfile = () => {
    onViewChange('profile');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'career-ai', label: 'Career AI', icon: Brain },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
  ];

  // Filter navigation items based on profile setup status
  const visibleNavItems = isProfileSetup ? [] : navItems;

  return (
    <nav className="bg-gradient-card backdrop-blur-sm border-b border-border shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Saathi AI
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                AI-Powered Guidance
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {visibleNavItems.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                onClick={() => onViewChange(id)}
                variant={currentView === id ? "default" : "ghost"}
                size="sm"
                className={`transition-smooth ${
                  currentView === id 
                    ? "bg-gradient-primary text-white shadow-glow" 
                    : "hover:bg-accent"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 ring-2 ring-primary/20 cursor-pointer hover:ring-primary/40 transition-all">
                    <AvatarImage src={currentUser?.photoURL || ""} />
                    <AvatarFallback className="bg-gradient-secondary text-secondary-foreground text-sm font-medium">
                      {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={handleEditProfile} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="flex flex-col space-y-2">
              {visibleNavItems.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  onClick={() => {
                    onViewChange(id);
                    setIsMobileMenuOpen(false);
                  }}
                  variant={currentView === id ? "default" : "ghost"}
                  className={`justify-start transition-smooth ${
                    currentView === id 
                      ? "bg-gradient-primary text-white shadow-glow" 
                      : "hover:bg-accent"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;