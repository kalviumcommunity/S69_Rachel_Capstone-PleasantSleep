import React from 'react';
import Navbar from './components/Navbar';
import SleepStats from './components/SleepStats';

function App() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <SleepStats hours={7} quality="Good" />
      </div>
    </div>
  );
}

export default App;
