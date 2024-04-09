import type PhotoItem from './Photo';

/* eslint-disable semi */
export default interface ReviewItem {
  /** ID of the review */
  id?: string
  /** Review text */
  text: string
  /** Photos of the review */
  photos: PhotoItem[]
}
