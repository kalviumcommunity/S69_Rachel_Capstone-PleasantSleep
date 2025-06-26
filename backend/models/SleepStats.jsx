import React from 'react';

const SleepStats = ({ hours, quality }) => {
  return (
    <div className="p-4 rounded-xl shadow-md bg-blue-50 text-gray-700">
      <h2 className="text-xl font-bold">Sleep Stats</h2>
      <p>Hours Slept: {hours}</p>
      <p>Quality: {quality}</p>
    </div>
  );
};

export default SleepStats;
