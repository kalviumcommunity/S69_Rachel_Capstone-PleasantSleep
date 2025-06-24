
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain, List } from "lucide-react";

const MoodStats = ({ moodData }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Brain className="w-5 h-5 mr-2 text-primary" />
          Today's Mood
        </CardTitle>
        <CardDescription>Your emotional state</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4">
          <div className="flex justify-center items-center h-16 mb-2">
            {moodData.mood === "calm" && <div className="text-5xl">😌</div>}
            {moodData.mood === "happy" && <div className="text-5xl">😊</div>}
            {moodData.mood === "stressed" && <div className="text-5xl">😰</div>}
            {moodData.mood === "anxious" && <div className="text-5xl">😟</div>}
          </div>
          <p className="text-xl font-medium capitalize">{moodData.mood}</p>
          <p className="text-sm text-muted-foreground mt-1">Intensity: {moodData.intensity}/10</p>
        </div>
        
        <div className="text-sm mt-4">
          <div className="flex items-center mb-2">
            <List className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="font-medium">Notes:</span>
          </div>
          <p className="text-muted-foreground pl-6">{moodData.notes}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodStats;
