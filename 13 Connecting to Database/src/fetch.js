export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  const responseData = await response.json();

  // response.ok means the response if fetched properly with status code of 200 or 300, so if it is not ok, then status code received will be in the scale of 400, 500.

  if (!response.ok) {
    throw 'Failed to load places.';
  }

  return responseData.places;
}

export async function updatePlaces(places){
  
}
