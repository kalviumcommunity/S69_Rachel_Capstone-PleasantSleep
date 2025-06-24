
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Info, MapPin, Clock } from "lucide-react";

type AlertType = 'warning' | 'info' | 'critical';

interface AlertProps {
  title: string;
  description: string;
  location: string;
  time: string;
  type: AlertType;
}

const AlertCard = ({ title, description, location, time, type }: AlertProps) => {
  const typeConfig = {
    warning: {
      icon: AlertTriangle,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      badge: "bg-amber-500"
    },
    info: {
      icon: Info,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      badge: "bg-blue-500"
    },
    critical: {
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      badge: "bg-destructive"
    }
  };
  
  const { icon: Icon, color, bgColor, badge } = typeConfig[type];
  
  return (
    <Card className="overflow-hidden transition-all duration-300 border-border/50 hover:shadow-elevation">
      <div className={`h-1 w-full ${badge}`}></div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge className={`font-medium ${badge}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
          <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center`}>
            <Icon className={`h-4 w-4 ${color}`} />
          </div>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-xs text-muted-foreground mb-1">
          <MapPin className="h-3 w-3 mr-1" /> {location}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" /> {time}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-end">
        <Button variant="ghost" className="text-xs">View Details</Button>
      </CardFooter>
    </Card>
  );
};

const AlertSystem = () => {
  const alerts: AlertProps[] = [
    {
      title: "Flash Flood Warning",
      description: "Rising water levels in coastal areas. Immediate evacuation recommended for Zone B.",
      location: "Coastal District, Southern Region",
      time: "Active until 18:00",
      type: "critical"
    },
    {
      title: "Road Closures",
      description: "Highway 101 closed between exits 10-15 due to mudslide. Use alternate routes.",
      location: "Northern Highway, Western Region",
      time: "Updated 1h ago",
      type: "warning"
    },
    {
      title: "New Shelter Available",
      description: "Central Community Center now accepting displaced residents. Capacity: 200.",
      location: "Downtown District, Central Region",
      time: "Opened 3h ago",
      type: "info"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-alert/10 flex items-center justify-center">
              <Bell className="h-6 w-6 text-alert" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Critical Alerts</h2>
          </div>
          
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
            Stay informed with real-time disaster alerts and important safety information.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alerts.map((alert, index) => (
              <AlertCard key={index} {...alert} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted mb-6">
              <Bell className="h-4 w-4" />
              <span className="text-sm font-medium">Get real-time alerts</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button variant="outline" className="flex-1">SMS Notifications</Button>
              <Button className="flex-1">Email Alerts</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertSystem;
