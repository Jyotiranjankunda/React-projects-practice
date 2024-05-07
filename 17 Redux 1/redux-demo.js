const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
    return {
        counter: state.counter + 1,
    };
};

// Create a central data store
const store = redux.createStore(counterReducer);
console.log(store.getState());

const counterSubscriber = () => {
    const latestState = store.getState();
    // getState is a method available on the store created with createStore. It will give the latest state snapshot after the state is updated.

    console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({type: 'increment'});