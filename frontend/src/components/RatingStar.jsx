import { FaStar } from 'react-icons/fa';

export default function RatingStar({ rating }) {
  const filledStars = rating;
  const emptyStars = 5 - rating;

  const starList = [];

  for (let i = 0; i < filledStars; i++) {
    starList.push(
      <FaStar className="text-2xl text-yellow-500" key={`filled-${i}`} />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    starList.push(
      <FaStar className="text-2xl text-gray-400" key={`empty-${i}`} />
    );
  }

  return (
    <div className="flex justify-between w-1/2 items-center">{starList}</div>
  );
}
