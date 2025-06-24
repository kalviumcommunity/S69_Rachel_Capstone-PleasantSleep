
import React, { useState } from 'react';
import Header from "@/components/Header";
import DisasterMap from "@/components/DisasterMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Layers, 
  Filter, 
  Map as MapIcon, 
  AlertTriangle, 
  Home, 
  Droplets, 
  Flame, 
  Wind,
  Mountain,
  LocateFixed,
  Share2,
  MapPin,
  Info
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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

// Define disaster types
type DisasterType = "flood" | "fire" | "storm" | "earthquake" | "other";

interface DisasterEvent {
  id: number;
  type: DisasterType;
  title: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  severity: "high" | "medium" | "low";
  status: "active" | "recovery" | "resolved";
  startDate: string;
  endDate?: string;
}

interface ShelterLocation {
  id: number;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  capacity: number;
  currentOccupancy: number;
  hasFood: boolean;
  hasMedical: boolean;
  isAccessible: boolean;
  status: "open" | "limited" | "full" | "closed";
}

const Map = () => {
  const { toast } = useToast();
  
  // Map state
  const [activeLayers, setActiveLayers] = useState({
    disasters: true,
    shelters: true,
    resources: false,
    roads: true
  });
  
  const [mapFilters, setMapFilters] = useState({
    disasterTypes: {
      flood: true,
      fire: true,
      storm: true,
      earthquake: true,
      other: true
    },
    activeOnly: true,
    shelterOpenOnly: false
  });
  
  const [selectedEvent, setSelectedEvent] = useState<DisasterEvent | null>(null);
  const [selectedShelter, setSelectedShelter] = useState<ShelterLocation | null>(null);
  
  // Sample data for disaster events
  const [disasters, setDisasters] = useState<DisasterEvent[]>([
    {
      id: 1,
      type: "flood",
      title: "River Valley Flooding",
      description: "Major flooding along the River Valley region affecting residential and commercial areas.",
      location: "River Valley, Eastern District",
      coordinates: { lat: 37.7749, lng: -122.4194 },
      severity: "high",
      status: "active",
      startDate: "2023-03-25"
    },
    {
      id: 2,
      type: "fire",
      title: "Highland Forest Fire",
      description: "Wildfire spreading through the Highland forest region threatening nearby communities.",
      location: "Highland Forest, Northern Region",
      coordinates: { lat: 37.8049, lng: -122.4244 },
      severity: "high",
      status: "active",
      startDate: "2023-03-26"
    },
    {
      id: 3,
      type: "storm",
      title: "Coastal Wind Storm",
      description: "Severe wind storm along the coastal areas causing power outages and property damage.",
      location: "Coastal Region, Western District",
      coordinates: { lat: 37.7649, lng: -122.4444 },
      severity: "medium",
      status: "recovery",
      startDate: "2023-03-24",
      endDate: "2023-03-25"
    },
    {
      id: 4,
      type: "earthquake",
      title: "Valley Fault Earthquake",
      description: "5.4 magnitude earthquake centered on the Valley Fault line with aftershocks continuing.",
      location: "Valley Region, Central District",
      coordinates: { lat: 37.7449, lng: -122.4094 },
      severity: "medium",
      status: "recovery",
      startDate: "2023-03-23",
      endDate: "2023-03-23"
    }
  ]);
  
  // Sample data for shelter locations
  const [shelters, setShelters] = useState<ShelterLocation[]>([
    {
      id: 1,
      name: "Central Community Center",
      address: "123 Main St, Downtown",
      coordinates: { lat: 37.7739, lng: -122.4312 },
      capacity: 250,
      currentOccupancy: 145,
      hasFood: true,
      hasMedical: true,
      isAccessible: true,
      status: "open"
    },
    {
      id: 2,
      name: "Eastside High School",
      address: "456 School Rd, Eastside",
      coordinates: { lat: 37.7849, lng: -122.4100 },
      capacity: 350,
      currentOccupancy: 322,
      hasFood: true,
      hasMedical: false,
      isAccessible: true,
      status: "limited"
    },
    {
      id: 3,
      name: "Northside Recreation Center",
      address: "789 North Ave, Northside",
      coordinates: { lat: 37.7949, lng: -122.4214 },
      capacity: 200,
      currentOccupancy: 87,
      hasFood: true,
      hasMedical: true,
      isAccessible: true,
      status: "open"
    },
    {
      id: 4,
      name: "Westside Convention Hall",
      address: "101 West Blvd, Westside",
      coordinates: { lat: 37.7649, lng: -122.4414 },
      capacity: 500,
      currentOccupancy: 500,
      hasFood: true,
      hasMedical: true,
      isAccessible: false,
      status: "full"
    }
  ]);
  
  // State for new report form
  const [newReport, setNewReport] = useState({
    type: "flood" as DisasterType,
    title: "",
    description: "",
    location: "",
    severity: "medium" as "high" | "medium" | "low",
  });
  
  // Handle toggling a map layer
  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers({
      ...activeLayers,
      [layer]: !activeLayers[layer]
    });
    
    toast({
      title: `${activeLayers[layer] ? "Hidden" : "Showing"} ${layer} layer`,
      description: `The ${layer} layer is now ${activeLayers[layer] ? "hidden" : "visible"} on the map.`,
    });
  };
  
  // Handle toggling a disaster type filter
  const toggleDisasterTypeFilter = (type: keyof typeof mapFilters.disasterTypes) => {
    setMapFilters({
      ...mapFilters,
      disasterTypes: {
        ...mapFilters.disasterTypes,
        [type]: !mapFilters.disasterTypes[type]
      }
    });
  };
  
  // Handle creating a new disaster report
  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDisaster: DisasterEvent = {
      id: disasters.length + 1,
      ...newReport,
      coordinates: { lat: 37.7749 + Math.random() * 0.05, lng: -122.4194 + Math.random() * 0.05 },
      status: "active",
      startDate: new Date().toISOString().split('T')[0]
    };
    
    setDisasters([...disasters, newDisaster]);
    
    // Reset form
    setNewReport({
      type: "flood",
      title: "",
      description: "",
      location: "",
      severity: "medium"
    });
    
    toast({
      title: "Report Submitted",
      description: "Your disaster report has been submitted and is now visible on the map.",
    });
  };
  
  // Handle clicking on a map marker
  const handleMarkerClick = (eventId: number) => {
    const event = disasters.find(d => d.id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  };
  
  // Handle clicking on a shelter marker
  const handleShelterClick = (shelterId: number) => {
    const shelter = shelters.find(s => s.id === shelterId);
    if (shelter) {
      setSelectedShelter(shelter);
    }
  };
  
  // Filter disasters based on active filters
  const filteredDisasters = disasters.filter(disaster => 
    mapFilters.disasterTypes[disaster.type] && 
    (!mapFilters.activeOnly || disaster.status === "active")
  );
  
  // Filter shelters based on active filters
  const filteredShelters = shelters.filter(shelter => 
    !mapFilters.shelterOpenOnly || shelter.status === "open" || shelter.status === "limited"
  );
  
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-20 pb-0 h-screen flex flex-col">
        <div className="container mx-auto px-4 md:px-6 flex-grow flex flex-col">
          <div className="flex-grow flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-[300px] bg-white dark:bg-slate-800 rounded-t-lg md:rounded-lg border border-border overflow-y-auto flex flex-col">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MapIcon size={20} />
                  Disaster Map
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  View active disasters and emergency resources
                </p>
              </div>
              
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-medium mb-3">Map Layers</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <AlertTriangle size={16} className="text-red-500" />
                      Disasters
                    </span>
                    <input 
                      type="checkbox" 
                      checked={activeLayers.disasters}
                      onChange={() => toggleLayer('disasters')}
                      className="h-4 w-4"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Home size={16} className="text-blue-500" />
                      Shelters
                    </span>
                    <input 
                      type="checkbox" 
                      checked={activeLayers.shelters}
                      onChange={() => toggleLayer('shelters')}
                      className="h-4 w-4"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7 12 12 22 7 12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22 22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Resources
                    </span>
                    <input 
                      type="checkbox" 
                      checked={activeLayers.resources}
                      onChange={() => toggleLayer('resources')}
                      className="h-4 w-4"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 14L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 8L6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 12L18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 4L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 16L6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 20L14 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Roads & Routes
                    </span>
                    <input 
                      type="checkbox" 
                      checked={activeLayers.roads}
                      onChange={() => toggleLayer('roads')}
                      className="h-4 w-4"
                    />
                  </label>
                </div>
              </div>
              
              <div className="p-4 border-b border-border">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 text-xs"
                    onClick={() => setMapFilters({
                      disasterTypes: {
                        flood: true,
                        fire: true,
                        storm: true,
                        earthquake: true,
                        other: true
                      },
                      activeOnly: true,
                      shelterOpenOnly: false
                    })}
                  >
                    Reset
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-medium mb-2">Disaster Types</h4>
                    <div className="flex flex-wrap gap-1">
                      <Button 
                        variant={mapFilters.disasterTypes.flood ? "default" : "outline"} 
                        size="sm" 
                        className="h-7 px-2 text-xs gap-1"
                        onClick={() => toggleDisasterTypeFilter('flood')}
                      >
                        <Droplets size={12} />
                        Flood
                      </Button>
                      <Button 
                        variant={mapFilters.disasterTypes.fire ? "default" : "outline"} 
                        size="sm" 
                        className="h-7 px-2 text-xs gap-1"
                        onClick={() => toggleDisasterTypeFilter('fire')}
                      >
                        <Flame size={12} />
                        Fire
                      </Button>
                      <Button 
                        variant={mapFilters.disasterTypes.storm ? "default" : "outline"} 
                        size="sm" 
                        className="h-7 px-2 text-xs gap-1"
                        onClick={() => toggleDisasterTypeFilter('storm')}
                      >
                        <Wind size={12} />
                        Storm
                      </Button>
                      <Button 
                        variant={mapFilters.disasterTypes.earthquake ? "default" : "outline"} 
                        size="sm" 
                        className="h-7 px-2 text-xs gap-1"
                        onClick={() => toggleDisasterTypeFilter('earthquake')}
                      >
                        <Mountain size={12} />
                        Earthquake
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-center justify-between text-sm">
                      <span>Show active disasters only</span>
                      <input 
                        type="checkbox" 
                        checked={mapFilters.activeOnly}
                        onChange={() => setMapFilters({...mapFilters, activeOnly: !mapFilters.activeOnly})}
                        className="h-4 w-4"
                      />
                    </label>
                    
                    <label className="flex items-center justify-between text-sm">
                      <span>Show available shelters only</span>
                      <input 
                        type="checkbox" 
                        checked={mapFilters.shelterOpenOnly}
                        onChange={() => setMapFilters({...mapFilters, shelterOpenOnly: !mapFilters.shelterOpenOnly})}
                        className="h-4 w-4"
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-4 flex-grow overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Disaster Events</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        Report
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Report Disaster or Hazard</DialogTitle>
                        <DialogDescription>
                          Submit information about a disaster or hazardous situation.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleCreateReport}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="report-title" className="text-right text-sm">Title</label>
                            <Input 
                              id="report-title" 
                              value={newReport.title}
                              onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                              className="col-span-3" 
                              placeholder="Brief title of the situation"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="report-type" className="text-right text-sm">Type</label>
                            <select 
                              id="report-type" 
                              value={newReport.type}
                              onChange={(e) => setNewReport({...newReport, type: e.target.value as DisasterType})}
                              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              required
                            >
                              <option value="flood">Flood</option>
                              <option value="fire">Fire</option>
                              <option value="storm">Storm</option>
                              <option value="earthquake">Earthquake</option>
                              <option value="other">Other Hazard</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="report-location" className="text-right text-sm">Location</label>
                            <Input 
                              id="report-location" 
                              value={newReport.location}
                              onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                              className="col-span-3" 
                              placeholder="Where is this happening?"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="report-severity" className="text-right text-sm">Severity</label>
                            <select 
                              id="report-severity" 
                              value={newReport.severity}
                              onChange={(e) => setNewReport({...newReport, severity: e.target.value as "high" | "medium" | "low"})}
                              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              required
                            >
                              <option value="high">High - Immediate danger</option>
                              <option value="medium">Medium - Potential threat</option>
                              <option value="low">Low - Monitoring required</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-4 items-start gap-4">
                            <label htmlFor="report-description" className="text-right text-sm pt-2">Description</label>
                            <textarea 
                              id="report-description" 
                              rows={4}
                              value={newReport.description}
                              onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                              className="col-span-3 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                              placeholder="Describe the situation in detail"
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Submit Report</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-2">
                  {filteredDisasters.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-2">No matching disaster events found.</p>
                  ) : (
                    filteredDisasters.map(disaster => (
                      <div 
                        key={disaster.id} 
                        className={`p-2 rounded border ${
                          disaster.severity === 'high' 
                            ? 'border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800' 
                            : disaster.severity === 'medium' 
                              ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800' 
                              : 'border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800'
                        } cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-colors`}
                        onClick={() => handleMarkerClick(disaster.id)}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center gap-1.5">
                            {disaster.type === 'flood' ? (
                              <Droplets size={14} className="text-blue-500" />
                            ) : disaster.type === 'fire' ? (
                              <Flame size={14} className="text-red-500" />
                            ) : disaster.type === 'storm' ? (
                              <Wind size={14} className="text-purple-500" />
                            ) : disaster.type === 'earthquake' ? (
                              <Mountain size={14} className="text-amber-500" />
                            ) : (
                              <AlertTriangle size={14} className="text-gray-500" />
                            )}
                            <span className="font-medium text-sm">{disaster.title}</span>
                          </div>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                            disaster.status === 'active' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' 
                              : disaster.status === 'recovery' 
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                          }`}>
                            {disaster.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <MapPin size={10} />
                          {disaster.location}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                
                {activeLayers.shelters && (
                  <>
                    <h3 className="text-sm font-medium mt-4 mb-3">Shelter Locations</h3>
                    <div className="space-y-2">
                      {filteredShelters.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-2">No matching shelters found.</p>
                      ) : (
                        filteredShelters.map(shelter => (
                          <div 
                            key={shelter.id} 
                            className={`p-2 rounded border ${
                              shelter.status === 'open' 
                                ? 'border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800' 
                                : shelter.status === 'limited' 
                                  ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800' 
                                  : shelter.status === 'full'
                                    ? 'border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800'
                                    : 'border-gray-200 bg-gray-50 dark:bg-gray-900/20 dark:border-gray-800'
                            } cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-colors`}
                            onClick={() => handleShelterClick(shelter.id)}
                          >
                            <div className="flex justify-between">
                              <div className="flex items-center gap-1.5">
                                <Home size={14} className="text-blue-500" />
                                <span className="font-medium text-sm">{shelter.name}</span>
                              </div>
                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                shelter.status === 'open' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                                  : shelter.status === 'limited' 
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                                    : shelter.status === 'full'
                                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300'
                                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                              }`}>
                                {shelter.status}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {shelter.currentOccupancy}/{shelter.capacity} capacity
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>
              
              <div className="p-4 border-t border-border mt-auto">
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-1 h-8">
                    <Share2 size={14} />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 h-8">
                    <LocateFixed size={14} />
                    My Location
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-grow bg-white dark:bg-slate-800 rounded-lg border border-border relative">
              <DisasterMap 
                disasters={filteredDisasters} 
                shelters={filteredShelters}
                layers={activeLayers}
                onMarkerClick={handleMarkerClick}
                onShelterClick={handleShelterClick}
              />
              
              {selectedEvent && (
                <Card className="absolute top-4 right-4 w-80 shadow-lg z-10">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{selectedEvent.title}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0" 
                        onClick={() => setSelectedEvent(null)}
                      >
                        ×
                      </Button>
                    </div>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedEvent.severity === 'high' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' 
                            : selectedEvent.severity === 'medium' 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                        }`}>
                          {selectedEvent.severity === 'high' ? 'High Severity' : selectedEvent.severity === 'medium' ? 'Medium Severity' : 'Low Severity'}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedEvent.status === 'active' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' 
                            : selectedEvent.status === 'recovery' 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                        }`}>
                          {selectedEvent.status}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm mb-2 flex items-center gap-1">
                      <MapPin size={14} className="text-muted-foreground" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <p className="text-sm">{selectedEvent.description}</p>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Started</span>
                        <span>{selectedEvent.startDate}</span>
                      </div>
                      {selectedEvent.endDate && (
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Ended</span>
                          <span>{selectedEvent.endDate}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button size="sm">Get Directions</Button>
                  </CardFooter>
                </Card>
              )}
              
              {selectedShelter && (
                <Card className="absolute top-4 right-4 w-80 shadow-lg z-10">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{selectedShelter.name}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0" 
                        onClick={() => setSelectedShelter(null)}
                      >
                        ×
                      </Button>
                    </div>
                    <CardDescription>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedShelter.status === 'open' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                          : selectedShelter.status === 'limited' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                            : selectedShelter.status === 'full'
                              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {selectedShelter.status.charAt(0).toUpperCase() + selectedShelter.status.slice(1)}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm mb-2 flex items-center gap-1">
                      <MapPin size={14} className="text-muted-foreground" />
                      <span>{selectedShelter.address}</span>
                    </div>
                    
                    <div className="mt-3 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Capacity</span>
                        <span className="text-sm font-medium">{selectedShelter.currentOccupancy}/{selectedShelter.capacity}</span>
                      </div>
                      
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            (selectedShelter.currentOccupancy / selectedShelter.capacity) > 0.9
                              ? 'bg-red-500'
                              : (selectedShelter.currentOccupancy / selectedShelter.capacity) > 0.7
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                          }`} 
                          style={{ width: `${(selectedShelter.currentOccupancy / selectedShelter.capacity) * 100}%` }}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className={`p-1.5 rounded-md text-center ${selectedShelter.hasFood ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                          Food
                        </div>
                        <div className={`p-1.5 rounded-md text-center ${selectedShelter.hasMedical ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                          Medical
                        </div>
                        <div className={`p-1.5 rounded-md text-center ${selectedShelter.isAccessible ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                          Accessible
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">Contact</Button>
                    <Button size="sm">Get Directions</Button>
                  </CardFooter>
                </Card>
              )}
              
              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                <Button 
                  size="sm" 
                  variant="default" 
                  className="bg-white dark:bg-slate-900 text-black dark:text-white shadow-lg border border-border hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  <Info size={18} className="mr-2" />
                  Legend
                </Button>
                <Button 
                  size="sm" 
                  variant="default" 
                  className="bg-white dark:bg-slate-900 text-black dark:text-white shadow-lg border border-border hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  <Layers size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Map;
