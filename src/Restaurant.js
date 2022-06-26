import { Link } from 'react-router-dom';

export default function Restaurant({ restaurant }) {
  const { id, name, location, review } = restaurant;
  return (
    <Link to={`/restaurants/${id}`}>
      <div className="restaurant">
        <h3>Restaurant name: {name}</h3>
        <p>Located in {location}</p>
        <p> what other people are saying about this place: {review}</p>
      </div>
    </Link>
  );
}
