
import React, { useState } from 'react';
import Header from "@/components/Header";
import ResourceTracker from "@/components/ResourceTracker";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Filter, Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
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

// Define resource types
type ResourceType = "food" | "water" | "medical" | "shelter" | "clothing" | "other";

interface Resource {
  id: number;
  name: string;
  type: ResourceType;
  quantity: number;
  location: string;
  contact: string;
  isRequest: boolean;
  dateAdded: string;
}

const Resources = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<ResourceType | "all">("all");
  const [showRequests, setShowRequests] = useState(true);
  const [showOffers, setShowOffers] = useState(true);
  
  // Resource form state
  const [resourceName, setResourceName] = useState('');
  const [resourceType, setResourceType] = useState<ResourceType>("food");
  const [resourceQuantity, setResourceQuantity] = useState(0);
  const [resourceLocation, setResourceLocation] = useState('');
  const [resourceContact, setResourceContact] = useState('');
  const [isRequest, setIsRequest] = useState(false);
  
  // Mock initial resources data
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      name: "Bottled Water",
      type: "water",
      quantity: 100,
      location: "Central Warehouse",
      contact: "supply@relieforg.org",
      isRequest: false,
      dateAdded: "2023-03-25"
    },
    {
      id: 2,
      name: "Emergency Blankets",
      type: "shelter",
      quantity: 50,
      location: "South Relief Center",
      contact: "shelter@relieforg.org",
      isRequest: false,
      dateAdded: "2023-03-24"
    },
    {
      id: 3,
      name: "First Aid Kits",
      type: "medical",
      quantity: 25,
      location: "Medical Center",
      contact: "medical@relieforg.org",
      isRequest: true,
      dateAdded: "2023-03-26"
    }
  ]);
  
  // Filter resources based on search, type and request/offer
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || resource.type === filterType;
    
    const matchesRequestOffer = 
      (resource.isRequest && showRequests) || 
      (!resource.isRequest && showOffers);
    
    return matchesSearch && matchesType && matchesRequestOffer;
  });
  
  // Handle resource submission
  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add the new resource
    const newResource: Resource = {
      id: resources.length + 1,
      name: resourceName,
      type: resourceType,
      quantity: resourceQuantity,
      location: resourceLocation,
      contact: resourceContact,
      isRequest: isRequest,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    
    setResources([...resources, newResource]);
    
    // Reset form
    setResourceName('');
    setResourceType("food");
    setResourceQuantity(0);
    setResourceLocation('');
    setResourceContact('');
    
    // Show success message
    toast({
      title: isRequest ? "Resource Request Submitted" : "Resource Offer Submitted",
      description: `Your ${isRequest ? "request" : "offer"} for ${resourceName} has been submitted.`,
    });
  };
  
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Resource Management</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Track, request, and offer resources during crisis situations
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={18} />
                    Offer Resources
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Offer Resources</DialogTitle>
                    <DialogDescription>
                      Provide details about the resources you can offer to those in need.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleResourceSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right text-sm">Name</label>
                        <Input 
                          id="name" 
                          value={resourceName}
                          onChange={(e) => setResourceName(e.target.value)}
                          className="col-span-3" 
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="type" className="text-right text-sm">Type</label>
                        <select 
                          id="type" 
                          value={resourceType}
                          onChange={(e) => setResourceType(e.target.value as ResourceType)}
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          required
                        >
                          <option value="food">Food</option>
                          <option value="water">Water</option>
                          <option value="medical">Medical</option>
                          <option value="shelter">Shelter</option>
                          <option value="clothing">Clothing</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="quantity" className="text-right text-sm">Quantity</label>
                        <Input 
                          id="quantity" 
                          type="number" 
                          value={resourceQuantity}
                          onChange={(e) => setResourceQuantity(Number(e.target.value))}
                          className="col-span-3" 
                          min={1}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="location" className="text-right text-sm">Location</label>
                        <Input 
                          id="location" 
                          value={resourceLocation}
                          onChange={(e) => setResourceLocation(e.target.value)}
                          className="col-span-3" 
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="contact" className="text-right text-sm">Contact</label>
                        <Input 
                          id="contact" 
                          value={resourceContact}
                          onChange={(e) => setResourceContact(e.target.value)}
                          className="col-span-3" 
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit Offer</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Plus size={18} />
                    Request Resources
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Request Resources</DialogTitle>
                    <DialogDescription>
                      Specify the resources you need for disaster response.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    setIsRequest(true);
                    handleResourceSubmit(e);
                  }}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="req-name" className="text-right text-sm">Name</label>
                        <Input 
                          id="req-name" 
                          value={resourceName}
                          onChange={(e) => setResourceName(e.target.value)}
                          className="col-span-3" 
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="req-type" className="text-right text-sm">Type</label>
                        <select 
                          id="req-type" 
                          value={resourceType}
                          onChange={(e) => setResourceType(e.target.value as ResourceType)}
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          required
                        >
                          <option value="food">Food</option>
                          <option value="water">Water</option>
                          <option value="medical">Medical</option>
                          <option value="shelter">Shelter</option>
                          <option value="clothing">Clothing</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="req-quantity" className="text-right text-sm">Quantity</label>
                        <Input 
                          id="req-quantity" 
                          type="number" 
                          value={resourceQuantity}
                          onChange={(e) => setResourceQuantity(Number(e.target.value))}
                          className="col-span-3" 
                          min={1}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="req-location" className="text-right text-sm">Location</label>
                        <Input 
                          id="req-location" 
                          value={resourceLocation}
                          onChange={(e) => setResourceLocation(e.target.value)}
                          className="col-span-3" 
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="req-contact" className="text-right text-sm">Contact</label>
                        <Input 
                          id="req-contact" 
                          value={resourceContact}
                          onChange={(e) => setResourceContact(e.target.value)}
                          className="col-span-3" 
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit Request</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              
              <div className="ml-auto flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search resources..." 
                    className="pl-9" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <Filter size={18} />
                      Filter
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Filter Resources</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <h4 className="mb-2 text-sm font-medium">Resource Type</h4>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <Button 
                          variant={filterType === "all" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setFilterType("all")}
                        >
                          All
                        </Button>
                        <Button 
                          variant={filterType === "food" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setFilterType("food")}
                        >
                          Food
                        </Button>
                        <Button 
                          variant={filterType === "water" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setFilterType("water")}
                        >
                          Water
                        </Button>
                        <Button 
                          variant={filterType === "medical" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setFilterType("medical")}
                        >
                          Medical
                        </Button>
                        <Button 
                          variant={filterType === "shelter" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setFilterType("shelter")}
                        >
                          Shelter
                        </Button>
                        <Button 
                          variant={filterType === "clothing" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setFilterType("clothing")}
                        >
                          Clothing
                        </Button>
                      </div>

                      <h4 className="mb-2 text-sm font-medium">Show</h4>
                      <div className="flex gap-2">
                        <Button 
                          variant={showRequests ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setShowRequests(!showRequests)}
                          className="flex-1"
                        >
                          Requests {showRequests ? "✓" : ""}
                        </Button>
                        <Button 
                          variant={showOffers ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setShowOffers(!showOffers)}
                          className="flex-1"
                        >
                          Offers {showOffers ? "✓" : ""}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold">Available Resources</h2>
              
              {filteredResources.length === 0 ? (
                <div className="text-center p-8 border rounded-lg bg-muted/50">
                  <p className="text-muted-foreground">No matching resources found.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredResources.map(resource => (
                    <div key={resource.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-lg bg-card">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{resource.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            resource.isRequest 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' 
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          }`}>
                            {resource.isRequest ? 'Needed' : 'Available'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {resource.quantity} units · {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </p>
                        <div className="text-sm mt-2">
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={14} />
                            {resource.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Button size="sm" variant="outline">
                          Contact
                        </Button>
                        <Button size="sm">
                          {resource.isRequest ? 'Fulfill Request' : 'Request Item'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <ResourceTracker />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-subtle border border-border p-6">
                <h3 className="text-xl font-medium mb-4">Resource Guidelines</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2 items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span>Verify the quality of items before offering</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span>Include accurate quantities and expiration dates</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span>Prioritize essential items during acute emergencies</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-subtle border border-border p-6">
                <h3 className="text-xl font-medium mb-4">Distribution Centers</h3>
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b border-border">
                    <div>
                      <h4 className="font-medium">Central Community Center</h4>
                      <p className="text-sm text-muted-foreground">123 Main St, Downtown</p>
                    </div>
                    <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded">Open</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-border">
                    <div>
                      <h4 className="font-medium">Riverside Relief Station</h4>
                      <p className="text-sm text-muted-foreground">456 River Rd, Eastside</p>
                    </div>
                    <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded">Open</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Northside Shelter</h4>
                      <p className="text-sm text-muted-foreground">789 North Ave, Northside</p>
                    </div>
                    <span className="text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 px-2 py-1 rounded">Limited</span>
                  </div>
                </div>
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

export default Resources;
