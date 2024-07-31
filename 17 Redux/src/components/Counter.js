import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';

// useSelector allows us to automatically select a part of our state managed by the store.

const Counter = () => {
  const dispatch = useDispatch();

  // We give the store in the provider function to the app.js file, so every child of it will have access to the store. Now, useSelector is used to select some part of the store.

  // Here, it extracts the counter value from the state object of the store. In the store, we have only one object, which contains all the state values, that we need in our application. And, then we can use useSelector to take out some part of those values which we need.

  // when you use use selector, React Redux will automatically set up a subscription to the Redux store for this component. So your component will be updated and will receive the latest counter automatically whenever that data changes in the Redux store. If you ever would unmount this component, React Redux would also automatically clear the subscription for you.

  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  const toggleCounterHandler = () => {
    dispatch({type: "toggle"});
  };

  const incrementHandler = () => {
    dispatch({ type: 'increment' }); // This dispath function will dispatch an action to the redux store.
  };

  const increaseHandler = () => {
    dispatch({type: "increase", amount: 5}) // Here, this amount is the action-payload, and we can set to any value we want to increment. This is very flexible.
  }

  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
