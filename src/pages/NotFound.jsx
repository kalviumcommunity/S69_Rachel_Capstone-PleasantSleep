
import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <Card className="w-full max-w-md border-border/40 shadow-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Moon className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <p className="text-muted-foreground">Oops! Page not found</p>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <p className="text-sm text-muted-foreground">
            Requested path: <span className="font-mono">{location.pathname}</span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button asChild variant="default" className="w-full sm:w-auto">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFound;
