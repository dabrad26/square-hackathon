/* eslint-disable semi */
import { type MenuItem } from './SquareData';

export interface CartItem {
  id: string
  item: MenuItem
  quantity: number
  specialInstructions: string
}
