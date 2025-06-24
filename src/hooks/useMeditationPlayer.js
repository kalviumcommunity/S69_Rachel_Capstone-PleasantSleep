
import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useMeditationPlayer = () => {
  const [activeMeditation, setActiveMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const { toast } = useToast();

  const handlePlay = (meditation) => {
    if (activeMeditation?.id === meditation.id) {
      togglePlayPause();
    } else {
      setActiveMeditation(meditation);
      setIsPlaying(true);
      
      toast({
        title: `Playing "${meditation.title}"`,
        description: "Adjust your volume and find a comfortable position",
      });
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    toast({
      title: isPlaying ? "Meditation paused" : "Meditation resumed",
      description: isPlaying ? "Take your time before continuing" : "Continue your practice",
    });
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
      setProgress(audioRef.current.currentTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration || 0, 
        audioRef.current.currentTime + 10
      );
      setProgress(audioRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
        
        toast({
          title: "Playback error",
          description: "There was an issue playing the meditation audio",
          variant: "destructive"
        });
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, activeMeditation, toast]);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      
      toast({
        title: "Meditation complete",
        description: "Your practice session has ended",
      });
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('loadedmetadata', handleTimeUpdate);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('loadedmetadata', handleTimeUpdate);
      }
    };
  }, [activeMeditation, toast]);

  // Load audio source when meditation changes
  useEffect(() => {
    if (activeMeditation && audioRef.current) {
      audioRef.current.src = activeMeditation.audioUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error(e));
      }
      audioRef.current.volume = volume / 100;
    }
  }, [activeMeditation, volume]);

  return {
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
  };
};
