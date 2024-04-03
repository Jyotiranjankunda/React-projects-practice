import React, { useEffect, useState } from 'react';

const ProgressBar = ({ timer }) => {
  const [remainingTime, setRemainingTime] = useState(timer);

  // We need to show a progress bar to the user of 3 seconds, and we are deducting 10 ms everytime.

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress max={timer} value={remainingTime} />;
};

export default ProgressBar;
