
import React, { useState } from 'react';
import { Headphones, Moon, Timer } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import AudioPlayer from "@/components/meditation/AudioPlayer";
import MeditationGrid from "@/components/meditation/MeditationGrid";
import { useMeditationPlayer } from "@/hooks/useMeditationPlayer";
import { guidedMeditations, sleepSounds, breathingExercises } from "@/data/meditationData";

const Meditations = () => {
  const [activeTab, setActiveTab] = useState('guided');
  const {
    audioRef,
    activeMeditation,
    isPlaying,
    progress,
    duration,
    volume,
    handlePlay,
    togglePlayPause,
    handleVolumeChange,
    formatTime,
    skipBackward,
    skipForward
  } = useMeditationPlayer();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      
      <main className="container px-4 mx-auto pt-8 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Meditation Practice</h1>
          <p className="text-muted-foreground">
            Choose a meditation to begin your mindfulness journey
          </p>
        </div>

        {activeMeditation && (
          <AudioPlayer 
            meditation={activeMeditation}
            isPlaying={isPlaying}
            progress={progress}
            duration={duration}
            volume={volume}
            formatTime={formatTime}
            onTogglePlay={togglePlayPause}
            onSkipBackward={skipBackward}
            onSkipForward={skipForward}
            onVolumeChange={handleVolumeChange}
          />
        )}

        <Tabs defaultValue="guided" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="guided" className="flex items-center gap-1.5">
              <Headphones className="h-4 w-4" />
              <span>Guided</span>
            </TabsTrigger>
            <TabsTrigger value="sleep" className="flex items-center gap-1.5">
              <Moon className="h-4 w-4" />
              <span>Sleep Sounds</span>
            </TabsTrigger>
            <TabsTrigger value="breathing" className="flex items-center gap-1.5">
              <Timer className="h-4 w-4" />
              <span>Breathing</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="guided">
            <MeditationGrid 
              meditations={guidedMeditations}
              activeMeditation={activeMeditation}
              isPlaying={isPlaying}
              onPlay={handlePlay}
            />
          </TabsContent>
          
          <TabsContent value="sleep">
            <MeditationGrid 
              meditations={sleepSounds}
              activeMeditation={activeMeditation}
              isPlaying={isPlaying}
              onPlay={handlePlay}
            />
          </TabsContent>
          
          <TabsContent value="breathing">
            <MeditationGrid 
              meditations={breathingExercises}
              activeMeditation={activeMeditation}
              isPlaying={isPlaying}
              onPlay={handlePlay}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Hidden audio element */}
      <audio ref={audioRef} />
    </div>
  );
};

export default Meditations;
