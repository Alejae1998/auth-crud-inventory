import React, { useState, useEffect } from 'react';
import { getRestaurantById, updateRestaurant } from './services/fetch-utils';
import { useHistory, useParams } from 'react-router-dom';

export default function UpdatePage() {
  const history = useHistory();
  const { id } = useParams();
  const [restaurantInTheForm, setRestaurantInTheForm] = useState({
    name: '',
    location: '',
    review: '',
  });

  useEffect(() => {
    async function load() {
      const restaurant = await getRestaurantById(id);

      setRestaurantInTheForm(restaurant);
    }
    load();
  }, [id]);

  async function handleUpdateSubmit(e) {
    e.preventDefault();

    await updateRestaurant(id, restaurantInTheForm);

    history.push('/restaurants');
  }

  return (
    <div className="create-page">
      <form onSubmit={handleUpdateSubmit}>
        Update this restaurant
        <label>
          Name
          <input
            required
            value={restaurantInTheForm.name}
            onChange={(e) =>
              setRestaurantInTheForm({ ...restaurantInTheForm, name: e.target.value })
            }
            name="name"
          />
        </label>
        <label>
          Location
          <input
            required
            value={restaurantInTheForm.location}
            onChange={(e) =>
              setRestaurantInTheForm({ ...restaurantInTheForm, location: e.target.value })
            }
            name="location"
          />
        </label>
        <label>
          Review
          <textarea
            required
            value={restaurantInTheForm.review}
            onChange={(e) =>
              setRestaurantInTheForm({ ...restaurantInTheForm, review: e.target.value })
            }
            name="review"
          />
        </label>
        <button>Update Restaurant</button>
      </form>
    </div>
  );
}
