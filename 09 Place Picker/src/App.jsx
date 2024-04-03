import { useCallback, useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id),
);

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  // what are side effects?
  // Side effects are tasks that don't impace the current component render cycle.

  // Here we are trying to sort the available places based on distance closer to user location, so here we are fetching the user location using navigator. But the problem is that, while accessing location, we are updating the availablePlaces state, which will cause to re-render the app component, due to which again the navigator function will run, and this will cause to get into an infinite loop.

  /*
  navigator.geolocation.getCurrentPosition((position) => {
    const sortedPlaces = sortPlacesByDistance(
      AVAILABLE_PLACES,
      position.coords.latitude,
      position.coords.longitude,
    );

    setAvailablePlaces(sortedPlaces);
  });
  */

  // To avoid this infinite loop, we will use useEffect hook.
  // useEffect will run after the whole App component will be rendered.
  // Now, when useEffect will run, that will cause a change in state (availablePlaces), which will cause the App to re-render, but this time useEffect will not run as dependency is an empty array.
  // useEffect will run on first execution of the App component or any other component in which it is defined, and after that, it will execute whenever the element in dependency array changes.
  // If we don't use the dependency array, then it will again go into infinite loop.

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude,
      );

      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  // Here, we are loading the data stored in localStorage as soon as the page is loading. It can be done by useEffect, as it has to be executed once, but we need not to do that in useEffect.

  // It is because, loading data from localstorage and setting it is synchronous, and executes line by line, but fetching the user's location is asynchronous, as it may take more or less time on different devices. But in localStorage, we have nothing like any promise or callback function or anything like this, i.e, it's execution is instant; not to be happen in future.

  // Instead we can load the data from local storage outside of app function, and set the initial value of state pickedPlaces as storedPlaces.

  /*
  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    const storedPlaces = storedIds.map((id) =>
      AVAILABLE_PLACES.find((place) => place.id === id),
    );

    setPickedPlaces(storedPlaces);
  }, []);
  */

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    // This is also a side effect, as storing the selected places in the localstorage have nothing to do with the component re-rendering as it is not updating any state.
    // Not all side effects are needed to be written in useEffect.
    // Because here, storing some data in local storage will happen whenever we click on any picture, but the track of location should be needed to execute as soon as the website loads, so it is written inside useEffect, not this one.

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
    }
  }

  // useCallback Hook returns a memoized callback function. Think of memoization as caching a value so that it does not need to be recalculated.

  // It's syntax is similar to useEffect hook. you can write the dependencies in the dependency array which are used in the function. But here, we have not any.

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current),
    );
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem(
      'selectedPlaces',
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)),
    );

    // Here, we are filtering out only those places which are removed, others are to be as they are before.

    // filter method will return those values, which are true, and drop out those which are false.. So here, those places whose id doesn't match with the clicked place id, that will be remain as same, and those places which are removed will be removed from localStorage.
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt='Stylized globe' />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or you have
          visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title='Available Places'
          places={availablePlaces}
          fallbackText='Sorting places by distance...'
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
