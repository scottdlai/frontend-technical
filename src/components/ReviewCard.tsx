import { StarIcon } from '@heroicons/react/24/solid';

export interface Review {
  name: string;
  comment: string;
  grade: number;
  reviewerLevel: string;
  avatar: string;
}

export interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps): JSX.Element {
  const { name, comment, grade, avatar, reviewerLevel } = review;

  console.log({ name, comment, grade, reviewerLevel, avatar });

  const stars = Array.from({ length: grade }, (_, i) => (
    <StarIcon className='text-yellow-500 w-5 h-5' key={i} />
  ));

  return (
    <>
      <div className='p-4 border rounded-lg shadow-lg bg-white'>
        <div className='flex items-center mb-4'>
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className='w-12 h-12 rounded-full mr-4'
          />
          <div>
            <h2 className='text-lg font-bold text-primary-400 text-left'>
              {name}
            </h2>
            <p className='text-sm text-gray-500 text-left'>{reviewerLevel}</p>
          </div>
        </div>
        <div className='flex items-center mb-4'>{stars}</div>
        <p className='text-gray-800 text-left'>{comment}</p>
      </div>
    </>
  );
}
