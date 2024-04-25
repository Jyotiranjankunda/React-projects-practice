import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';
import Error from './components/Error.jsx';
import { useFetch } from './hooks/useFetch.js';

function App() {
  const selectedPlace = useRef();
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Here, we have used custom hook, as our useEffect code's logic is same in the app as well as in availablePlaces.jsx component. Now, to reuse the code, we  need to put that in a function, but we can't put hooks in normal function, so we need to create a custom hook.

  // any state that you are managing in the custom hook and if you are using that custom hook in any component, that states also belong to that particular component also. That means, if any state updates in the custom hook, then that component will also be re-executed again.

  const {
    isFetching,
    error,
    fetchedData: userPlaces,
    setFetchedData: setUserPlaces,
  } = useFetch(fetchUserPlaces, []);

  // Here, userPlaces and setUserPlaces are an alias for fetchedData and setFetchedData that are returned by custom hook.

  // What happens if you use this useFetch hook in other components as well. If we use it in another component and we then update the state from inside this app component, will that affect those other components ? 
  
  // No, because just as with components, it's the same for custom hooks, whenever you use them, a brand new independent copy is created. So when I use useFetch here in the app component, the state that's created and managed in useFetch will be connected to the app component. And if I then also use useFetch in another component, that same state will be recreated as independent state snapshots for that other component. 

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    // await updateUserPlaces([selectedPlace, ...userPlaces]);

    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || 'Failed to update places.',
      });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || 'Failed to delete place.',
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces, setUserPlaces]

    // setUserPlaces should now be added as a dependency here in this useCallback call. Now, we did not have to do that before using a custom hook because those state updating functions normally don't need to be added to dependency arrays of useCallback or useEffect because React guarantees for all those state updating functions that they will never change. But here in this case, react doesn't understand that setUserPlaces refers to a state updating function because all it sees here is that it's some property we're pulling out of some object. Therefore, we need to add that in the dependency array.
  );

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            title='An error occurred!'
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

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
        {error && <Error title='An error occurred!' message={error.message} />}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText='Select the places you would like to visit below.'
            isLoading={isFetching}
            loadingText='Fetching your places...'
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
