import { useState, useEffect } from 'react';
import { getRestaurants } from './services/fetch-utils';
import Restaurant from './Restaurant';

export default function ListRestaurant() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetch() {
      const fetchedRestaurants = await getRestaurants();
      setRestaurants(fetchedRestaurants);
    }

    fetch();
  }, []);

  return (
    <div className="list-restaurant">
      {restaurants.map((restaurant, i) => (
        <Restaurant key={restaurant.id + i} restaurant={restaurant} />

      ))}
    </div>
  );
}