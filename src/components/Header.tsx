import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Moon className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold tracking-tight">Pleasant Sleep</span>
            </Link>
            
            {!isMobile && (
              <nav className="ml-10">
                <ul className="flex space-x-6">
                  <li>
                    <Link 
                      to="/sleep-tracker" 
                      className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/sleep-tracker') ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      Sleep Tracker
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/mental-wellness" 
                      className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/mental-wellness') ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      Mental Wellness
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/chat-support" 
                      className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/chat-support') ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      AI Support
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/therapists" 
                      className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/therapists') ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      Therapists
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/community" 
                      className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/community') ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      Community
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {!isMobile ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            ) : (
              <Button size="icon" variant="ghost" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background">
          <nav className="container mx-auto px-4 py-6">
            <ul className="space-y-6">
              <li>
                <Link 
                  to="/sleep-tracker" 
                  className={`block text-lg font-medium ${isActive('/sleep-tracker') ? 'text-primary' : 'text-foreground'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sleep Tracker
                </Link>
              </li>
              <li>
                <Link 
                  to="/mental-wellness" 
                  className={`block text-lg font-medium ${isActive('/mental-wellness') ? 'text-primary' : 'text-foreground'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mental Wellness
                </Link>
              </li>
              <li>
                <Link 
                  to="/chat-support" 
                  className={`block text-lg font-medium ${isActive('/chat-support') ? 'text-primary' : 'text-foreground'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI Support
                </Link>
              </li>
              <li>
                <Link 
                  to="/therapists" 
                  className={`block text-lg font-medium ${isActive('/therapists') ? 'text-primary' : 'text-foreground'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Therapists
                </Link>
              </li>
              <li>
                <Link 
                  to="/community" 
                  className={`block text-lg font-medium ${isActive('/community') ? 'text-primary' : 'text-foreground'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Community
                </Link>
              </li>
              <li className="border-t border-border/40 pt-6 mt-6">
                <Link 
                  to="/login" 
                  className="block text-lg font-medium text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="block text-lg font-medium text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
