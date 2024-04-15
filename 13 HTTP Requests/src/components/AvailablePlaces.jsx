import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../fetch.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  // Always use useEffect while fetching data from backend, as if we use fetch function directly without useEffect, it may get into an infinite loop.

  useEffect(() => {
    // Here, we have used async function inside useEffect, that is totally fine, but we can't make any component function as async.

    async function fetchPlaces() {
      setIsFetching(true);
      // We can encounter with many kinds of error in a project, such as the data is not fetched properly, or may be the server is down, or any other problem, so we need to wrap the code into try catch block so as to prevent app from crashing.

      try {
        const places = await fetchAvailablePlaces();

        // The navigator function will execute once after the places have been fetched, and here we can't use async await, as navigator doesn't return a promise, so it takes a callback function as parameter.

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude,
          );
          setAvailablePlaces(sortedPlaces);

          // Since here sorting of places is an async function, as it is passed in a callback,so js won't wait for its execution. Now earlier, we set the setIsFetching to false outside of try catch block, if we do that now, it will set fetching to false very early before even sorting it as soon as the navigator function in initialised. So, we need to keep it inside of both try and catch block.

          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message: error.message || 'Could not fetch places, please try again later.',
        });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title='An error occured' message={error.message} />;
  }

  return (
    <Places
      title='Available Places'
      places={availablePlaces}
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
      isLoading={isFetching}
      loadingText='Loading places...'
    />
  );
}
