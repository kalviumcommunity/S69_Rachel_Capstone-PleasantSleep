
import React, { useState } from 'react';
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  Filter, 
  Search, 
  Award,
  Shield,
  Heart
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

// Define volunteer opportunity types
interface VolunteerOpportunity {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  skills: string[];
  spots: number;
  urgency: "high" | "medium" | "low";
  description?: string;
}

const Volunteer = () => {
  const { toast } = useToast();
  
  // State for volunteer opportunities
  const [volunteerOpportunities, setVolunteerOpportunities] = useState<VolunteerOpportunity[]>([
    {
      id: 1,
      title: "Flood Relief Team",
      location: "Riverside County",
      date: "Mar 28-30, 2023",
      time: "8:00 AM - 4:00 PM",
      skills: ["Heavy Lifting", "First Aid", "Transportation"],
      spots: 12,
      urgency: "high",
      description: "Join our team to help with sandbagging, evacuations, and emergency response in flood-affected areas."
    },
    {
      id: 2,
      title: "Emergency Supply Distribution",
      location: "Central Community Center",
      date: "Mar 27, 2023",
      time: "10:00 AM - 2:00 PM",
      skills: ["Organization", "Communication"],
      spots: 8,
      urgency: "medium",
      description: "Help distribute food, water, and essential supplies to affected residents."
    },
    {
      id: 3,
      title: "Temporary Shelter Support",
      location: "Northside High School",
      date: "Mar 26-29, 2023",
      time: "Various Shifts",
      skills: ["Childcare", "Cooking", "Administration"],
      spots: 15,
      urgency: "medium",
      description: "Assist in managing temporary shelters, including registration, meal service, and general support."
    },
    {
      id: 4,
      title: "Medical Assistance Team",
      location: "Multiple Locations",
      date: "Mar 25-30, 2023",
      time: "12-hour shifts",
      skills: ["Medical Training", "First Aid Certification"],
      spots: 6,
      urgency: "high",
      description: "Medical professionals needed to provide first aid and healthcare support to disaster victims."
    },
  ]);

  // State for profile and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>("all");
  const [showOpportunityDetails, setShowOpportunityDetails] = useState<number | null>(null);
  
  // State for volunteer profile
  const [skills, setSkills] = useState('');
  const [availability, setAvailability] = useState({
    weekdays: false,
    weekends: false,
    mornings: false,
    evenings: false
  });
  const [location, setLocation] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  
  // State for volunteer registration
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    skills: '',
    experience: ''
  });

  // Filter opportunities based on search and filters
  const filteredOpportunities = volunteerOpportunities.filter(opportunity => {
    const matchesSearch = searchTerm === '' || 
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = 
      filterType === "all" || 
      (filterType === "urgent" && opportunity.urgency === "high") ||
      (filterType === "near" && opportunity.location.includes(location)) ||
      (filterType === "weekend" && opportunity.date.toLowerCase().includes("weekend"));
    
    return matchesSearch && matchesFilter;
  });
  
  // Handle volunteer application
  const handleVolunteer = (opportunityId: number) => {
    if (!isRegistered) {
      toast({
        title: "Registration Required",
        description: "Please register as a volunteer before applying for opportunities.",
      });
      return;
    }
    
    setVolunteerOpportunities(opportunities => 
      opportunities.map(opp => 
        opp.id === opportunityId 
          ? { ...opp, spots: Math.max(0, opp.spots - 1) } 
          : opp
      )
    );
    
    toast({
      title: "Application Submitted!",
      description: `Thank you for volunteering! We'll contact you with more details soon.`,
    });
  };
  
  // Handle volunteer registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
    
    toast({
      title: "Registration Successful!",
      description: "You are now registered as a volunteer. You can now apply for opportunities.",
    });
  };
  
  // Handle profile update
  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your volunteer profile has been updated successfully.",
    });
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-24 pb-12 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Volunteer Opportunities</h1>
                <p className="text-muted-foreground">
                  Join our community of volunteers helping in disaster response and recovery
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input 
                    className="pl-9 w-full sm:w-[250px]" 
                    placeholder="Search opportunities..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter size={18} />
                      Filter
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Filter Opportunities</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Filter By</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant={filterType === "all" ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setFilterType("all")}
                            className="justify-start"
                          >
                            All Opportunities
                          </Button>
                          <Button 
                            variant={filterType === "urgent" ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setFilterType("urgent")}
                            className="justify-start gap-2"
                          >
                            <Clock size={16} />
                            Urgent Needs
                          </Button>
                          <Button 
                            variant={filterType === "near" ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setFilterType("near")}
                            className="justify-start gap-2"
                          >
                            <MapPin size={16} />
                            Near Me
                          </Button>
                          <Button 
                            variant={filterType === "weekend" ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setFilterType("weekend")}
                            className="justify-start gap-2"
                          >
                            <Calendar size={16} />
                            Weekend Only
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Location</h4>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                          <Input 
                            className="pl-9" 
                            placeholder="Your location" 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Users size={18} className="mr-2" />
                      Register as Volunteer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Volunteer Registration</DialogTitle>
                      <DialogDescription>
                        Fill out this form to register as a volunteer for disaster relief efforts.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRegister}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="vol-name" className="text-right text-sm">Name</label>
                          <Input 
                            id="vol-name" 
                            value={registrationForm.name}
                            onChange={(e) => setRegistrationForm({...registrationForm, name: e.target.value})}
                            className="col-span-3" 
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="vol-email" className="text-right text-sm">Email</label>
                          <Input 
                            id="vol-email" 
                            type="email"
                            value={registrationForm.email}
                            onChange={(e) => setRegistrationForm({...registrationForm, email: e.target.value})}
                            className="col-span-3" 
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="vol-phone" className="text-right text-sm">Phone</label>
                          <Input 
                            id="vol-phone" 
                            value={registrationForm.phone}
                            onChange={(e) => setRegistrationForm({...registrationForm, phone: e.target.value})}
                            className="col-span-3" 
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="vol-address" className="text-right text-sm">Address</label>
                          <Input 
                            id="vol-address" 
                            value={registrationForm.address}
                            onChange={(e) => setRegistrationForm({...registrationForm, address: e.target.value})}
                            className="col-span-3" 
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="vol-emergency" className="text-right text-sm">Emergency Contact</label>
                          <Input 
                            id="vol-emergency" 
                            value={registrationForm.emergencyContact}
                            onChange={(e) => setRegistrationForm({...registrationForm, emergencyContact: e.target.value})}
                            className="col-span-3" 
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="vol-skills" className="text-right text-sm">Skills</label>
                          <Input 
                            id="vol-skills" 
                            placeholder="First Aid, Driving, Construction, etc."
                            value={registrationForm.skills}
                            onChange={(e) => setRegistrationForm({...registrationForm, skills: e.target.value})}
                            className="col-span-3" 
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="vol-experience" className="text-right text-sm">Experience</label>
                          <Input 
                            id="vol-experience" 
                            placeholder="Previous volunteer experience"
                            value={registrationForm.experience}
                            onChange={(e) => setRegistrationForm({...registrationForm, experience: e.target.value})}
                            className="col-span-3" 
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Register Now</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
              <div className="md:col-span-8 space-y-6">
                <div className="overflow-x-auto pb-2">
                  <div className="flex gap-3">
                    <Button 
                      className="shrink-0"
                      variant={filterType === "all" ? "default" : "outline"}
                      onClick={() => setFilterType("all")}
                    >
                      All Opportunities
                    </Button>
                    <Button 
                      variant={filterType === "urgent" ? "default" : "outline"} 
                      className="shrink-0 gap-2"
                      onClick={() => setFilterType("urgent")}
                    >
                      <Clock size={16} />
                      Urgent Needs
                    </Button>
                    <Button 
                      variant={filterType === "near" ? "default" : "outline"} 
                      className="shrink-0 gap-2"
                      onClick={() => setFilterType("near")}
                    >
                      <MapPin size={16} />
                      Near Me
                    </Button>
                    <Button 
                      variant={filterType === "weekend" ? "default" : "outline"} 
                      className="shrink-0 gap-2"
                      onClick={() => setFilterType("weekend")}
                    >
                      <Calendar size={16} />
                      Weekend Only
                    </Button>
                    <Button 
                      variant="outline" 
                      className="shrink-0 gap-2"
                      onClick={() => setFilterType("remote")}
                    >
                      <Award size={16} />
                      Remote Help
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredOpportunities.length === 0 ? (
                    <div className="text-center p-8 border rounded-lg bg-muted/50">
                      <p className="text-muted-foreground">No matching volunteer opportunities found.</p>
                    </div>
                  ) : (
                    filteredOpportunities.map(opportunity => (
                      <Card key={opportunity.id} className={`border-l-4 ${
                        opportunity.urgency === 'high' 
                          ? 'border-l-destructive' 
                          : opportunity.urgency === 'medium' 
                            ? 'border-l-accent' 
                            : 'border-l-primary'
                      }`}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                            <span className={`text-sm px-2 py-1 rounded ${
                              opportunity.urgency === 'high' 
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' 
                                : opportunity.urgency === 'medium' 
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                            }`}>
                              {opportunity.urgency === 'high' ? 'Urgent' : 'Needed'}
                            </span>
                          </div>
                          <CardDescription>
                            <div className="flex flex-wrap gap-3 mt-2">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin size={14} />
                                <span>{opportunity.location}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar size={14} />
                                <span>{opportunity.date}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock size={14} />
                                <span>{opportunity.time}</span>
                              </div>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          {showOpportunityDetails === opportunity.id && (
                            <div className="mb-4">
                              <p className="text-sm mb-3">{opportunity.description}</p>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {opportunity.skills.map((skill, index) => (
                              <span key={index} className="text-xs px-2 py-1 bg-secondary rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {opportunity.spots} volunteers needed
                          </p>
                        </CardContent>
                        <CardFooter className="pt-2 flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowOpportunityDetails(
                              showOpportunityDetails === opportunity.id ? null : opportunity.id
                            )}
                          >
                            {showOpportunityDetails === opportunity.id ? 'Hide Details' : 'Learn More'}
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleVolunteer(opportunity.id)}
                            disabled={opportunity.spots === 0}
                          >
                            {opportunity.spots === 0 ? 'Full' : 'Volunteer'}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
                
                <div className="flex justify-center mt-10">
                  <Button variant="outline" className="gap-2">
                    Load More
                    <span className="text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                      12
                    </span>
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Volunteer Profile</CardTitle>
                    <CardDescription>Complete your profile to match with opportunities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Skills</label>
                      <Input 
                        placeholder="Add skills (e.g., First Aid, Driving)" 
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Availability</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant={availability.weekdays ? "default" : "outline"} 
                          size="sm" 
                          className="justify-start"
                          onClick={() => setAvailability({...availability, weekdays: !availability.weekdays})}
                        >
                          Weekdays {availability.weekdays ? "✓" : ""}
                        </Button>
                        <Button 
                          variant={availability.weekends ? "default" : "outline"} 
                          size="sm" 
                          className="justify-start"
                          onClick={() => setAvailability({...availability, weekends: !availability.weekends})}
                        >
                          Weekends {availability.weekends ? "✓" : ""}
                        </Button>
                        <Button 
                          variant={availability.mornings ? "default" : "outline"} 
                          size="sm" 
                          className="justify-start"
                          onClick={() => setAvailability({...availability, mornings: !availability.mornings})}
                        >
                          Mornings {availability.mornings ? "✓" : ""}
                        </Button>
                        <Button 
                          variant={availability.evenings ? "default" : "outline"} 
                          size="sm" 
                          className="justify-start"
                          onClick={() => setAvailability({...availability, evenings: !availability.evenings})}
                        >
                          Evenings {availability.evenings ? "✓" : ""}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                        <Input 
                          className="pl-9" 
                          placeholder="Your location" 
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button className="w-full" onClick={handleProfileUpdate}>Update Profile</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Why Volunteer?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="text-primary" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">Make a Difference</h4>
                        <p className="text-sm text-muted-foreground">
                          Help communities recover from disaster situations
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="text-primary" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">Join a Community</h4>
                        <p className="text-sm text-muted-foreground">
                          Connect with like-minded volunteers
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="text-primary" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">Learn Emergency Skills</h4>
                        <p className="text-sm text-muted-foreground">
                          Develop valuable crisis management abilities
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Volunteer Training</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-md border border-border">
                        <h4 className="font-medium">Disaster First Response</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          Online certification, 2 hours
                        </p>
                        <Button variant="outline" size="sm" className="w-full">Start Training</Button>
                      </div>
                      
                      <div className="p-3 rounded-md border border-border">
                        <h4 className="font-medium">Crisis Communication</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          In-person workshop, Apr 5
                        </p>
                        <Button variant="outline" size="sm" className="w-full">Register</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mt-12 bg-white dark:bg-slate-900 rounded-lg shadow-subtle border border-border p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Join our network of volunteers providing critical support during disasters. 
                Your time and skills can help communities recover and rebuild.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="gap-2">
                      <Users size={18} />
                      Register as Volunteer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    {/* Registration form dialog content - same as above */}
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline">Learn More</Button>
              </div>
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

export default Volunteer;
