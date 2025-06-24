
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, UserCheck, Brain, MessageCircle, Clock, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SleepAidHero from "@/components/SleepAidHero";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      
      <main className="container px-4 mx-auto">
        <SleepAidHero />
        
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3">How Pleasant Sleep Helps You</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines AI-powered support, sleep tracking, and mental wellness tools to 
              improve your emotional well-being and sleep quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Moon} 
              title="Sleep Aid & Tracking" 
              description="AI-powered sleep tracking with personalized improvement plans and relaxation techniques."
            />
            <FeatureCard 
              icon={Brain} 
              title="Mental Wellness" 
              description="Daily mental wellness challenges, mood tracking, and stress reduction methods."
            />
            <FeatureCard 
              icon={MessageCircle} 
              title="24/7 AI Support" 
              description="Receive instant emotional support and guided coping techniques via our AI chatbot."
            />
            <FeatureCard 
              icon={UserCheck} 
              title="Professional Help" 
              description="Connect with certified therapists through secure, private video and chat sessions."
            />
            <FeatureCard 
              icon={Clock} 
              title="Smart Reminders" 
              description="Customized notifications to help establish healthy sleep and wellness habits."
            />
            <FeatureCard 
              icon={HeartPulse} 
              title="Community Support" 
              description="Join anonymous forums to share experiences and receive peer support."
            />
          </div>
        </section>
        
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Your personalized sleep improvement journey</h2>
              <p className="text-muted-foreground mb-6">
                Pleasant Sleep adapts to your unique sleep patterns and mental health needs. Our AI analyzes your data 
                to create customized sleep plans, suggest the most effective relaxation techniques, and provide real-time 
                support when you need it most.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 rounded-full p-1">
                    <Moon className="h-4 w-4 text-primary" />
                  </div>
                  <span>Smart sleep tracking and analysis</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 rounded-full p-1">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <span>AI-driven mood and stress prediction</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/10 rounded-full p-1">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span>Instant access to support and resources</span>
                </li>
              </ul>
              <Button asChild size="lg">
                <Link to="/register">Start Your Journey</Link>
              </Button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Sleep Quality Summary</h3>
                <span className="text-sm text-muted-foreground">Last 7 days</span>
              </div>
              <div className="h-[240px] mb-4 bg-muted/30 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Sleep analysis chart placeholder</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <Card className="bg-background">
                  <CardContent className="p-4">
                    <p className="text-2xl font-bold">6.8h</p>
                    <p className="text-xs text-muted-foreground">Avg. Duration</p>
                  </CardContent>
                </Card>
                <Card className="bg-background">
                  <CardContent className="p-4">
                    <p className="text-2xl font-bold">72%</p>
                    <p className="text-xs text-muted-foreground">Sleep Quality</p>
                  </CardContent>
                </Card>
                <Card className="bg-background">
                  <CardContent className="p-4">
                    <p className="text-2xl font-bold">25m</p>
                    <p className="text-xs text-muted-foreground">Fall Asleep Time</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <Card className="overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <CardHeader className="lg:w-1/2">
                <CardTitle className="text-2xl">Ready to improve your sleep and mental wellness?</CardTitle>
                <CardDescription>
                  Join thousands of users who have transformed their sleep quality and mental health 
                  with Pleasant Sleep's AI-powered platform.
                </CardDescription>
              </CardHeader>
              <div className="lg:w-1/2 bg-muted p-6 flex items-center">
                <CardFooter className="flex-col items-start p-0">
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-1 rounded-full mr-2">
                        <UserCheck className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Personalized sleep improvement plans</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-1 rounded-full mr-2">
                        <Brain className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">24/7 AI support for stress and anxiety</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-1 rounded-full mr-2">
                        <MessageCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Access to professional therapists</span>
                    </div>
                  </div>
                  <Button size="lg" className="w-full md:w-auto">
                    Get Started for Free
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </section>
      </main>
      
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">Pleasant Sleep</h3>
              <p className="text-muted-foreground text-sm">
                AI-powered mental health and sleep improvement platform providing 
                real-time support and personalized solutions.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sleep Tracking</li>
                <li>AI Mental Health Support</li>
                <li>Therapist Sessions</li>
                <li>Community Forums</li>
                <li>Guided Meditation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sleep Science Blog</li>
                <li>Mental Health Articles</li>
                <li>Relaxation Techniques</li>
                <li>Success Stories</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Pleasant Sleep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
