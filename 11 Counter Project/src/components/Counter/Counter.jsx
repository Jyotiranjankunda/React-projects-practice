import { useState, memo, useCallback, useMemo } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import CounterHistory from './CounterHistory.jsx';
import { log } from '../../log.js';

function isPrime(number) {
  log('Calculating if is prime number', 2, 'other');

  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// Whenever this component function will be called again, then memo compare the old props value and the new props value, and if they are exactly same, then counter component function will not execute, else execute.

/*
const Counter = memo(function Counter({initialCount})){
  return (
    <>
      ...
    </>
  );
}
*/

// If the internal state of this component i.e, counter state changes, then this component will re-render or when props change. Memo will only prevent from the case where props are same, not in the other case.

// If the counter component is prevented from being executed, then all its child component will also not be rendered

// Don't overuse memo() in each component. Use it as high up in the component tree as possible. Blocking a component higher in the tree will also block all child component executions. And if you wrap all you components inside memo, then react always have to compare props before rendering it, and checking props with memo() costs performance. It will just add a lot of unnecessary checks.

// Don't wrap those components whose props are likely to change very frequent.

// Here, as we are using component structuring and out source the input put in another component, then we can remove memo, as it will unneccasry decrease performance.

export default function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  // Here, isPrime function is executing everytime, whenever the counter component is re-rendered, but we acutally not need that. isPrime function should be only executed based on value of initialCount, not based on counter state in this component.

  // So, to prevent the execution of normal functions in any component, we use useMemo hook. It is similar to useCallback. If the dependencies change, then only the function will execute otherwise not.

  // memo is used to wrap component functions, and useMemo is used to wrap normal functions in component.

  // Just like memo, don't overuse useMemo. When it is much necessary, that a function having very complex calculations and it shouldn't be re-executed unneccesarily, there you should use useMemo.

  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

  // const [counter, setCounter] = useState(initialCount);

  // Modified the counter component a little bit, now instead of storing only counter value, the state now also store the changes that are made to the component.

  // id is given as a random no. to use as a key in listing down all the history which will contain which buttons are pressed.

  const [counterChanges, setCounterChanges] = useState([
    { 
      value: initialCount, 
      id: Math.random() * 1000 
    },
  ]);

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0,
  );

  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [
      { value: -1, id: Math.random() * 1000 },
      ...prevCounterChanges,
    ]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [
      { value: 1, id: Math.random() * 1000 },
      ...prevCounterChanges,
    ]);
  }, []);

  return (
    <section className='counter'>
      <p className='counter-info'>
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        {/* Everytime the counter component is rendered, causes the icon button and counter output to be re-render. Now, counter output must re-rendered everytime, but the icon button is static and need not to be rendered again and again, so we use memo function in that. */}

        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>

      <CounterHistory history={counterChanges} />
    </section>
  );
}
