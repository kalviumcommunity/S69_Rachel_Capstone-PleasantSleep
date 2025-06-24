
import React from 'react';
import MeditationCard from './MeditationCard';

const MeditationGrid = ({ meditations, activeMeditation, isPlaying, onPlay }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meditations.map((meditation) => (
        <MeditationCard 
          key={meditation.id}
          meditation={meditation}
          isActive={activeMeditation?.id === meditation.id}
          isPlaying={isPlaying}
          onPlay={onPlay}
        />
      ))}
    </div>
  );
};

export default MeditationGrid;
