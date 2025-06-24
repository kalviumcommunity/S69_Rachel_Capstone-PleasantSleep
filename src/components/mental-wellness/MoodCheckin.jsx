
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const emotions = [
  { name: "happy", emoji: "😊" },
  { name: "calm", emoji: "😌" },
  { name: "content", emoji: "🙂" },
  { name: "tired", emoji: "😴" },
  { name: "anxious", emoji: "😟" },
  { name: "stressed", emoji: "😰" },
  { name: "sad", emoji: "😔" },
  { name: "angry", emoji: "😠" }
];

const MoodCheckin = () => {
  const { toast } = useToast();
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [moodIntensity, setMoodIntensity] = useState(5);

  const handleLogMood = () => {
    if (!selectedEmotion) {
      toast({
        title: "Select an emotion",
        description: "Please select how you're feeling first.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Mood logged successfully!",
      description: `You've recorded feeling ${selectedEmotion} with intensity ${moodIntensity}/10.`
    });
    
    setSelectedEmotion(null);
    setMoodIntensity(5);
  };

  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
        <CardTitle>Today's Mood Check-in</CardTitle>
        <CardDescription>
          How are you feeling right now?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6">
          {emotions.map(emotion => (
            <button
              key={emotion.name}
              className={`flex flex-col items-center p-3 rounded-lg hover:bg-muted transition-colors ${
                selectedEmotion === emotion.name ? 'bg-primary/10 border border-primary' : 'bg-muted/50'
              }`}
              onClick={() => setSelectedEmotion(emotion.name)}
            >
              <span className="text-2xl mb-1">{emotion.emoji}</span>
              <span className="text-xs capitalize">{emotion.name}</span>
            </button>
          ))}
        </div>
        
        {selectedEmotion && (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Mild</span>
                <span>Intense</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={moodIntensity}
                onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-center mt-1">
                <Badge className="bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary">
                  Intensity: {moodIntensity}/10
                </Badge>
              </div>
            </div>
            
            <textarea
              placeholder="Add notes about your mood (optional)..."
              className="w-full min-h-[80px] p-3 rounded-md border border-input bg-background text-sm"
            />
            
            <Button onClick={handleLogMood} className="w-full">
              Save Mood
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodCheckin;
