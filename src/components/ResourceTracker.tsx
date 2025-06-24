
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, PlusCircle, Users, Package, Droplet, Utensils } from "lucide-react";

const ResourceCard = ({ 
  title, 
  icon: Icon, 
  amount, 
  total, 
  unit,
  category,
  urgency
}: { 
  title: string, 
  icon: React.ElementType, 
  amount: number, 
  total: number, 
  unit: string,
  category: string,
  urgency: 'high' | 'medium' | 'low'
}) => {
  const percentage = Math.round((amount / total) * 100);
  
  const urgencyColor = {
    high: "text-destructive",
    medium: "text-amber-500",
    low: "text-emerald-500"
  }[urgency];
  
  const urgencyBg = {
    high: "bg-destructive/10",
    medium: "bg-amber-500/10",
    low: "bg-emerald-500/10"
  }[urgency];

  return (
    <Card className="bg-white dark:bg-slate-800/50 border-border/50 overflow-hidden transition-all duration-300 hover:shadow-elevation">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="font-medium">{category}</Badge>
          <div className={`w-8 h-8 rounded-full ${urgencyBg} flex items-center justify-center`}>
            <Icon className={`h-4 w-4 ${urgencyColor}`} />
          </div>
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
        <CardDescription className="text-xs flex items-center gap-1">
          Urgency: <span className={urgencyColor}>{urgency}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between mb-2">
          <div className="text-2xl font-bold">{amount.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">of {total.toLocaleString()} {unit}</div>
        </div>
        <Progress value={percentage} className="h-2" />
      </CardContent>
      <CardFooter className="pt-2 flex items-center justify-between">
        <Button variant="ghost" size="sm" className="text-xs px-0">View Details</Button>
        <Button size="sm" className="text-xs gap-1">
          <PlusCircle className="h-3 w-3" />
          Contribute
        </Button>
      </CardFooter>
    </Card>
  );
};

const ResourceTracker = () => {
  const resources = [
    {
      title: "Drinking Water",
      icon: Droplet,
      amount: 4500,
      total: 10000,
      unit: "gallons",
      category: "Essential",
      urgency: "high" as const
    },
    {
      title: "Food Supplies",
      icon: Utensils,
      amount: 3200,
      total: 5000,
      unit: "meals",
      category: "Essential",
      urgency: "medium" as const
    },
    {
      title: "Medical Kits",
      icon: Package,
      amount: 350,
      total: 500,
      unit: "kits",
      category: "Medical",
      urgency: "medium" as const
    },
    {
      title: "Volunteers",
      icon: Users,
      amount: 120,
      total: 200,
      unit: "people",
      category: "Personnel",
      urgency: "low" as const
    }
  ];

  return (
    <section id="resources" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Resource Allocation Tracker
              </h2>
              <p className="text-muted-foreground text-lg">
                Monitor available resources and contribute to areas with the highest need 
                to ensure efficient disaster response.
              </p>
            </div>
            
            <Button variant="outline" className="flex items-center gap-2 self-start">
              View All Resources
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                icon={resource.icon}
                amount={resource.amount}
                total={resource.total}
                unit={resource.unit}
                category={resource.category}
                urgency={resource.urgency}
              />
            ))}
          </div>
        </div>
        
        <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-border/50 overflow-hidden transition-all duration-300 hover:shadow-elevation mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>Contribute Resources</CardTitle>
            <CardDescription>
              Help communities in need by donating supplies or volunteering your time
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <Button className="flex-1">Donate Supplies</Button>
            <Button variant="outline" className="flex-1">Register as Volunteer</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ResourceTracker;
