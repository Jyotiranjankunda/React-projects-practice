import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';
import { log } from './log.js';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        {/* This input field changes the enteredNumber state on every key stroke, so that the whole app component will be rendered again, causing its each child to render again, i.e, unneccesarily all of its child will be rendered again, so to prevent that we should use memo function. */}

        {/* <section id='configure-counter'>
          <h2>Set Counter</h2>
          <input type='number' onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section> */}

        {/* One more way other than using memo is to avoid component function execution with clever structuring. Here, we can move the above code,i.e, where the input field is there, to some another component; so that for every keystroke only that component will be rendered again not the app or header or counter component. */}

        <ConfigureCounter onSet={handleSetCount} />

        {/* Key not only used to differentiate list elements, but also, it can be used to destroy and recreate component instances. Here, when we type a new value in the input element, then the output value is not reset. But that can be done by adding a key. when ever the key value changes, that destroys the current component instance and create a new one. */}

        {/* 
        In React, when comparing props to determine whether a component should re-render:

        Primitive values (like numbers and strings) are compared by their actual value.
        Objects and arrays are compared by reference, not by their content.
        React might not trigger a re-render if the new prop value is shallowly equal (same reference) to the previous one, even if their contents have changed. 

        So, if we pass only initialCount, and since it is being stored in an object, since the object reference is not changed, and only value changes, so still it is the same prop, and as props are same so the component will not re-render.

        Now, by using key, whenever the chosenCount changes, it will create a new instance of Counter component.
        */}

        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
