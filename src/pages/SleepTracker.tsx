
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, Clock, Sun, PlusCircle, Calendar, ChevronLeft, ChevronRight, BarChart, Activity } from 'lucide-react';
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const SleepTracker = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [logSleepOpen, setLogSleepOpen] = useState(false);
  
  // Mock sleep data
  const sleepData = {
    history: [
      { date: "2023-03-22", hours: 6.5, quality: 65, bedtime: "11:30 PM", wakeup: "6:00 AM", notes: "Woke up twice during night" },
      { date: "2023-03-23", hours: 7.2, quality: 78, bedtime: "10:45 PM", wakeup: "6:00 AM", notes: "Felt rested" },
      { date: "2023-03-24", hours: 8.0, quality: 90, bedtime: "10:30 PM", wakeup: "6:30 AM", notes: "Best sleep in weeks" },
      { date: "2023-03-25", hours: 5.8, quality: 50, bedtime: "12:15 AM", wakeup: "6:00 AM", notes: "Stress caused difficulty falling asleep" },
      { date: "2023-03-26", hours: 7.5, quality: 82, bedtime: "10:30 PM", wakeup: "6:00 AM", notes: "Used meditation before bed" },
      { date: "2023-03-27", hours: 6.9, quality: 75, bedtime: "11:00 PM", wakeup: "5:54 AM", notes: "Normal sleep" },
    ],
    averages: {
      weekly: 7.0,
      weeklyQuality: 73,
      monthly: 6.8,
      monthlyQuality: 70,
    },
    insights: [
      "Your sleep quality improves when you go to bed before 11 PM",
      "Meditation before sleep shows a 22% improvement in your sleep quality",
      "You sleep an average of 38 minutes longer on weekends"
    ]
  };
  
  // Sleep log form state
  const [sleepLog, setSleepLog] = useState({
    date: new Date().toISOString().split('T')[0],
    bedtime: "22:30",
    wakeup: "06:30",
    quality: "80",
    notes: ""
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSleepLog(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle quality select changes
  const handleQualityChange = (value: string) => {
    setSleepLog(prev => ({ ...prev, quality: value }));
  };
  
  // Handle sleep log submission
  const handleSubmitSleepLog = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Sleep logged successfully!",
      description: "Your sleep data has been saved and analyzed."
    });
    
    setLogSleepOpen(false);
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  
  // Navigation for date selection
  const prevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };
  
  const nextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };
  
  // Quality color based on score
  const getQualityColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 65) return "text-amber-600";
    return "text-red-600";
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      
      <main className="container px-4 mx-auto pt-8 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Sleep Tracker</h1>
            <p className="text-muted-foreground">
              Monitor and improve your sleep patterns
            </p>
          </div>
          
          <Button onClick={() => setLogSleepOpen(!logSleepOpen)} className="mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Log Sleep
          </Button>
        </div>
        
        {logSleepOpen && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Log Your Sleep</CardTitle>
              <CardDescription>
                Record your sleep details to get personalized insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitSleepLog} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={sleepLog.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quality">Sleep Quality</Label>
                    <Select onValueChange={handleQualityChange} value={sleepLog.quality}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">Excellent (100%)</SelectItem>
                        <SelectItem value="80">Good (80%)</SelectItem>
                        <SelectItem value="60">Average (60%)</SelectItem>
                        <SelectItem value="40">Poor (40%)</SelectItem>
                        <SelectItem value="20">Terrible (20%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bedtime">Bedtime</Label>
                    <Input
                      id="bedtime"
                      name="bedtime"
                      type="time"
                      value={sleepLog.bedtime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wakeup">Wake Up Time</Label>
                    <Input
                      id="wakeup"
                      name="wakeup"
                      type="time"
                      value={sleepLog.wakeup}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Any observations about your sleep? (Optional)"
                    className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background text-sm"
                    value={sleepLog.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setLogSleepOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitSleepLog}>Save Sleep Log</Button>
            </CardFooter>
          </Card>
        )}
        
        <Tabs defaultValue="dashboard">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="history">Sleep History</TabsTrigger>
            <TabsTrigger value="insights">Sleep Insights</TabsTrigger>
            <TabsTrigger value="goals">Goals & Habits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Today's Sleep Score</CardTitle>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary">
                      Last Night
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center my-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
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
                          strokeDashoffset={283 - (283 * (sleepData.history[sleepData.history.length - 1].quality / 100))}
                          transform="rotate(-90 50 50)" 
                        />
                      </svg>
                      <div className="absolute text-3xl font-bold">
                        {sleepData.history[sleepData.history.length - 1].quality}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <Moon className="h-4 w-4 mr-1" />
                        <span>Bedtime</span>
                      </div>
                      <span className="font-medium">
                        {sleepData.history[sleepData.history.length - 1].bedtime}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <Sun className="h-4 w-4 mr-1" />
                        <span>Wake up</span>
                      </div>
                      <span className="font-medium">
                        {sleepData.history[sleepData.history.length - 1].wakeup}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Sleep duration</span>
                      </div>
                      <span className="font-medium">
                        {sleepData.history[sleepData.history.length - 1].hours}h
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Weekly Average</CardTitle>
                  <CardDescription>Your past 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-around py-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{sleepData.averages.weekly}h</p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                    
                    <Separator orientation="vertical" className="h-16" />
                    
                    <div className="text-center">
                      <p className="text-3xl font-bold">{sleepData.averages.weeklyQuality}</p>
                      <p className="text-xs text-muted-foreground">Quality</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="h-1.5 bg-muted rounded-full w-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${sleepData.averages.weekly / 10 * 100}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Target: 8h</span>
                      <span>{Math.round(sleepData.averages.weekly / 8 * 100)}% of goal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                  <CardDescription>For better sleep quality</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                        <Moon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Try going to bed at 10:30 PM tonight for optimal sleep cycle</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Avoid caffeine after 2 PM to improve deep sleep</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                        <Moon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Try the "Sleep Reset" meditation before bedtime</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Recommendations
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Sleep Patterns</CardTitle>
                <CardDescription>Your sleep data over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted rounded-lg flex items-center justify-center mb-6">
                  <p className="text-muted-foreground">Sleep Pattern Chart Placeholder</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-sm mb-3">Recent Sleep Quality</h3>
                    <div className="space-y-2">
                      {sleepData.history.slice(-5).reverse().map((day, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-9 text-xs text-muted-foreground">
                            {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="flex-1 ml-2">
                            <div className="h-2 bg-muted rounded-full w-full overflow-hidden">
                              <div 
                                className={`h-full ${day.quality >= 80 ? 'bg-green-500' : day.quality >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                style={{ width: `${day.quality}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className={`w-8 text-right text-xs font-medium ${getQualityColor(day.quality)}`}>
                            {day.quality}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-sm mb-3">Recent Sleep Duration</h3>
                    <div className="space-y-2">
                      {sleepData.history.slice(-5).reverse().map((day, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-9 text-xs text-muted-foreground">
                            {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="flex-1 ml-2">
                            <div className="h-2 bg-muted rounded-full w-full overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${(day.hours / 10) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-8 text-right text-xs font-medium">
                            {day.hours}h
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Sleep History</CardTitle>
                <CardDescription>Track your sleep patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-sm text-muted-foreground">
                        <th className="text-left py-3 px-2 font-medium">Date</th>
                        <th className="text-left py-3 px-2 font-medium">Duration</th>
                        <th className="text-left py-3 px-2 font-medium">Quality</th>
                        <th className="text-left py-3 px-2 font-medium">Bedtime</th>
                        <th className="text-left py-3 px-2 font-medium">Wake Up</th>
                        <th className="text-left py-3 px-2 font-medium">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {sleepData.history.reverse().map((entry, index) => (
                        <tr key={index} className="text-sm hover:bg-muted/50">
                          <td className="py-3 px-2">
                            {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-3 px-2 font-medium">{entry.hours}h</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              entry.quality >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                              entry.quality >= 60 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100' : 
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                            }`}>
                              {entry.quality}%
                            </span>
                          </td>
                          <td className="py-3 px-2">{entry.bedtime}</td>
                          <td className="py-3 px-2">{entry.wakeup}</td>
                          <td className="py-3 px-2 text-muted-foreground">{entry.notes || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Sleep Insights</CardTitle>
                <CardDescription>Personalized analysis based on your sleep patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-card">
                    <div className="flex items-center mb-4">
                      <BarChart className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-medium">Sleep Patterns</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {sleepData.insights.map((insight, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          </div>
                          <p className="text-sm">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg bg-card">
                      <div className="flex items-center mb-4">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="font-medium">Optimal Sleep Schedule</h3>
                      </div>
                      <p className="text-sm mb-4">
                        Based on your data, here's your personalized sleep schedule for optimal rest:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Moon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Ideal Bedtime</span>
                          </div>
                          <span className="font-medium">10:30 PM</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Sun className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Ideal Wake Time</span>
                          </div>
                          <span className="font-medium">6:30 AM</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Target Duration</span>
                          </div>
                          <span className="font-medium">8 hours</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-card">
                      <div className="flex items-center mb-4">
                        <Activity className="h-5 w-5 mr-2 text-primary" />
                        <h3 className="font-medium">Sleep Quality Factors</h3>
                      </div>
                      <p className="text-sm mb-4">
                        These factors appear to influence your sleep quality the most:
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Consistent Bedtime</span>
                            <span className="text-sm font-medium text-green-600">High Impact</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Evening Screen Time</span>
                            <span className="text-sm font-medium text-amber-600">Medium Impact</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Pre-Sleep Meditation</span>
                            <span className="text-sm font-medium text-green-600">High Impact</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Goals & Habits</CardTitle>
                <CardDescription>Setup goals to improve your sleep quality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-3">Current Sleep Goals</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm font-medium">Sleep Duration</span>
                        </div>
                        <span className="text-sm">Target: 8 hours</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full w-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(sleepData.averages.weekly / 8) * 100}%` }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Current: {sleepData.averages.weekly}h avg</span>
                        <span className="text-xs font-medium">{Math.round((sleepData.averages.weekly / 8) * 100)}% of goal</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm font-medium">Sleep Quality</span>
                        </div>
                        <span className="text-sm">Target: 85%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full w-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(sleepData.averages.weeklyQuality / 85) * 100}%` }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Current: {sleepData.averages.weeklyQuality}% avg</span>
                        <span className="text-xs font-medium">{Math.round((sleepData.averages.weeklyQuality / 85) * 100)}% of goal</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <Moon className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm font-medium">Consistent Bedtime</span>
                        </div>
                        <span className="text-sm">Target: 10:30 PM</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full w-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "70%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Current: Varies</span>
                        <span className="text-xs font-medium">4/7 days on target</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-3">Sleep Habits to Develop</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          id="habit1" 
                          className="mt-1 h-4 w-4 rounded-sm border-gray-300"
                        />
                        <div className="ml-3">
                          <label htmlFor="habit1" className="text-sm font-medium">Evening meditation</label>
                          <p className="text-xs text-muted-foreground">Practice for 10 minutes before bed</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-100 hover:text-green-800">
                        4/7 days
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          id="habit2" 
                          className="mt-1 h-4 w-4 rounded-sm border-gray-300"
                        />
                        <div className="ml-3">
                          <label htmlFor="habit2" className="text-sm font-medium">No screens before bed</label>
                          <p className="text-xs text-muted-foreground">Avoid all screens 1 hour before sleep</p>
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 hover:bg-amber-100 hover:text-amber-800">
                        2/7 days
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          id="habit3" 
                          className="mt-1 h-4 w-4 rounded-sm border-gray-300"
                        />
                        <div className="ml-3">
                          <label htmlFor="habit3" className="text-sm font-medium">Consistent wake time</label>
                          <p className="text-xs text-muted-foreground">Wake up at 6:30 AM every day</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-100 hover:text-green-800">
                        5/7 days
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          id="habit4" 
                          className="mt-1 h-4 w-4 rounded-sm border-gray-300"
                        />
                        <div className="ml-3">
                          <label htmlFor="habit4" className="text-sm font-medium">No caffeine after 2 PM</label>
                          <p className="text-xs text-muted-foreground">Avoid coffee, tea, and energy drinks</p>
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 hover:bg-amber-100 hover:text-amber-800">
                        3/7 days
                      </Badge>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Habit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SleepTracker;
