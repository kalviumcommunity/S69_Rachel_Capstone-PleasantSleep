
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Info, AlertTriangle, Clock, Home, Building, Truck, Users, ArrowRight, ArrowLeft } from "lucide-react";

// Define the disaster and shelter types for TypeScript
interface DisasterEvent {
  id: number;
  type: string;
  title: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  severity: string;
  status: string;
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
  status: string;
}

interface DisasterMapProps {
  disasters?: DisasterEvent[];
  shelters?: ShelterLocation[];
  layers?: {
    disasters: boolean;
    shelters: boolean;
    resources: boolean;
    roads: boolean;
  };
  onMarkerClick?: (eventId: number) => void;
  onShelterClick?: (shelterId: number) => void;
}

// Placeholder for actual map implementation
const MapPlaceholder = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden bg-muted/30">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Interactive map would render here (Google Maps/Mapbox)</p>
      </div>
      
      {/* Mock map elements */}
      <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-red-500/80 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
        <MapPin className="h-3 w-3 text-white" />
      </div>
      
      <div className="absolute top-2/4 left-1/2 w-6 h-6 bg-amber-500/80 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
        <AlertTriangle className="h-3 w-3 text-white" />
      </div>
      
      <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-blue-500/80 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
        <Info className="h-3 w-3 text-white" />
      </div>
    </div>
  );
};

// Low fidelity diagram component
const LowFiDiagram = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden bg-white dark:bg-slate-900 p-4 border border-dashed border-gray-300 dark:border-gray-700">
      <div className="absolute top-2 left-2 text-xs text-muted-foreground">Disaster Response System - Low-fi Diagram</div>
      
      {/* Central Command Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-24 bg-primary/10 rounded-lg border border-primary/30 flex flex-col items-center justify-center text-center">
        <Building className="h-6 w-6 text-primary mb-1" />
        <span className="text-xs font-medium">Command Center</span>
        <span className="text-[10px] text-muted-foreground">Resource Coordination</span>
      </div>
      
      {/* Disaster Zones */}
      <div className="absolute top-1/4 left-1/4 w-28 h-20 bg-red-500/10 rounded-lg border border-red-500/30 flex flex-col items-center justify-center text-center">
        <AlertTriangle className="h-5 w-5 text-red-500 mb-1" />
        <span className="text-xs font-medium">Disaster Zone A</span>
        <span className="text-[10px] text-muted-foreground">Wildfire</span>
      </div>
      
      <div className="absolute bottom-1/4 left-1/5 w-28 h-20 bg-amber-500/10 rounded-lg border border-amber-500/30 flex flex-col items-center justify-center text-center">
        <AlertTriangle className="h-5 w-5 text-amber-500 mb-1" />
        <span className="text-xs font-medium">Disaster Zone B</span>
        <span className="text-[10px] text-muted-foreground">Flooding</span>
      </div>
      
      {/* Shelters */}
      <div className="absolute top-1/3 right-1/4 w-28 h-20 bg-blue-500/10 rounded-lg border border-blue-500/30 flex flex-col items-center justify-center text-center">
        <Home className="h-5 w-5 text-blue-500 mb-1" />
        <span className="text-xs font-medium">Shelter #1</span>
        <span className="text-[10px] text-muted-foreground">Cap: 150 people</span>
      </div>
      
      <div className="absolute bottom-1/3 right-1/5 w-28 h-20 bg-blue-500/10 rounded-lg border border-blue-500/30 flex flex-col items-center justify-center text-center">
        <Home className="h-5 w-5 text-blue-500 mb-1" />
        <span className="text-xs font-medium">Shelter #2</span>
        <span className="text-[10px] text-muted-foreground">Cap: 200 people</span>
      </div>
      
      {/* Resource Depot */}
      <div className="absolute top-2/3 right-1/3 w-28 h-20 bg-green-500/10 rounded-lg border border-green-500/30 flex flex-col items-center justify-center text-center">
        <Truck className="h-5 w-5 text-green-500 mb-1" />
        <span className="text-xs font-medium">Resource Depot</span>
        <span className="text-[10px] text-muted-foreground">Supplies & Distribution</span>
      </div>
      
      {/* Volunteer Hub */}
      <div className="absolute bottom-1/4 right-1/4 w-28 h-20 bg-purple-500/10 rounded-lg border border-purple-500/30 flex flex-col items-center justify-center text-center">
        <Users className="h-5 w-5 text-purple-500 mb-1" />
        <span className="text-xs font-medium">Volunteer Hub</span>
        <span className="text-[10px] text-muted-foreground">Team Coordination</span>
      </div>
      
      {/* Connections/Arrows */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {/* Command Center to Disaster Zone A */}
        <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4" />
        
        {/* Command Center to Disaster Zone B */}
        <line x1="50%" y1="50%" x2="20%" y2="75%" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4" />
        
        {/* Command Center to Shelter 1 */}
        <line x1="50%" y1="50%" x2="75%" y2="33%" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4" />
        
        {/* Command Center to Shelter 2 */}
        <line x1="50%" y1="50%" x2="80%" y2="67%" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4" />
        
        {/* Command Center to Resource Depot */}
        <line x1="50%" y1="50%" x2="67%" y2="67%" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4" />
        
        {/* Command Center to Volunteer Hub */}
        <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4" />
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/70 dark:bg-slate-800/70 rounded p-1 text-[10px] flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Disaster Zone</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Shelter</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Resources</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Volunteers</span>
        </div>
      </div>
    </div>
  );
};

const DisasterMap: React.FC<DisasterMapProps> = ({ 
  disasters = [], 
  shelters = [], 
  layers = { disasters: true, shelters: true, resources: false, roads: true },
  onMarkerClick = () => {},
  onShelterClick = () => {}
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showDiagram, setShowDiagram] = useState(false);
  
  const filters = [
    { id: 'all', label: 'All Incidents' },
    { id: 'active', label: 'Active' },
    { id: 'resources', label: 'Resources' },
    { id: 'shelters', label: 'Shelters' }
  ];

  // Handler for demonstration purposes (would be tied to actual map markers in a real implementation)
  const handleMarkerClick = (id: number) => {
    onMarkerClick(id);
  };

  const toggleView = () => {
    setShowDiagram(!showDiagram);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real-Time Disaster Mapping
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Visualize active disaster zones, resource centers, and shelter locations
            to coordinate relief efforts efficiently.
          </p>
        </div>
        
        <Card className="overflow-hidden border-border/50">
          <CardHeader className="bg-muted/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Crisis Map</CardTitle>
                <CardDescription>Showing active incidents and resource locations</CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex flex-wrap gap-2">
                  {filters.map(filter => (
                    <Button 
                      key={filter.id}
                      variant={activeFilter === filter.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(filter.id)}
                      className="text-xs"
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleView}
                  className="ml-2"
                >
                  {showDiagram ? (
                    <>
                      <MapPin className="h-4 w-4 mr-1" /> Map View
                    </>
                  ) : (
                    <>
                      <Info className="h-4 w-4 mr-1" /> Diagram View
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-2">
                {showDiagram ? <LowFiDiagram /> : <MapPlaceholder />}
              </div>
              
              <div className="p-4 md:p-6 border-t md:border-t-0 md:border-l border-border/50 flex flex-col">
                <h3 className="font-medium text-lg mb-4">Active Incidents</h3>
                
                <div className="space-y-4 overflow-auto flex-1">
                  {disasters.length > 0 ? (
                    disasters.slice(0, 3).map((disaster) => (
                      <div 
                        key={disaster.id} 
                        className="p-3 rounded-lg bg-white dark:bg-slate-800 shadow-subtle border border-border/50 cursor-pointer"
                        onClick={() => handleMarkerClick(disaster.id)}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge 
                            variant={disaster.severity === 'high' ? "destructive" : undefined} 
                            className={`font-medium ${
                              disaster.severity === 'medium' ? 'bg-amber-500' : 
                              disaster.severity === 'low' ? 'bg-blue-500' : ''
                            }`}
                          >
                            {disaster.type.charAt(0).toUpperCase() + disaster.type.slice(1)}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> 
                            {new Date(disaster.startDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <h4 className="font-medium mb-1">{disaster.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{disaster.description.substring(0, 60)}...</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1 text-destructive" /> {disaster.location}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-800 shadow-subtle border border-border/50">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="destructive" className="font-medium">Wildfire</Badge>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> 2h ago
                        </span>
                      </div>
                      <h4 className="font-medium mb-1">Northern Hills Fire</h4>
                      <p className="text-xs text-muted-foreground mb-2">Evacuation in progress for Redwood County</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1 text-destructive" /> Redwood County, Northern Region
                      </div>
                    </div>
                  )}

                  {disasters.length === 0 && (
                    <>
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-800 shadow-subtle border border-border/50">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge className="font-medium bg-amber-500">Flooding</Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> 5h ago
                          </span>
                        </div>
                        <h4 className="font-medium mb-1">Riverside Flooding</h4>
                        <p className="text-xs text-muted-foreground mb-2">Rising water levels affecting eastern neighborhoods</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1 text-amber-500" /> Riverside District, Eastern Region
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-800 shadow-subtle border border-border/50">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge className="font-medium bg-blue-500">Resource Center</Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> Active
                          </span>
                        </div>
                        <h4 className="font-medium mb-1">Central Community Center</h4>
                        <p className="text-xs text-muted-foreground mb-2">Food, water, and medical supplies available</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1 text-blue-500" /> Downtown District, Central Region
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <Button className="w-full mt-4 text-sm">View All Incidents</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DisasterMap;
