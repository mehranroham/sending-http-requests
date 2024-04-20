import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        if (!response.ok) {
          const error = new Error('failed to fetch places');
          throw error;
          // ok 200 300
          // !ok 400 500
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message: error.message || 'could not fetch places, please try again',
        });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return (
      <>
        <Error title='an error occurred!' message={error.message} />
      </>
    );
  }

  return (
    <Places
      title='Available Places'
      isFetching={isFetching}
      places={availablePlaces}
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
    />
  );
}
