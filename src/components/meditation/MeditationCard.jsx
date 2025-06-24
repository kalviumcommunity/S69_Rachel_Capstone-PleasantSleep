
import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MeditationCard = ({ meditation, isActive, isPlaying, onPlay }) => {
  return (
    <Card key={meditation.id} className="overflow-hidden flex flex-col">
      <div 
        className="w-full h-40 bg-cover bg-center" 
        style={{ backgroundImage: `url(${meditation.image})` }}
      />
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{meditation.title}</CardTitle>
          <Badge variant="outline">{meditation.duration}</Badge>
        </div>
        <CardDescription>{meditation.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{meditation.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onPlay(meditation)}
          variant={isActive && isPlaying ? "outline" : "default"}
        >
          {isActive && isPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              {isActive ? "Resume" : "Start"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MeditationCard;
