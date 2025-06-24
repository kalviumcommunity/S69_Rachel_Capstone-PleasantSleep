
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate the offset (reduced intensity for subtle effect)
      const offsetX = (clientX - centerX) / 50;
      const offsetY = (clientY - centerY) / 50;
      
      // Apply the parallax effect to background elements
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el, index) => {
        const htmlEl = el as HTMLElement;
        const intensity = (index + 1) * 0.5;
        htmlEl.style.transform = `translate(${offsetX * intensity}px, ${offsetY * intensity}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 -z-10 bg-noise mix-blend-soft-light"></div>
      <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl parallax-element"></div>
      <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-accent/10 blur-3xl parallax-element"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium animate-fade-in">
            Connecting Communities During Crisis
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-balance mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Disaster Resources,{' '}
            <span className="text-primary">When They Matter Most</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground text-balance mx-auto mb-10 max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
            A real-time platform connecting victims, volunteers, and authorities to efficiently coordinate resources and support during crisis situations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button size="lg" className="font-medium text-base group">
              Find Resources
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="font-medium text-base">
              Volunteer Now
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center shadow-subtle border border-border/50 transition-all duration-300 hover:shadow-elevation">
            <div className="text-4xl font-bold mb-2 bg-clip-text text-primary">4,500+</div>
            <div className="text-sm text-muted-foreground">Resources Allocated</div>
          </div>
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center shadow-subtle border border-border/50 transition-all duration-300 hover:shadow-elevation">
            <div className="text-4xl font-bold mb-2 bg-clip-text text-primary">150+</div>
            <div className="text-sm text-muted-foreground">Communities Supported</div>
          </div>
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center shadow-subtle border border-border/50 transition-all duration-300 hover:shadow-elevation">
            <div className="text-4xl font-bold mb-2 bg-clip-text text-primary">12,000+</div>
            <div className="text-sm text-muted-foreground">Volunteers Mobilized</div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
        <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
        <div className="w-[2px] h-8 bg-muted-foreground/20 relative overflow-hidden">
          <div className="w-full h-1/2 bg-primary absolute top-0 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
