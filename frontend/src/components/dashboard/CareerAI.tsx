import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  MessageSquare, 
  Send, 
  Sparkles, 
  User, 
  Bot,
  Lightbulb,
  Target,
  TrendingUp,
  BookOpen
} from "lucide-react";

/**
 * Career AI Chat Component
 * 
 * TODO: Integrate Google Gemini API
 * 
 * Steps for Gemini API Integration:
 * 1. Install Google AI SDK: npm install @google/generative-ai
 * 2. Get API key from Google AI Studio
 * 3. Create API service function
 * 4. Replace the placeholder response in handleSendMessage
 * 
 * Example Gemini API usage:
 * import { GoogleGenerativeAI } from "@google/generative-ai";
 * 
 * const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
 * const model = genAI.getGenerativeModel({ model: "gemini-pro" });
 * 
 * const callGeminiAPI = async (prompt: string) => {
 *   const result = await model.generateContent(prompt);
 *   return result.response.text();
 * };
 */

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const CareerAI = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your Career AI assistant. I can help you with career guidance, skill development, job market insights, and educational pathways. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickActions = [
    { label: "Career Suggestions", icon: Target, query: "What career options suit my profile?" },
    { label: "Skill Development", icon: TrendingUp, query: "What skills should I develop?" },
    { label: "Market Trends", icon: Sparkles, query: "What are the current job market trends?" },
    { label: "Learning Path", icon: BookOpen, query: "Create a learning roadmap for me" }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // TODO: Replace with Google Gemini API integration
    try {
      // Placeholder for Gemini API call
      // const response = await callGeminiAPI(inputMessage);
      
      // Temporary placeholder response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: "I'm ready to help! Please integrate the Google Gemini API to provide personalized career guidance.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setIsLoading(false);
    }
  };

  const handleQuickAction = (query: string) => {
    setInputMessage(query);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Brain className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Career AI Assistant</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get personalized career guidance, skill recommendations, and market insights powered by AI.
        </p>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-primary" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Get instant help with these common career questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto p-4 hover:bg-accent transition-smooth"
                onClick={() => handleQuickAction(action.query)}
              >
                <action.icon className="h-5 w-5 mr-3 text-primary" />
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-sm text-muted-foreground">{action.query}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            AI Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'ai' && (
                      <Bot className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about careers, skills, job market trends..."
              className="flex-1 min-h-[80px] resize-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-primary text-white shadow-glow hover:shadow-strong transition-smooth"
              size="lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            Press Enter to send, Shift+Enter for new line
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerAI;