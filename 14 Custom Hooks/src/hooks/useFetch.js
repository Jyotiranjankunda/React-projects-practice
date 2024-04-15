import { useEffect, useState } from "react";

// It is mandatory to create any custom hook with the name starting from 'use'.
// Rule of hooks - It can be used inside any component function or any custom hook. It can't be nested anywhere else.

function useFetch() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError({
          message: error.message || 'Failed to fetch user places.',
        });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);
}
