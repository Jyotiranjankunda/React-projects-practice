import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  /*
  state is also tracked by position by React. Here, we are outputting a list, i.e, in which order counter is incremented or decremented. We can select any history component and that will be highlighted. But the main concern is that, if we increment or decrement the counter, then another history will be added on to the top of the stack, the highlighted element will go down, but the highlight color will remain at the same place. that is state is jumping from one component to another. But this is very weird as state is scoped to components.

  But another thing is that, state is also tracked by position, so while outputting the list, the position of component matters, and that's why state is jumping from one to another. Now to fix this, we have to use key prop so that react can identify each element individually.

  If we give index as a key, then it will not work, as when new element comes on top of the stack, the index of previous element will be now of new element, so index of a particular element is not fixed, and therefore state can't be scoped to that element bcz it's position will be changed after a new element will be added.

  Therefore, we must add something unique to key. Therefore, we have added an id to the array of object, which generated a random no. But it is dangerous as two random no.s can be same, but for this small project it is ok. 
  So, by using unique react can uniquely identify the component and now state will be scoped to that component only.

  One more benefit of using the key as unique instead of index is.... when a new element will added, then index of all previous element will increased by one, so that according to react all elements are changed, and therefore for every increment or decrement, it will recreate the whole list in the dom.
  But if we use some unique key like id, react will only change that particular new element that is added.
  */

  return (
    <ol>
      {history.map((count) => (
        <HistoryItem key={count.id} count={count.value} />
      ))}
    </ol>
  );
}
