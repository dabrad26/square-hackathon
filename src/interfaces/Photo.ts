/* eslint-disable semi */
export default interface PhotoItem {
  /** URL of the image */
  url: string
  /** ID of foods to tag (name of item. Order API does not return ID of an item. So rely on name.) */
  foods: string[]
  /** Review item (added for Photos use) */
  reviewId?: string
}
