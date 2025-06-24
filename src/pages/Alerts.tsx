
import React, { useState } from 'react';
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  BellRing, 
  Check, 
  Clock, 
  Filter, 
  MapPin,  
  Plus, 
  Search,
  AlertTriangle,
  Info
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type AlertSeverity = "critical" | "warning" | "info";
type AlertStatus = "active" | "resolved";

interface Alert {
  id: number;
  title: string;
  description: string;
  location: string;
  severity: AlertSeverity;
  status: AlertStatus;
  timestamp: string;
  expiresAt?: string;
}

const Alerts = () => {
  const { toast } = useToast();
  
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      title: "Flash Flood Warning",
      description: "Flash flooding is occurring or imminent. Move to higher ground immediately if near streams or low-lying areas.",
      location: "Riverside County, Eastern Valley",
      severity: "critical",
      status: "active",
      timestamp: "2023-03-26T08:30:00",
      expiresAt: "2023-03-27T08:30:00"
    },
    {
      id: 2,
      title: "Road Closure Alert",
      description: "Highway 101 between exits 25-30 is closed due to landslide. Use alternate routes.",
      location: "Highway 101, Northern Region",
      severity: "warning",
      status: "active",
      timestamp: "2023-03-25T14:15:00",
      expiresAt: "2023-03-28T14:15:00"
    },
    {
      id: 3,
      title: "Evacuation Order",
      description: "Mandatory evacuation for Pinecrest neighborhood due to approaching wildfire. Evacuation center at Central High School.",
      location: "Pinecrest Neighborhood, Western District",
      severity: "critical",
      status: "active",
      timestamp: "2023-03-26T11:45:00"
    },
    {
      id: 4,
      title: "Power Outage Update",
      description: "Power has been restored to 60% of affected areas. Crews working on remaining outages.",
      location: "Multiple Districts",
      severity: "info",
      status: "active",
      timestamp: "2023-03-25T17:30:00"
    },
    {
      id: 5,
      title: "Shelter Availability",
      description: "Additional emergency shelter opened at Community Center with capacity for 150 people.",
      location: "Downtown, Central District",
      severity: "info",
      status: "active",
      timestamp: "2023-03-24T09:15:00"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<AlertSeverity | "all">("all");
  const [filterStatus, setFilterStatus] = useState<AlertStatus | "all">("active");
  
  const [newAlert, setNewAlert] = useState<Omit<Alert, "id" | "timestamp">>({
    title: '',
    description: '',
    location: '',
    severity: "warning",
    status: "active"
  });
  
  const [userSubscriptions, setUserSubscriptions] = useState({
    email: '',
    phone: '',
    locations: [] as string[],
    severities: {
      critical: true,
      warning: true,
      info: false
    }
  });
  
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentDate = new Date();
    
    const newAlertEntry: Alert = {
      id: alerts.length + 1,
      ...newAlert,
      timestamp: currentDate.toISOString()
    };
    
    setAlerts([newAlertEntry, ...alerts]);
    
    setNewAlert({
      title: '',
      description: '',
      location: '',
      severity: "warning",
      status: "active"
    });
    
    toast({
      title: "Alert Created",
      description: "Your alert has been created and distributed.",
    });
  };
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Subscription Successful",
      description: "You will now receive alerts based on your preferences.",
    });
  };
  
  const handleResolveAlert = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: "resolved" } : alert
    ));
    
    toast({
      title: "Alert Resolved",
      description: "The alert has been marked as resolved.",
    });
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Emergency Alerts</h1>
                <p className="text-muted-foreground">
                  Stay informed about critical events and emergency situations
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Bell size={18} />
                      Subscribe to Alerts
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Alert Subscriptions</DialogTitle>
                      <DialogDescription>
                        Customize how you receive emergency alerts and notifications.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubscribe}>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email Notifications</label>
                          <Input 
                            type="email" 
                            placeholder="Your email address"
                            value={userSubscriptions.email}
                            onChange={(e) => setUserSubscriptions({...userSubscriptions, email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">SMS Notifications</label>
                          <Input 
                            type="tel" 
                            placeholder="Your phone number"
                            value={userSubscriptions.phone}
                            onChange={(e) => setUserSubscriptions({...userSubscriptions, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Alert Severity</label>
                          <div className="flex flex-col space-y-2">
                            <label className="flex items-center space-x-2 text-sm">
                              <input 
                                type="checkbox" 
                                checked={userSubscriptions.severities.critical}
                                onChange={() => setUserSubscriptions({
                                  ...userSubscriptions, 
                                  severities: {
                                    ...userSubscriptions.severities,
                                    critical: !userSubscriptions.severities.critical
                                  }
                                })}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <span>Critical Alerts</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm">
                              <input 
                                type="checkbox" 
                                checked={userSubscriptions.severities.warning}
                                onChange={() => setUserSubscriptions({
                                  ...userSubscriptions, 
                                  severities: {
                                    ...userSubscriptions.severities,
                                    warning: !userSubscriptions.severities.warning
                                  }
                                })}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <span>Warning Alerts</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm">
                              <input 
                                type="checkbox" 
                                checked={userSubscriptions.severities.info}
                                onChange={() => setUserSubscriptions({
                                  ...userSubscriptions, 
                                  severities: {
                                    ...userSubscriptions.severities,
                                    info: !userSubscriptions.severities.info
                                  }
                                })}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <span>Informational Updates</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Preferences</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus size={18} />
                      Create Alert
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Alert</DialogTitle>
                      <DialogDescription>
                        Create a new emergency alert to notify the community.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateAlert}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="alert-title" className="text-right text-sm">Title</label>
                          <Input 
                            id="alert-title" 
                            value={newAlert.title}
                            onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                            className="col-span-3" 
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="alert-location" className="text-right text-sm">Location</label>
                          <Input 
                            id="alert-location" 
                            value={newAlert.location}
                            onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                            className="col-span-3" 
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="alert-severity" className="text-right text-sm">Severity</label>
                          <select 
                            id="alert-severity" 
                            value={newAlert.severity}
                            onChange={(e) => setNewAlert({...newAlert, severity: e.target.value as AlertSeverity})}
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                          >
                            <option value="critical">Critical</option>
                            <option value="warning">Warning</option>
                            <option value="info">Informational</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <label htmlFor="alert-description" className="text-right text-sm pt-2">Description</label>
                          <textarea 
                            id="alert-description" 
                            rows={4}
                            value={newAlert.description}
                            onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                            className="col-span-3 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Create Alert</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  className="pl-9" 
                  placeholder="Search alerts..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0 flex gap-2">
                <Button 
                  variant={filterStatus === "active" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterStatus("active")}
                  className="gap-1 h-10"
                >
                  <BellRing size={16} />
                  Active
                </Button>
                <Button 
                  variant={filterStatus === "resolved" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterStatus("resolved")}
                  className="gap-1 h-10"
                >
                  <Check size={16} />
                  Resolved
                </Button>
                <Button 
                  variant={filterStatus === "all" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                  className="h-10"
                >
                  All
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 h-10">
                      <Filter size={16} />
                      Filters
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Filter Alerts</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium mb-2">Alert Severity</h4>
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant={filterSeverity === "all" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setFilterSeverity("all")}
                          >
                            All
                          </Button>
                          <Button 
                            variant={filterSeverity === "critical" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setFilterSeverity("critical")}
                            className="gap-1"
                          >
                            <AlertTriangle size={14} className="text-red-500" />
                            Critical
                          </Button>
                          <Button 
                            variant={filterSeverity === "warning" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setFilterSeverity("warning")}
                            className="gap-1"
                          >
                            <AlertTriangle size={14} className="text-yellow-500" />
                            Warning
                          </Button>
                          <Button 
                            variant={filterSeverity === "info" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setFilterSeverity("info")}
                            className="gap-1"
                          >
                            <Info size={14} className="text-blue-500" />
                            Info
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="space-y-4 mb-12">
              {filteredAlerts.length === 0 ? (
                <div className="text-center p-8 border rounded-lg bg-muted/50">
                  <p className="text-muted-foreground">No matching alerts found.</p>
                </div>
              ) : (
                filteredAlerts.map(alert => (
                  <Card 
                    key={alert.id} 
                    className={`border-l-4 ${
                      alert.severity === 'critical' 
                        ? 'border-l-destructive' 
                        : alert.severity === 'warning' 
                          ? 'border-l-accent' 
                          : 'border-l-primary'
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl">{alert.title}</CardTitle>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              alert.severity === 'critical' 
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' 
                                : alert.severity === 'warning' 
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                            }`}>
                              {alert.severity === 'critical' ? 'Critical' : alert.severity === 'warning' ? 'Warning' : 'Info'}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              alert.status === 'active' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                            }`}>
                              {alert.status === 'active' ? 'Active' : 'Resolved'}
                            </span>
                          </div>
                          <CardDescription>
                            <div className="flex flex-wrap gap-3 mt-2">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin size={14} />
                                <span>{alert.location}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock size={14} />
                                <span>{formatDate(alert.timestamp)}</span>
                              </div>
                              {alert.expiresAt && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <span>Expires: {formatDate(alert.expiresAt)}</span>
                                </div>
                              )}
                            </div>
                          </CardDescription>
                        </div>
                        
                        {alert.status === 'active' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            <Check size={14} className="mr-1" />
                            Mark Resolved
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{alert.description}</p>
                      
                      <div className="flex justify-end mt-4 gap-2">
                        <Button variant="outline" size="sm">Share</Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Alert Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle size={16} className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Critical</h4>
                      <p className="text-sm text-muted-foreground">
                        Immediate danger to life or property requiring immediate action
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-yellow-100 flex items-center justify-center">
                      <AlertTriangle size={16} className="text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Warning</h4>
                      <p className="text-sm text-muted-foreground">
                        Potential hazards or developing situations requiring attention
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                      <Info size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Informational</h4>
                      <p className="text-sm text-muted-foreground">
                        General updates about the emergency situation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <div>
                      <h4 className="font-medium">Emergency Services</h4>
                      <p className="text-sm text-muted-foreground">Police, Fire, Medical</p>
                    </div>
                    <span className="font-medium">911</span>
                  </div>
                  
                  <div className="flex justify-between border-b pb-2">
                    <div>
                      <h4 className="font-medium">Disaster Hotline</h4>
                      <p className="text-sm text-muted-foreground">24/7 Emergency Support</p>
                    </div>
                    <span className="font-medium">555-0123</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Relief Coordination</h4>
                      <p className="text-sm text-muted-foreground">Volunteer & Resource</p>
                    </div>
                    <span className="font-medium">555-0199</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Safety Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
                      <path d="m6 10 4 3 4-3" />
                    </svg>
                    Emergency Preparedness Guide
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
                    </svg>
                    Evacuation Routes & Centers
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    First Aid & Medical Resources
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-white dark:bg-slate-900 border-t border-border py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          © 2023 ResilienceLink. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default Alerts;
