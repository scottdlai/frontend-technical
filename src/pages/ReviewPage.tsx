import { useEffect, useState } from 'react';
import { Review, ReviewCard } from '../components/ReviewCard';
import { useReviewData } from '../hooks/useReviewData';
import { Button } from '../components/Button';
import { partitionToColumns } from '../utils/partitionToColumns';
import MediaQuery from 'react-responsive';

export function ReviewPage(): JSX.Element {
  const { reviews, fetchNewReviews } = useReviewData({ initialMaxItems: 20 });
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (showMore) {
      fetchNewReviews(50);
      enableScrolling();
    } else {
      disableScrolling();
    }
  }, [showMore]);

  return (
    <>
      <div className={`my-0 mx-auto px-8 md:px-16 lg:px-24 py-12`}>
        <SectionHeader />

        {/* https://stackoverflow.com/questions/55253493/css-have-each-grid-element-a-different-height */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start'>
          {/* Can pull in tailwind config here to use value instead */}
          {/* https://tailwindcss.com/docs/configuration#referencing-in-java-script */}
          <MediaQuery minWidth='1280px'>
            <DesktopViewReviews reviews={reviews} />
          </MediaQuery>

          <MediaQuery minWidth='788px' maxWidth='1279px'>
            <TabletViewReviews reviews={reviews} />
          </MediaQuery>

          <MediaQuery minWidth='0px' maxWidth='787px'>
            <MobileViewReviews reviews={reviews} />
          </MediaQuery>
        </div>
      </div>

      {/* Bottom show all reviews button. Can extract this to separate component */}
      {!showMore && (
        <div className='text-center fixed py-12 bottom-0 w-full bg-gradient-to-b from-[rgba(250,250,250,0.6)] to-[rgba(250,250,250,0.9)]'>
          <Button onClick={() => setShowMore(true)}>Show all reviews</Button>
        </div>
      )}
    </>
  );
}

function disableScrolling() {
  document.body.style.overflow = 'hidden';
}

function enableScrolling() {
  document.body.style.overflow = 'visible';
}

// Helper components to de-cluster the main component.
// Unlikely to be re-used anywhere else, don't have to put in components folder
function SectionHeader(): JSX.Element {
  return (
    <div className='text-left md:text-center mb-10'>
      <h3 className='text-base text-primary-400 font-semibold mb-2'>Reviews</h3>
      <h1 className='text-2xl md:text-4xl font-bold mb-4'>
        What our customers are saying 🍦🫶🏼
      </h1>
      <p className='text-base md:text-xl'>
        At The Cone Zone, we're proud to serve up smiles with every scoop! Check
        out what our customers have to say about their favorite flavors,
        experiences, and sweet moments.
      </p>
    </div>
  );
}

interface ReviewDisplayProps {
  reviews: Review[];
}

// Masonry grid: https://flowbite.com/docs/components/gallery/
function DesktopViewReviews({ reviews }: ReviewDisplayProps): JSX.Element {
  const [column1, column2, column3] = partitionToColumns(reviews, 3);
  return (
    <>
      <div className='grid gap-4'>
        {column1.map((review, i) => {
          return <ReviewCard review={review} key={`lg-col-1-review-${i}`} />;
        })}
      </div>
      <div className='grid gap-4'>
        {column2.map((review, i) => {
          return <ReviewCard review={review} key={`lg-col-2-review-${i}`} />;
        })}
      </div>
      <div className='grid gap-4'>
        {column3.map((review, i) => {
          return <ReviewCard review={review} key={`lg-col-3-review-${i}`} />;
        })}
      </div>
    </>
  );
}

function TabletViewReviews({ reviews }: ReviewDisplayProps): JSX.Element {
  const [column1, column2] = partitionToColumns(reviews, 2);
  return (
    <>
      <div className='grid gap-4'>
        {column1.map((review, i) => {
          return <ReviewCard review={review} key={`md-col-1-review-${i}`} />;
        })}
      </div>
      <div className='grid gap-4'>
        {column2.map((review, i) => {
          return <ReviewCard review={review} key={`md-col-2-review-${i}`} />;
        })}
      </div>
    </>
  );
}

function MobileViewReviews({ reviews }: ReviewDisplayProps): JSX.Element {
  return (
    <>
      {reviews.map((review, i) => {
        return <ReviewCard review={review} key={`sm-col-1-review-${i}`} />;
      })}
    </>
  );
}
