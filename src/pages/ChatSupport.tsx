import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Bot, 
  Brain, 
  Moon, 
  Heart,
  Info,
  User,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Bookmark,
  Clock,
  PlusCircle
} from 'lucide-react';
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

// Define message types
type MessageRole = 'user' | 'ai' | 'system';
type MessageType = 'text' | 'suggestion';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  type: MessageType;
  timestamp: Date;
  suggestions?: string[];
}

// Define suggested prompts
const suggestedPrompts = [
  "I'm feeling anxious about work. Any tips?",
  "How can I fall asleep faster at night?",
  "I keep waking up during the night. Help?",
  "What are some relaxation techniques for stress?",
  "How can I establish a better sleep routine?",
  "I'm feeling overwhelmed. What should I do?"
];

// Mock conversation history
const initialConversation: Message[] = [
  {
    id: '1',
    role: 'system',
    content: 'Welcome to Pleasant Sleep AI Assistant. I can help you with sleep improvement, stress management, and mental wellness. How are you feeling today?',
    type: 'text',
    timestamp: new Date(Date.now() - 1000),
    suggestions: [
      "I'm having trouble sleeping",
      "I feel stressed",
      "I'd like to improve my sleep routine",
      "I need help with anxiety"
    ]
  }
];

const ChatSupport = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(initialConversation);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const generateId = () => {
    return Math.random().toString(36).substring(2, 11);
  };
  
  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      type: 'text',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let aiResponse: Message;
      
      // Simple keyword matching to provide somewhat relevant responses
      if (content.toLowerCase().includes('sleep') || content.toLowerCase().includes('tired') || content.toLowerCase().includes('insomnia')) {
        aiResponse = {
          id: generateId(),
          role: 'ai',
          content: "Sleep issues can be challenging. Based on your message, here are some suggestions: 1) Try to maintain a consistent sleep schedule, 2) Avoid screens 1 hour before bed, 3) Create a relaxing bedtime routine, and 4) Keep your bedroom cool, dark, and quiet. Would you like to explore any of these options in more detail?",
          type: 'text',
          timestamp: new Date(),
          suggestions: ["Tell me about bedtime routines", "How can I reduce screen time?", "What temperature is ideal for sleep?"]
        };
      } else if (content.toLowerCase().includes('stress') || content.toLowerCase().includes('anxious') || content.toLowerCase().includes('anxiety')) {
        aiResponse = {
          id: generateId(),
          role: 'ai',
          content: "I understand that you're dealing with stress or anxiety. Here are some evidence-based techniques that might help: 1) Deep breathing exercises, 2) Progressive muscle relaxation, 3) Mindfulness meditation, and 4) Physical activity. Would you like to try a quick breathing exercise right now?",
          type: 'text',
          timestamp: new Date(),
          suggestions: ["Guide me through breathing exercise", "Tell me about mindfulness", "How does exercise help stress?"]
        };
      } else {
        aiResponse = {
          id: generateId(),
          role: 'ai',
          content: "Thanks for sharing that with me. I'm here to help with sleep improvement and mental wellness strategies. Could you tell me more about what specific aspects you'd like assistance with? Whether it's sleep quality, stress management, or relaxation techniques, I can provide personalized guidance.",
          type: 'text',
          timestamp: new Date(),
          suggestions: ["Help with sleep quality", "Stress management techniques", "How to relax before bed"]
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };
  
  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Save conversation
  const saveConversation = () => {
    toast({
      title: "Conversation Saved",
      description: "This conversation has been saved to your history."
    });
  };
  
  // Start new conversation
  const startNewConversation = () => {
    setMessages(initialConversation);
  };
  
  // Feedback handlers
  const handlePositiveFeedback = (messageId: string) => {
    toast({
      title: "Thank you for your feedback",
      description: "We're glad this response was helpful."
    });
  };
  
  const handleNegativeFeedback = (messageId: string) => {
    toast({
      title: "Thank you for your feedback",
      description: "We'll use this to improve future responses."
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      
      <main className="container px-4 mx-auto pt-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="chat">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="chat" className="gap-2">
                  <Bot size={16} />
                  AI Assistant
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <Clock size={16} />
                  Chat History
                </TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={saveConversation}>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={startNewConversation}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
              </div>
            </div>
            
            <TabsContent value="chat" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="hidden md:block">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-primary" />
                        Suggested Prompts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {suggestedPrompts.map((prompt, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="justify-start w-full text-left h-auto py-2"
                          onClick={() => sendMessage(prompt)}
                        >
                          <div className="mr-2 bg-primary/10 text-primary rounded-full p-1">
                            <Sparkles size={12} />
                          </div>
                          <span className="text-sm">{prompt}</span>
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Info className="h-5 w-5 mr-2 text-primary" />
                        About AI Assistant
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-3">
                      <p>
                        Our AI Assistant is designed to provide support for sleep improvement and 
                        mental wellness using evidence-based approaches.
                      </p>
                      <p>
                        While helpful for many concerns, it's not a replacement for professional 
                        mental health care. For serious concerns, please consult a healthcare provider.
                      </p>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        Connect with Therapist
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-3">
                  <Card className="h-[70vh] flex flex-col">
                    <CardHeader className="pb-3 border-b">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="https://i.pravatar.cc/100" />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot size={16} />
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-base">Sleep & Wellness AI</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto py-4 px-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div key={message.id}>
                            {message.role === 'user' ? (
                              <div className="flex items-start justify-end mb-4">
                                <div className="bg-primary text-primary-foreground rounded-xl rounded-tr-none py-2 px-3 max-w-[80%]">
                                  <p>{message.content}</p>
                                  <div className="mt-1 text-right">
                                    <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                                  </div>
                                </div>
                                <div className="ml-2 mt-1">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-muted">
                                      <User size={16} />
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                              </div>
                            ) : message.role === 'ai' ? (
                              <div className="flex items-start mb-4">
                                <div className="mr-2 mt-1">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://i.pravatar.cc/100" />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                      <Bot size={16} />
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="bg-muted rounded-xl rounded-tl-none py-2 px-3 max-w-[80%]">
                                  <p>{message.content}</p>
                                  <div className="mt-1 flex justify-between items-center">
                                    <div className="flex gap-1">
                                      <button 
                                        className="text-muted-foreground hover:text-primary p-1"
                                        onClick={() => handlePositiveFeedback(message.id)}
                                      >
                                        <ThumbsUp size={14} />
                                      </button>
                                      <button 
                                        className="text-muted-foreground hover:text-primary p-1"
                                        onClick={() => handleNegativeFeedback(message.id)}
                                      >
                                        <ThumbsDown size={14} />
                                      </button>
                                      <button 
                                        className="text-muted-foreground hover:text-primary p-1"
                                      >
                                        <MoreHorizontal size={14} />
                                      </button>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                                  </div>
                                  
                                  {message.suggestions && message.suggestions.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {message.suggestions.map((suggestion, index) => (
                                        <button
                                          key={index}
                                          className="text-xs bg-background hover:bg-primary/10 text-primary rounded-full px-3 py-1"
                                          onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                          {suggestion}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-center mb-4">
                                <div className="bg-primary/10 text-primary text-sm rounded-lg py-2 px-4 max-w-[80%] text-center">
                                  {message.content}
                                  
                                  {message.suggestions && message.suggestions.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2 justify-center">
                                      {message.suggestions.map((suggestion, index) => (
                                        <button
                                          key={index}
                                          className="text-xs bg-background hover:bg-primary/10 text-primary rounded-full px-3 py-1"
                                          onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                          {suggestion}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {isTyping && (
                          <div className="flex items-start mb-4">
                            <div className="mr-2 mt-1">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="https://i.pravatar.cc/100" />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  <Bot size={16} />
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="bg-muted rounded-xl rounded-tl-none py-2 px-4 max-w-[80%]">
                              <div className="flex space-x-1">
                                <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>
                    </CardContent>
                    <div className="p-4 border-t">
                      <form 
                        className="flex gap-2" 
                        onSubmit={(e) => {
                          e.preventDefault();
                          sendMessage(input);
                        }}
                      >
                        <Input
                          placeholder="Type your message..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                      <div className="flex justify-center mt-2">
                        <p className="text-xs text-muted-foreground">
                          AI responses are generated to assist with sleep and wellness. Not a replacement for professional advice.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Your Conversation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="flex justify-center items-center mb-4">
                      <div className="bg-muted rounded-full p-4">
                        <Clock className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">No saved conversations yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Your conversations with the AI assistant will appear here once you save them.
                    </p>
                    <Button onClick={() => {
                      toast({
                        title: "Coming Soon",
                        description: "This feature will be available in a future update."
                      });
                    }}>
                      Go to Current Conversation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ChatSupport;
