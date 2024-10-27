import { useEffect, useState } from 'react';
import { Review } from '../components/ReviewCard';
import REVIEWS from '../reviews.json';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

export interface UseReviewDataProps {
  initialMaxItems: number;
}

export interface PaginatedReviewData {
  reviews: Review[];
  isInProgress: boolean;
  allReviewsFetched: boolean;
  fetchNewReviews: (maxItems?: number) => Promise<Review[]>;
}

export function useReviewData({
  initialMaxItems,
}: UseReviewDataProps): PaginatedReviewData {
  const [isInProgress, setIsInProgress] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [nextToken, setNextToken] = useState<string | null | undefined>(
    undefined
  );

  useEffect(() => {
    listReviews({ maxItems: initialMaxItems }).then(
      ({ reviews, nextToken }) => {
        setReviews(reviews);
        setNextToken(nextToken);
        setIsInProgress(false);
      }
    );
  }, [initialMaxItems]);

  const fetchNewReviews = async (maxItems?: number) => {
    setIsInProgress(true);

    const listReviewsResponse = await listReviews({ nextToken, maxItems });

    setReviews((reviews) => [...reviews, ...listReviewsResponse.reviews]);
    setNextToken(listReviewsResponse.nextToken);
    setIsInProgress(false);

    return listReviewsResponse.reviews;
  };

  return {
    reviews,
    isInProgress,
    allReviewsFetched: nextToken === null,
    fetchNewReviews,
  };
}

interface ListReviewsRequest {
  nextToken?: string | null;
  maxItems?: number | null;
}

interface ListReviewsResponse {
  reviews: Review[];
  nextToken: string | null;
}

const DEFAULT_MAX_ITEMS = 10;

// Can also move this function to other file
async function listReviews({
  nextToken,
  maxItems,
}: ListReviewsRequest = {}): Promise<ListReviewsResponse> {
  // For pagination, nextToken is usually a String
  // Since we're just reading hard-coded json data, nextToken can be interpreted
  // as a starting index
  const startIndexInclusive = Number(nextToken ?? 0);
  const endIndexExclusive =
    startIndexInclusive + (maxItems ?? DEFAULT_MAX_ITEMS);

  // To simulate async API call
  const reviewsData = await REVIEWS.slice(
    startIndexInclusive,
    endIndexExclusive
  );

  const reviews = reviewsData.map(
    ({ name, grade, review: comment, reviewer_level: reviewerLevel }) => {
      const avatar = createAvatar(lorelei, {
        seed: `${name}-${grade}-${reviewerLevel}-${comment}`,
      });

      return {
        name,
        grade,
        comment,
        reviewerLevel,
        avatar: avatar.toDataUri(),
      };
    }
  );

  const responseNextToken =
    endIndexExclusive < REVIEWS.length ? endIndexExclusive.toString() : null;

  return {
    reviews,
    nextToken: responseNextToken,
  };
}
