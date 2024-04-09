/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable spellcheck/spell-checker */
import axios, { type AxiosRequestConfig } from 'axios';
import { type MenuItem } from '../interfaces/SquareData';
import type PhotoItem from '../interfaces/Photo';
import type ReviewItem from '../interfaces/Review';

export class DataService {
  /** API Server */
  private apiServer = 'https://api.unrealpixels.dev';
  /** All items for sale */
  private menuItemsStore: MenuItem[] = [];
  /** All reviews */
  private reviewItemStore: ReviewItem[] = [];

  get businessInfo(): { name: string } {
    return {
      name: "Maya's Taqueria",
    };
  }

  get apiCallConfig(): AxiosRequestConfig {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
  }

  async init(): Promise<unknown> {
    const apiCalls = [
      axios.get(`${this.apiServer}/photo-wall/menu`, this.apiCallConfig).then(response => {
        this.menuItemsStore = (response.data.objects || []).map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            description: item.item_data.description,
            is_taxable: !!item.item_data.is_taxable,
            variations: item.variations.map((variant: any) => {
              return {
                id: variant.id,
                name: variant.item_variation_data.name,
                ordinal: variant.item_variation_data.ordinal,
                pricing_type: variant.item_variation_data.pricing_type,
                price: variant.item_variation_data.price_money?.amount || 0,
              };
            }),
          };
        });

        return response;
      }),
      axios.get(`${this.apiServer}/photo-wall/reviews`, this.apiCallConfig).then(response => {
        this.reviewItemStore = response.data;

        return response;
      }),
    ];

    return await Promise.all(apiCalls);
  }

  async saveReview(data: ReviewItem): Promise<ReviewItem> {
    return await axios.post(`${this.apiServer}/photo-wall/reviews`, data, this.apiCallConfig).then(response => {
      const newItem = response.data as ReviewItem;
      this.reviewItemStore.push(newItem);

      return newItem;
    });
  }

  async getReceiptMenuItems(id: string): Promise<MenuItem[]> {
    return await axios.get(`${this.apiServer}/photo-wall/receipt/${id}`, this.apiCallConfig).then(response => {
      const receiptMenuItems: MenuItem[] = (response.data.order.line_items || []).map((item: any) => {
        return {
          id: item.uid,
          name: item.name,
          description: '',
          is_taxable: !!item.total_tax_money?.amount,
          variations: [
            {
              id: item.uid,
              name: item.name,
              ordinal: 1,
              pricing_type: 'FIXED_PRICING',
              price: item.base_price_money?.amount || 0,
            },
          ],
        };
      });

      return receiptMenuItems;
    });
  }

  get menuItems(): MenuItem[] {
    return this.menuItemsStore;
  }

  get photos(): PhotoItem[] {
    const items: PhotoItem[] = [];

    this.reviewItemStore.forEach(item => {
      item.photos.forEach(photo => {
        photo.reviewId = item.id;

        items.push(photo);
      });
    });

    return items;
  }
}

const dataService = new DataService();
export default dataService;
