import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import StudentProfileForm from "@/components/profile/StudentProfileForm";
import CareerRecommendations from "@/components/dashboard/CareerRecommendations";
import CareerAI from "@/components/dashboard/CareerAI";
import SkillsGapAnalysis from "@/components/dashboard/SkillsGapAnalysis";
import LearningRoadmap from "@/components/dashboard/LearningRoadmap";

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchParams] = useSearchParams();
  const [isProfileSetup, setIsProfileSetup] = useState(false);

  useEffect(() => {
    // Check if there's a view parameter in the URL (from signup redirect)
    const viewParam = searchParams.get('view');
    if (viewParam === 'profile') {
      setCurrentView('profile');
      setIsProfileSetup(true); // User is in profile setup mode
    }
  }, [searchParams]);

  const handleProfileComplete = () => {
    setIsProfileSetup(false);
    setCurrentView('career-ai');
  };

  const renderView = () => {
    switch (currentView) {
      case 'profile':
        return <StudentProfileForm onProfileComplete={handleProfileComplete} />;
      case 'dashboard':
        return <CareerRecommendations />;
      case 'career-ai':
        return <CareerAI />;
      case 'learning':
        return <LearningRoadmap />;
      case 'progress':
        return <SkillsGapAnalysis />;
      default:
        return <CareerRecommendations />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isProfileSetup={isProfileSetup}
      />
      <main className="container mx-auto py-6">
        {renderView()}
      </main>
    </div>
  );
};

export default Index;
