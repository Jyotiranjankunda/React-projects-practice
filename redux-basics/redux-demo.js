const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
    // reducer function returns a new state object.
    if (action.type == "increment") {
        return {
            counter: state.counter + 1,
        };
    }

    if (action.type == "decrement") {
        return {
            counter: state.counter - 1,
        };
    }

    return state;
};

// Create a central data store
const store = redux.createStore(counterReducer); // createStore creates a central data store and takes a reducer function as an argument, which mutates the data store.

// console.log(store.getState());

const counterSubscriber = () => {
    const latestState = store.getState();
    // getState is a method available on the store created with createStore. It will give the latest state snapshot after the state is updated.

    console.log(latestState);
};

store.subscribe(counterSubscriber);

// the dispatch function dispathes an action, which is an object with a type property, in which we describe the type of action.
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
