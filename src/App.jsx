import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard";
import SleepTracker from "./pages/SleepTracker";
import MentalWellness from "./pages/MentalWellness";
import ChatSupport from "./pages/ChatSupport";
import Therapists from "./pages/Therapists";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound.jsx";
import Meditations from "./pages/Meditations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sleep-tracker" element={<SleepTracker />} />
          <Route path="/mental-wellness" element={<MentalWellness />} />
          <Route path="/chat-support" element={<ChatSupport />} />
          <Route path="/therapists" element={<Therapists />} />
          <Route path="/community" element={<Community />} />
          <Route path="/meditations" element={<Meditations />} />
          
          {/* Legacy routes - can be removed if not needed */}
          <Route path="/resources" element={<NotFound />} />
          <Route path="/alerts" element={<NotFound />} />
          <Route path="/map" element={<NotFound />} />
          <Route path="/volunteer" element={<NotFound />} />
          
          {/* Additional routes that might be added later */}
          <Route path="/meditations" element={<NotFound />} />
          <Route path="/about" element={<NotFound />} />
          <Route path="/profile" element={<NotFound />} />
          <Route path="/settings" element={<NotFound />} />
          <Route path="/forgot-password" element={<NotFound />} />
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
