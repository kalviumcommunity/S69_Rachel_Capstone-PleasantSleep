
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Headphones } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const AudioPlayer = ({ 
  meditation, 
  isPlaying, 
  progress, 
  duration, 
  volume, 
  formatTime,
  onTogglePlay, 
  onSkipBackward, 
  onSkipForward,
  onVolumeChange 
}) => {
  if (!meditation) return null;
  
  return (
    <Card className="sticky top-4 z-10 mb-8 bg-background/95 backdrop-blur-sm border shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Headphones className="h-5 w-5 mr-2 text-primary" />
              Now Playing: {meditation.title}
            </CardTitle>
            <CardDescription>{meditation.category} • {meditation.duration}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">
            {formatTime(progress)}
          </span>
          <span className="text-sm text-muted-foreground">
            {meditation.duration === "∞" ? "∞" : formatTime(duration)}
          </span>
        </div>
        <div className="h-1 w-full bg-secondary mb-6">
          <div 
            className="h-1 bg-primary" 
            style={{ 
              width: `${duration ? (progress / duration) * 100 : 0}%`,
              transition: "width 0.1s" 
            }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={onSkipBackward}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              className="h-12 w-12 rounded-full" 
              onClick={onTogglePlay}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button variant="outline" size="icon" onClick={onSkipForward}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3 max-w-[180px]">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={onVolumeChange}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
