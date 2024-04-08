import React, { useEffect, useState } from 'react';

const QuestionTimer = ({ timeout, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  // This useEffect will re-execute if either of the dependencies change.

  // Since, we are using a function as a dependency in the useEffect, so we need to wrap that function in useCallback in the Quiz component, otherwise there will be multiple timeouts.

  useEffect(() => {
    // The set interval is written inside useEffect, as alone it will create an infinite loop, since it is updating the state, so that the component will re-render, again a setInteval will be created, and again state will be changed, and so on.

    // By using useEffect, we are passing nothing to the dependency array, so that this setInterval will run only once.

    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    // Here, we need to clear the interval as well as the timer whenever it is unmounted from the DOM.

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id='question-time' max={timeout} value={remainingTime} />;
};

export default QuestionTimer;
