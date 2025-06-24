
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import { Link } from "react-router-dom";

const SleepAidHero = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium mb-6">
            <Moon className="h-4 w-4" />
            <span>Mental Health & Sleep Aid Platform</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Better Sleep,
            <br />
            <span className="text-primary">Better Mental Health</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl">
            An AI-powered platform providing real-time psychological support and personalized sleep improvement solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/register">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">JD</div>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">KM</div>
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">BP</div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">AW</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Joined by <span className="font-medium text-foreground">2,000+</span> people
            </p>
          </div>
        </div>
        <div className="flex-1 relative w-full max-w-md">
          <div className="bg-card border border-border/50 rounded-xl p-6 shadow-lg">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold">Sleep Insights</h3>
                  <p className="text-sm text-muted-foreground">Your sleep patterns</p>
                </div>
                <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                  Try Now
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="h-32 bg-muted/30 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Sleep pattern graph</p>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center bg-background p-2 rounded-md">
                    <p className="text-sm font-medium">Mon</p>
                    <div className="h-16 flex items-end justify-center p-1">
                      <div className="w-4 bg-primary/20 rounded-t-sm h-[40%]"></div>
                    </div>
                  </div>
                  <div className="text-center bg-background p-2 rounded-md">
                    <p className="text-sm font-medium">Tue</p>
                    <div className="h-16 flex items-end justify-center p-1">
                      <div className="w-4 bg-primary/40 rounded-t-sm h-[60%]"></div>
                    </div>
                  </div>
                  <div className="text-center bg-background p-2 rounded-md">
                    <p className="text-sm font-medium">Wed</p>
                    <div className="h-16 flex items-end justify-center p-1">
                      <div className="w-4 bg-primary/30 rounded-t-sm h-[50%]"></div>
                    </div>
                  </div>
                  <div className="text-center bg-background p-2 rounded-md">
                    <p className="text-sm font-medium">Thu</p>
                    <div className="h-16 flex items-end justify-center p-1">
                      <div className="w-4 bg-primary rounded-t-sm h-[80%]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Moon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">AI Sleep Recommendation</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Try a 10-min deep breathing exercise before bed to improve your sleep quality by up to 27%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -z-10 top-10 -right-6 w-full h-full bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SleepAidHero;
