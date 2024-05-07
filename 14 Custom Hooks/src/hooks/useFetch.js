import { useEffect, useState } from "react";

// It is mandatory to create any custom hook with the name starting from 'use'.

// Rule of hooks - 

// 1. It can be used inside any component function or any custom hook. It can't be nested anywhere else.

// 2. Only call hooks on the top level. 

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({
          message: error.message || 'Failed to fetch data.',
        });
      }

      setIsFetching(false);
    }

    fetchData();

    // Since fetchFn is a external prop, and that might could change, so we need to add that as a dependency to the useEffect.

  }, [fetchFn]);

  // Since, we are using the state in this component only, to make use of these states in other functions from where they are called, we can return these 3 states, either in form of array or object.

  // Not only state, we can also return state updating function also

  return{
    isFetching,
    error,
    fetchedData,
    setFetchedData
  }
}
