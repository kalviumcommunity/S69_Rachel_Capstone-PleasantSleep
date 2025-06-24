
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Filter,
  UserCheck,
  Star,
  MessageCircle,
  Video,
  Phone,
  Info
} from 'lucide-react';
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Interface for therapist data
interface Therapist {
  id: number;
  name: string;
  title: string;
  specialty: string[];
  avatar: string;
  rating: number;
  reviewCount: number;
  location: string;
  nextAvailable: string;
  price: string;
  bio: string;
  online: boolean;
  inPerson: boolean;
}

const Therapists = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  
  // Mock therapist data
  const therapistsData: Therapist[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Clinical Psychologist",
      specialty: ["Sleep Disorders", "Anxiety", "Depression"],
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 4.9,
      reviewCount: 124,
      location: "New York, NY",
      nextAvailable: "Today",
      price: "$120/session",
      bio: "Dr. Johnson specializes in treating sleep disorders and anxiety. With over 15 years of experience, she uses evidence-based approaches including CBT for insomnia, mindfulness techniques, and personalized sleep improvement plans.",
      online: true,
      inPerson: true
    },
    {
      id: 2,
      name: "Michael Roberts",
      title: "Licensed Therapist",
      specialty: ["Stress Management", "Insomnia", "Work-Life Balance"],
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 4.7,
      reviewCount: 98,
      location: "Chicago, IL",
      nextAvailable: "Tomorrow",
      price: "$95/session",
      bio: "Michael helps clients develop healthy sleep habits and stress management techniques. His approach combines cognitive behavioral therapy with mindfulness practices to address both the physical and psychological aspects of sleep disturbances.",
      online: true,
      inPerson: false
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      title: "Sleep Specialist",
      specialty: ["Circadian Rhythm Disorders", "Insomnia", "Sleep Apnea"],
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 4.8,
      reviewCount: 156,
      location: "San Francisco, CA",
      nextAvailable: "March 29, 2023",
      price: "$150/session",
      bio: "As a certified sleep specialist, Dr. Chen focuses exclusively on sleep disorders and their psychological impacts. She offers comprehensive sleep assessments and tailored treatment plans to help clients achieve restorative sleep.",
      online: true,
      inPerson: true
    },
    {
      id: 4,
      name: "James Wilson",
      title: "Mental Health Counselor",
      specialty: ["Anxiety", "Stress", "Sleep Hygiene"],
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 4.5,
      reviewCount: 72,
      location: "Austin, TX",
      nextAvailable: "March 30, 2023",
      price: "$85/session",
      bio: "James specializes in helping clients manage anxiety and stress that interfere with sleep. His holistic approach addresses lifestyle factors, thought patterns, and environmental considerations to improve overall sleep quality.",
      online: true,
      inPerson: false
    },
    {
      id: 5,
      name: "Dr. Olivia Martinez",
      title: "Psychiatrist",
      specialty: ["Medication Management", "Sleep Disorders", "Mental Health"],
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 4.9,
      reviewCount: 187,
      location: "Miami, FL",
      nextAvailable: "March 31, 2023",
      price: "$175/session",
      bio: "Dr. Martinez provides both therapy and medication management for sleep disorders. With expertise in psychiatric care, she helps clients address underlying mental health conditions that may be impacting their sleep quality.",
      online: true,
      inPerson: true
    },
    {
      id: 6,
      name: "Aisha Patel",
      title: "Wellness Therapist",
      specialty: ["Holistic Wellness", "Relaxation Techniques", "Mindfulness"],
      avatar: "https://i.pravatar.cc/150?img=10",
      rating: 4.6,
      reviewCount: 89,
      location: "Seattle, WA",
      nextAvailable: "Today",
      price: "$90/session",
      bio: "Aisha integrates traditional therapy with holistic wellness practices, helping clients develop personalized relaxation routines and mindfulness exercises that promote better sleep and reduce stress.",
      online: true,
      inPerson: false
    }
  ];
  
  // Filter options
  const filterOptions = [
    { id: "online", label: "Online Sessions" },
    { id: "inPerson", label: "In-Person" },
    { id: "today", label: "Available Today" },
    { id: "sleepSpecialist", label: "Sleep Specialist" },
    { id: "anxiety", label: "Anxiety Expert" },
    { id: "under100", label: "Under $100" }
  ];
  
  // Toggle filter selection
  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter(id => id !== filterId));
    } else {
      setSelectedFilters([...selectedFilters, filterId]);
    }
  };
  
  // Filter therapists based on search term and selected filters
  const filteredTherapists = therapistsData.filter(therapist => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specialty.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      therapist.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected filters
    let matchesFilters = true;
    
    if (selectedFilters.includes("online") && !therapist.online) {
      matchesFilters = false;
    }
    
    if (selectedFilters.includes("inPerson") && !therapist.inPerson) {
      matchesFilters = false;
    }
    
    if (selectedFilters.includes("today") && therapist.nextAvailable !== "Today") {
      matchesFilters = false;
    }
    
    if (selectedFilters.includes("sleepSpecialist") && 
        !therapist.specialty.some(s => s.toLowerCase().includes("sleep"))) {
      matchesFilters = false;
    }
    
    if (selectedFilters.includes("anxiety") && 
        !therapist.specialty.some(s => s.toLowerCase().includes("anxiety"))) {
      matchesFilters = false;
    }
    
    if (selectedFilters.includes("under100")) {
      const price = parseInt(therapist.price.replace(/\D/g, ''));
      if (price >= 100) {
        matchesFilters = false;
      }
    }
    
    return matchesSearch && matchesFilters;
  });
  
  // Book appointment with therapist
  const bookAppointment = (therapistId: number) => {
    toast({
      title: "Appointment Request Sent",
      description: "We'll confirm your appointment soon."
    });
  };
  
  // View therapist profile
  const viewProfile = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
  };
  
  // Close therapist profile
  const closeProfile = () => {
    setSelectedTherapist(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      
      <main className="container px-4 mx-auto pt-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Find a Therapist</h1>
              <p className="text-muted-foreground">
                Connect with certified mental health professionals
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                className="pl-9" 
                placeholder="Search therapists by name, specialty, or location..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-shrink-0">
              <Button variant="outline" className="gap-2">
                <Filter size={18} />
                {selectedFilters.length > 0 ? `Filters (${selectedFilters.length})` : 'Filters'}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {filterOptions.map(filter => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedFilters.includes(filter.id) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Therapists</TabsTrigger>
              <TabsTrigger value="sleep">Sleep Specialists</TabsTrigger>
              <TabsTrigger value="anxiety">Anxiety Experts</TabsTrigger>
              <TabsTrigger value="online">Online Only</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {filteredTherapists.length === 0 ? (
                <div className="text-center p-12 border rounded-lg bg-muted/50">
                  <Info className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No therapists found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search term to find more therapists.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedFilters([]);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTherapists.map(therapist => (
                    <Card key={therapist.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={therapist.avatar} />
                            <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <Badge className={therapist.nextAvailable === "Today" ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'}>
                            {therapist.nextAvailable === "Today" ? 'Available Today' : therapist.nextAvailable}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-2">{therapist.name}</CardTitle>
                        <CardDescription>{therapist.title}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm font-medium">{therapist.rating}</span>
                          </div>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{therapist.reviewCount} reviews</span>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{therapist.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>Next available: {therapist.nextAvailable}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <UserCheck className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{therapist.price}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {therapist.specialty.map((spec, index) => (
                            <Badge key={index} variant="outline" className="bg-muted/50">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2 pt-2">
                        <Button variant="outline" className="flex-1" onClick={() => viewProfile(therapist)}>
                          View Profile
                        </Button>
                        <Button className="flex-1" onClick={() => bookAppointment(therapist.id)}>
                          Book Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="sleep" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapistsData
                  .filter(therapist => therapist.specialty.some(s => s.toLowerCase().includes("sleep")))
                  .map(therapist => (
                    <Card key={therapist.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={therapist.avatar} />
                            <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <Badge className={therapist.nextAvailable === "Today" ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'}>
                            {therapist.nextAvailable === "Today" ? 'Available Today' : therapist.nextAvailable}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-2">{therapist.name}</CardTitle>
                        <CardDescription>{therapist.title}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm font-medium">{therapist.rating}</span>
                          </div>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{therapist.reviewCount} reviews</span>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{therapist.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>Next available: {therapist.nextAvailable}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <UserCheck className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{therapist.price}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {therapist.specialty.map((spec, index) => (
                            <Badge key={index} variant="outline" className="bg-muted/50">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2 pt-2">
                        <Button variant="outline" className="flex-1" onClick={() => viewProfile(therapist)}>
                          View Profile
                        </Button>
                        <Button className="flex-1" onClick={() => bookAppointment(therapist.id)}>
                          Book Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="anxiety" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapistsData
                  .filter(therapist => therapist.specialty.some(s => s.toLowerCase().includes("anxiety")))
                  .map(therapist => (
                    <Card key={therapist.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={therapist.avatar} />
                            <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <Badge className={therapist.nextAvailable === "Today" ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'}>
                            {therapist.nextAvailable === "Today" ? 'Available Today' : therapist.nextAvailable}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-2">{therapist.name}</CardTitle>
                        <CardDescription>{therapist.title}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm font-medium">{therapist.rating}</span>
                          </div>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{therapist.reviewCount} reviews</span>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{therapist.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>Next available: {therapist.nextAvailable}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <UserCheck className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{therapist.price}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {therapist.specialty.map((spec, index) => (
                            <Badge key={index} variant="outline" className="bg-muted/50">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2 pt-2">
                        <Button variant="outline" className="flex-1" onClick={() => viewProfile(therapist)}>
                          View Profile
                        </Button>
                        <Button className="flex-1" onClick={() => bookAppointment(therapist.id)}>
                          Book Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="online" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapistsData
                  .filter(therapist => therapist.online)
                  .map(therapist => (
                    <Card key={therapist.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={therapist.avatar} />
                            <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <Badge className={therapist.nextAvailable === "Today" ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'}>
                            {therapist.nextAvailable === "Today" ? 'Available Today' : therapist.nextAvailable}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-2">{therapist.name}</CardTitle>
                        <CardDescription>{therapist.title}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm font-medium">{therapist.rating}</span>
                          </div>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{therapist.reviewCount} reviews</span>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{therapist.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>Next available: {therapist.nextAvailable}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <UserCheck className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{therapist.price}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {therapist.specialty.map((spec, index) => (
                            <Badge key={index} variant="outline" className="bg-muted/50">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2 pt-2">
                        <Button variant="outline" className="flex-1" onClick={() => viewProfile(therapist)}>
                          View Profile
                        </Button>
                        <Button className="flex-1" onClick={() => bookAppointment(therapist.id)}>
                          Book Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {selectedTherapist && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
              <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={selectedTherapist.avatar} />
                        <AvatarFallback>{selectedTherapist.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{selectedTherapist.name}</CardTitle>
                        <CardDescription>{selectedTherapist.title}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={closeProfile}>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">About</h3>
                    <p className="text-muted-foreground text-sm">{selectedTherapist.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedTherapist.specialty.map((spec, index) => (
                        <Badge key={index} variant="outline" className="bg-muted/50">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Availability</h3>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>Next available: {selectedTherapist.nextAvailable}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>Typically responds within 24 hours</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Session Details</h3>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <UserCheck className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>{selectedTherapist.price}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>50-minute sessions</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedTherapist.online && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                            <Video className="h-3 w-3 mr-1" />
                            Video Sessions
                          </Badge>
                        )}
                        {selectedTherapist.online && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            <Phone className="h-3 w-3 mr-1" />
                            Phone Sessions
                          </Badge>
                        )}
                        {selectedTherapist.inPerson && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                            <MapPin className="h-3 w-3 mr-1" />
                            In-Person
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Reviews & Ratings</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="ml-1 font-medium">{selectedTherapist.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({selectedTherapist.reviewCount} reviews)</span>
                    </div>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center mb-1">
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < 5 ? 'text-yellow-500' : 'text-gray-300'} fill-current`} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">2 weeks ago</span>
                        </div>
                        <p className="text-sm">
                          "Dr. {selectedTherapist.name.split(' ')[1]} was incredibly helpful with my sleep issues. 
                          The techniques they suggested have significantly improved my sleep quality."
                        </p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center mb-1">
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'} fill-current`} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">1 month ago</span>
                        </div>
                        <p className="text-sm">
                          "Very compassionate and knowledgeable. I appreciate their approach to treating 
                          my sleep anxiety with both immediate solutions and long-term strategies."
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={closeProfile}>
                    Close
                  </Button>
                  <Button className="flex-1" onClick={() => bookAppointment(selectedTherapist.id)}>
                    Book Appointment
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Therapists;
