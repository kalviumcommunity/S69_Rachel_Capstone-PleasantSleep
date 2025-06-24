import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, BarChart, Clock, Activity, PlusCircle, List } from 'lucide-react';
import Header from "@/components/Header";
import MoodCheckin from "@/components/mental-wellness/MoodCheckin";
import MoodStats from "@/components/mental-wellness/MoodStats";
import ExerciseCard from "@/components/mental-wellness/ExerciseCard";
import ChallengeCard from "@/components/mental-wellness/ChallengeCard";
import { useToast } from "@/hooks/use-toast";

const MentalWellness = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data
  const moodData = {
    today: { mood: "calm", intensity: 4, notes: "Feeling balanced today" },
    yesterday: { mood: "stressed", intensity: 7, notes: "Work deadline approaching" },
    thisWeek: [
      { date: "2023-03-22", mood: "happy", intensity: 8 },
      { date: "2023-03-23", mood: "anxious", intensity: 6 },
      { date: "2023-03-24", mood: "calm", intensity: 5 },
      { date: "2023-03-25", mood: "tired", intensity: 4 },
      { date: "2023-03-26", mood: "stressed", intensity: 7 },
      { date: "2023-03-27", mood: "calm", intensity: 4 },
    ],
    insights: [
      "Your mood tends to improve after meditation sessions",
      "Stress levels peak on Wednesdays",
      "You report feeling most calm on weekend mornings"
    ]
  };

  const exercises = [
    {
      id: 1,
      title: "Guided Morning Meditation",
      duration: "10 min",
      category: "meditation",
      completed: true,
      image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80&w=180"
    },
    {
      id: 2,
      title: "Deep Breathing Exercise",
      duration: "5 min",
      category: "breathing",
      completed: false,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=180"
    },
    {
      id: 3,
      title: "Progressive Muscle Relaxation",
      duration: "15 min",
      category: "relaxation",
      completed: false,
      image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=180"
    },
    {
      id: 4,
      title: "Stress Relief Visualization",
      duration: "8 min",
      category: "visualization",
      completed: false,
      image: "https://images.unsplash.com/photo-1498673394965-85cb14905c89?auto=format&fit=crop&q=80&w=180"
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "7-Day Mindfulness",
      progress: 3,
      total: 7,
      description: "Practice daily mindfulness for a full week"
    },
    {
      id: 2,
      title: "Gratitude Journal",
      progress: 5,
      total: 5,
      description: "Write down 3 things you're grateful for each day"
    },
    {
      id: 3,
      title: "Digital Detox Evening",
      progress: 2,
      total: 4,
      description: "Spend evening time without screens"
    }
  ];

  const startExercise = (exerciseId) => {
    toast({
      title: "Starting exercise",
      description: "Preparing your mindfulness exercise..."
    });
    navigate('/meditations');
  };

  // Format date helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      
      <main className="container px-4 mx-auto pt-8 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mental Wellness</h1>
            <p className="text-muted-foreground">
              Track your mood and practice mindfulness
            </p>
          </div>
          
          <Button onClick={() => navigate('/meditations')} className="mt-4 md:mt-0">
            Start Meditation
          </Button>
        </div>

        <MoodCheckin />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MoodStats moodData={moodData.today} />
          
          {/* Weekly Insights Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart className="w-5 h-5 mr-2 text-primary" />
                Weekly Insights
              </CardTitle>
              <CardDescription>Your emotional trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-[100px] bg-muted/50 rounded flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Mood chart placeholder</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  {moodData.insights.map((insight, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                        <Brain className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="ml-auto">
                View Full Analysis
              </Button>
            </CardFooter>
          </Card>
          
          {/* Wellness Streak Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Heart className="w-5 h-5 mr-2 text-primary" />
                Wellness Streak
              </CardTitle>
              <CardDescription>Your mindfulness journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#e2e8f0" 
                      strokeWidth="10" 
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth="10" 
                      strokeDasharray="283" 
                      strokeDashoffset="70"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">12</span>
                    <span className="text-xs text-muted-foreground">days</span>
                  </div>
                </div>
                <p className="font-medium text-center">Current Streak</p>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  You've logged your mood for 12 consecutive days!
                </p>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mt-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-6 rounded ${i < 7 ? 'bg-primary/80' : 'bg-muted'}`}
                  ></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="exercises" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="exercises">Mindfulness Exercises</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="history">Mood History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="exercises">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {exercises.map((exercise) => (
                <ExerciseCard 
                  key={exercise.id} 
                  exercise={exercise} 
                  onStart={startExercise}
                />
              ))}
              
              <Card className="flex flex-col items-center justify-center h-full min-h-[250px] border-dashed">
                <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground font-medium">Explore More Exercises</p>
                <Button variant="ghost" className="mt-2">Browse Library</Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="challenges">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
              
              <Card className="flex flex-col items-center justify-center border-dashed">
                <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground font-medium">Start New Challenge</p>
                <Button variant="ghost" className="mt-2">Browse Challenges</Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Mood History</CardTitle>
                <CardDescription>
                  Track how your mood has changed over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-sm text-muted-foreground">
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-left py-3 px-4 font-medium">Mood</th>
                        <th className="text-left py-3 px-4 font-medium">Intensity</th>
                        <th className="text-left py-3 px-4 font-medium">Notes</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {[moodData.today, moodData.yesterday].concat(moodData.thisWeek.map(day => ({ 
                        mood: day.mood, 
                        intensity: day.intensity, 
                        notes: ""
                      }))).map((entry, index) => (
                        <tr key={index} className="text-sm hover:bg-muted/50">
                          <td className="py-3 px-4">
                            {index === 0 ? "Today" : 
                             index === 1 ? "Yesterday" : 
                             `${formatDate(moodData.thisWeek[index-2].date)}`}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="text-lg mr-2">
                                {entry.mood === "happy" && "😊"}
                                {entry.mood === "calm" && "😌"}
                                {entry.mood === "stressed" && "😰"}
                                {entry.mood === "anxious" && "😟"}
                                {entry.mood === "tired" && "😴"}
                                {entry.mood === "sad" && "😔"}
                              </span>
                              <span className="capitalize">{entry.mood}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`
                              ${entry.intensity >= 7 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' : ''}
                              ${entry.intensity >= 4 && entry.intensity < 7 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100' : ''}
                              ${entry.intensity < 4 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : ''}
                            `}>
                              {entry.intensity}/10
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {entry.notes || "—"}
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Export Mood Data</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* AI Insights Section */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Mental Wellness Insights</CardTitle>
            <CardDescription>
              Personalized recommendations based on your mental health patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-muted/40 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-medium">Stress Pattern Detected</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Your stress levels tend to increase mid-week. Consider scheduling a relaxation session on Wednesday afternoons.
                </p>
                <Button size="sm">View Recommendations</Button>
              </div>
              
              <div className="bg-muted/40 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-medium">Sleep & Mood Connection</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  We've noticed your mood improves after nights with 7+ hours of sleep. Consider prioritizing consistent sleep times.
                </p>
                <Button size="sm">Improve Sleep</Button>
              </div>
              
              <div className="bg-muted/40 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Heart className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-medium">Mindfulness Impact</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Your meditation practice has been associated with a 35% reduction in reported anxiety levels.
                </p>
                <Button size="sm">Continue Practice</Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-primary/10 rounded-lg">
              <div className="md:w-2/3 mb-4 md:mb-0">
                <h3 className="font-medium mb-2">Need additional support?</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI suggests speaking with a mental health professional might be beneficial based on your recent mood patterns.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate('/chat-support')}>
                  AI Support Chat
                </Button>
                <Button onClick={() => navigate('/therapists')}>
                  Find Therapists
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MentalWellness;
