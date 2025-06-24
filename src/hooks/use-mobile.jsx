
import { useState, useEffect } from 'react';

export function useIsMobile() {
  // Define the mobile breakpoint - matches Tailwind's md breakpoint
  const MOBILE_BREAKPOINT = 768;
  
  // Initialize with a check before any effects run
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    // Handle window resize to update the mobile state
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call once on mount to ensure correct initial state
    handleResize();
    
    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

// Additional hooks for more specific breakpoints
export function useBreakpoint(breakpoint) {
  const [isBelow, setIsBelow] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsBelow(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isBelow;
}

// Tailwind breakpoint hooks
export function useIsSm() {
  return useBreakpoint(640); // sm: 640px
}

export function useIsMd() {
  return useBreakpoint(768); // md: 768px
}

export function useIsLg() {
  return useBreakpoint(1024); // lg: 1024px
}

export function useIsXl() {
  return useBreakpoint(1280); // xl: 1280px
}

export function useIs2xl() {
  return useBreakpoint(1536); // 2xl: 1536px
}
