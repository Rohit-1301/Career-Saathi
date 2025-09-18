import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { updateUserProfile, markProfileComplete, UserProfile } from "@/services/firestoreService";
import { 
  User, 
  GraduationCap, 
  Heart, 
  Code, 
  Target, 
  Plus,
  X,
  Sparkles
} from "lucide-react";

interface StudentProfile {
  name: string;
  age: string;
  dateOfBirth: string;
  education: string;
  field: string;
  interests: string[];
  skills: string[];
  aspirations: string;
  experience: string;
  strengths: string[];
  challenges: string;
}

interface StudentProfileFormProps {
  onProfileComplete?: () => void;
}

const StudentProfileForm = ({ onProfileComplete }: StudentProfileFormProps) => {
  const { currentUser, userProfile, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<StudentProfile>({
    name: "",
    age: "",
    dateOfBirth: "",
    education: "",
    field: "",
    interests: [],
    skills: [],
    aspirations: "",
    experience: "",
    strengths: [],
    challenges: ""
  });

  const [newInterest, setNewInterest] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newStrength, setNewStrength] = useState("");
  const [step, setStep] = useState(1);

  // Load existing profile data
  useEffect(() => {
    if (userProfile) {
      setProfile({
        name: userProfile.displayName || `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim(),
        age: '', // Calculate from dateOfBirth if available
        dateOfBirth: userProfile.dateOfBirth || '',
        education: userProfile.education?.level || '',
        field: userProfile.education?.field || '',
        interests: userProfile.interests || [],
        skills: userProfile.skills || [],
        aspirations: userProfile.careerGoals?.join(', ') || '',
        experience: '', // Add if needed
        strengths: [], // Can be derived from skills
        challenges: ''
      });
      
      // Calculate age if dateOfBirth exists
      if (userProfile.dateOfBirth) {
        const calculatedAge = calculateAge(userProfile.dateOfBirth);
        setProfile(prev => ({ ...prev, age: calculatedAge }));
      }
    }
  }, [userProfile]);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  // Function to calculate age from date of birth
  const calculateAge = (dateOfBirth: string): string => {
    if (!dateOfBirth) return "";
    
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age.toString();
  };

  // Handle date of birth change and auto-calculate age
  const handleDateOfBirthChange = (dateOfBirth: string) => {
    const calculatedAge = calculateAge(dateOfBirth);
    setProfile({
      ...profile,
      dateOfBirth,
      age: calculatedAge
    });
  };

  // Validation function for basic information
  const isBasicInfoComplete = () => {
    return profile.name.trim() !== "" &&
           profile.dateOfBirth !== "" &&
           profile.age !== "" &&
           profile.education !== "" &&
           profile.field !== "";
  };

  // Handle next step with validation
  const handleNextStep = () => {
    if (step === 1 && !isBasicInfoComplete()) {
      alert("Please fill in all required fields in Basic Information section.");
      return;
    }
    setStep(Math.min(totalSteps, step + 1));
  };

  const educationLevels = [
    "10th Passed",
    "10th Appeared"
  ];

  const commonInterests = [
    "Technology", "Healthcare", "Finance", "Arts", "Sports", "Music", 
    "Writing", "Research", "Teaching", "Business", "Design", "Environment"
  ];

  const commonSkills = [
    "Programming", "Communication", "Leadership", "Problem Solving", 
    "Data Analysis", "Creative Writing", "Public Speaking", "Design",
    "Project Management", "Languages", "Mathematics", "Marketing",
    "Research", "Critical Thinking", "Photography", "Video Editing",
    "Social Media", "Teaching", "Drawing", "Music", "Dancing",
    "Sports", "Coding", "Web Development", "Graphic Design",
    "Content Writing", "Event Management", "Sales", "Customer Service",
    "Time Management", "Organization", "Presentation Skills", "Networking"
  ];

  const commonStrengths = [
    "Analytical Thinking", "Creativity", "Teamwork", "Adaptability",
    "Attention to Detail", "Time Management", "Empathy", "Innovation",
    "Persistence", "Strategic Planning", "Technical Aptitude", "Mentoring",
    "Quick Learning", "Patience", "Confidence", "Curiosity",
    "Initiative", "Reliability", "Flexibility", "Enthusiasm",
    "Discipline", "Optimism", "Honesty", "Dedication",
    "Self-Motivation", "Collaboration", "Risk-Taking", "Decision Making",
    "Stress Management", "Active Listening", "Cultural Awareness", "Integrity"
  ];

  const addToArray = (
    array: string[], 
    value: string, 
    setter: (value: string[]) => void,
    inputSetter: (value: string) => void
  ) => {
    if (value.trim() && !array.includes(value.trim())) {
      setter([...array, value.trim()]);
      inputSetter("");
    }
  };

  const removeFromArray = (
    array: string[], 
    value: string, 
    setter: (value: string[]) => void
  ) => {
    setter(array.filter(item => item !== value));
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      alert('Please log in to save your profile.');
      return;
    }

    setLoading(true);
    try {
      console.log("Saving Student Profile:", profile);
      
      // Prepare data for Firestore
      const updateData: Partial<UserProfile> = {
        displayName: profile.name,
        firstName: profile.name.split(' ')[0] || '',
        lastName: profile.name.split(' ').slice(1).join(' ') || '',
        dateOfBirth: profile.dateOfBirth,
        education: {
          level: profile.education,
          field: profile.field,
          institution: userProfile?.education?.institution || '',
          // Only include graduationYear if it exists and has a value
          ...(userProfile?.education?.graduationYear && { graduationYear: userProfile.education.graduationYear })
        },
        interests: profile.interests,
        skills: profile.skills,
        careerGoals: profile.aspirations ? profile.aspirations.split(',').map(goal => goal.trim()) : [],
        profileComplete: true
      };
      
      // Update profile in Firestore
      await updateUserProfile(currentUser.uid, updateData);
      
      // Mark profile as complete
      await markProfileComplete(currentUser.uid);
      
      // Refresh user profile in context
      await refreshUserProfile();
      
      console.log('✅ Profile saved successfully!');
      alert("Profile saved! Ready for AI career analysis.");
      
      // Call the callback to exit profile setup mode
      if (onProfileComplete) {
        onProfileComplete();
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Progress Header */}
      <Card className="bg-gradient-card shadow-soft border-0">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Student Profile</CardTitle>
          <CardDescription>
            Help us understand you better for personalized career guidance
          </CardDescription>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-primary" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                placeholder="Enter your full name"
                className="mt-1"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => handleDateOfBirthChange(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.age}
                  readOnly
                  placeholder="Auto-calculated from DOB"
                  className="mt-1 bg-muted"
                  title="Age is automatically calculated from your date of birth"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="education">Current Education Level *</Label>
              <Select value={profile.education} onValueChange={(value) => setProfile({...profile, education: value})} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="field">Interest *</Label>
              <Select value={profile.field} onValueChange={(value) => setProfile({...profile, field: value})} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your interest area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="Not Decided">Not Decided</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Interests */}
      {step === 2 && (
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-primary" />
              Interests & Passions
            </CardTitle>
            <CardDescription>
              What areas excite you the most? Select from common interests or add your own.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Common Interests */}
            <div>
              <Label className="text-sm font-medium">Common Interests</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {commonInterests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={profile.interests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer transition-smooth ${
                      profile.interests.includes(interest) 
                        ? "bg-gradient-primary text-white shadow-glow" 
                        : "hover:bg-accent"
                    }`}
                    onClick={() => {
                      if (profile.interests.includes(interest)) {
                        removeFromArray(profile.interests, interest, (interests) => 
                          setProfile({...profile, interests})
                        );
                      } else {
                        setProfile({...profile, interests: [...profile.interests, interest]});
                      }
                    }}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Add Custom Interest */}
            <div>
              <Label htmlFor="newInterest">Add Custom Interest</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="newInterest"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Enter a custom interest"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToArray(profile.interests, newInterest, 
                        (interests) => setProfile({...profile, interests}), 
                        setNewInterest
                      );
                    }
                  }}
                />
                <Button
                  onClick={() => addToArray(profile.interests, newInterest, 
                    (interests) => setProfile({...profile, interests}), 
                    setNewInterest
                  )}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Selected Interests */}
            {profile.interests.length > 0 && (
              <div>
                <Label className="text-sm font-medium">Your Interests</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.interests.map((interest) => (
                    <Badge key={interest} variant="default" className="bg-gradient-secondary">
                      {interest}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => removeFromArray(profile.interests, interest, 
                          (interests) => setProfile({...profile, interests})
                        )}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Skills & Strengths */}
      {step === 3 && (
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2 text-primary" />
              Skills & Strengths
            </CardTitle>
            <CardDescription>
              What are you good at? Include both technical and soft skills.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Skills Section */}
            <div>
              <Label className="text-sm font-medium">Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {commonSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={profile.skills.includes(skill) ? "default" : "outline"}
                    className={`cursor-pointer transition-smooth ${
                      profile.skills.includes(skill) 
                        ? "bg-gradient-primary text-white shadow-glow" 
                        : "hover:bg-accent"
                    }`}
                    onClick={() => {
                      if (profile.skills.includes(skill)) {
                        removeFromArray(profile.skills, skill, (skills) => 
                          setProfile({...profile, skills})
                        );
                      } else {
                        setProfile({...profile, skills: [...profile.skills, skill]});
                      }
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2 mt-3">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add custom skill"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToArray(profile.skills, newSkill, 
                        (skills) => setProfile({...profile, skills}), 
                        setNewSkill
                      );
                    }
                  }}
                />
                <Button
                  onClick={() => addToArray(profile.skills, newSkill, 
                    (skills) => setProfile({...profile, skills}), 
                    setNewSkill
                  )}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Strengths Section */}
            <div>
              <Label className="text-sm font-medium">Personal Strengths</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {commonStrengths.map((strength) => (
                  <Badge
                    key={strength}
                    variant={profile.strengths.includes(strength) ? "default" : "outline"}
                    className={`cursor-pointer transition-smooth ${
                      profile.strengths.includes(strength) 
                        ? "bg-gradient-secondary text-secondary-foreground" 
                        : "hover:bg-accent"
                    }`}
                    onClick={() => {
                      if (profile.strengths.includes(strength)) {
                        removeFromArray(profile.strengths, strength, (strengths) => 
                          setProfile({...profile, strengths})
                        );
                      } else {
                        setProfile({...profile, strengths: [...profile.strengths, strength]});
                      }
                    }}
                  >
                    {strength}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2 mt-3">
                <Input
                  value={newStrength}
                  onChange={(e) => setNewStrength(e.target.value)}
                  placeholder="Add custom strength"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToArray(profile.strengths, newStrength, 
                        (strengths) => setProfile({...profile, strengths}), 
                        setNewStrength
                      );
                    }
                  }}
                />
                <Button
                  onClick={() => addToArray(profile.strengths, newStrength, 
                    (strengths) => setProfile({...profile, strengths}), 
                    setNewStrength
                  )}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="experience">Experience (Internships, Projects, etc.)</Label>
              <Textarea
                id="experience"
                value={profile.experience}
                onChange={(e) => setProfile({...profile, experience: e.target.value})}
                placeholder="Describe any relevant experience, projects, or achievements..."
                className="mt-1"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Aspirations */}
      {step === 4 && (
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-primary" />
              Career Aspirations
            </CardTitle>
            <CardDescription>
              Tell us about your career goals and any challenges you're facing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="aspirations">Career Goals & Aspirations</Label>
              <Textarea
                id="aspirations"
                value={profile.aspirations}
                onChange={(e) => setProfile({...profile, aspirations: e.target.value})}
                placeholder="What do you want to achieve in your career? What impact do you want to make?"
                className="mt-1"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="challenges">Current Challenges</Label>
              <Textarea
                id="challenges"
                value={profile.challenges}
                onChange={(e) => setProfile({...profile, challenges: e.target.value})}
                placeholder="What challenges are you facing in your career journey? What areas do you need help with?"
                className="mt-1"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          variant="outline"
        >
          Previous
        </Button>
        
        {step < totalSteps ? (
          <Button
            onClick={handleNextStep}
            className="bg-gradient-primary text-white shadow-glow hover:shadow-strong transition-smooth"
          >
            Next Step
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-secondary text-secondary-foreground shadow-glow hover:shadow-strong transition-smooth"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving Profile...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Career Analysis
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default StudentProfileForm;