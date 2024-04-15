export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  const responseData = await response.json();

  // response.ok means the response if fetched properly with status code of 200 or 300, so if it is not ok, then status code received will be in the scale of 400, 500.

  if (!response.ok) {
    throw 'Failed to load places.';
  }

  return responseData.places;
}

// We can also send put or post request using fetch, in which we are sending the places which are selected by user, that are to be saved in the user-places file, which are later used to fetch the selected user places data when first time the page loads.

// It is similar to like local storage, we store the data, that the user selected, and then later fetch from there to show those on the UI when first time the page loads.

/*
GET request- This operation reads information from a record in the database.  
PUT request- This operation changes a record's information in the database.  
POST request - This operation creates a new record in the database.

PUT and POST both perform modifications on existing data, but they do so differently because of idempotence. PUT modifies a record's information and creates a new record if one is not available, and POST creates a new subordinate resource at the URI 
*/

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places: places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to update user data');
  }

  return responseData.message;
}

export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch user places.');
  }

  return resData.places;
}
