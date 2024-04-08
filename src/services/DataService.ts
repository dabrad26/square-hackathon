/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable spellcheck/spell-checker */
import axios, { type AxiosRequestConfig } from 'axios';
import { type MenuItem } from '../interfaces/SquareData';
import type PhotoItem from '../interfaces/Photo';

export class DataService {
  /** API Server */
  private apiServer = 'https://connect.squareupsandbox.com/v2';
  /** All items for sale */
  private menuItemsStore: MenuItem[] = [];
  /** All photo items for wall */
  private photoStore: PhotoItem[] = [];

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
    return await axios.get(`${this.apiServer}/catalog/list`, this.apiCallConfig).then(response => {
      this.menuItemsStore = (response.data.objects || []).map((item: any) => {
        return {
          id: item.id,
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
    });
  }

  get menuItems(): MenuItem[] {
    return this.menuItemsStore;
  }

  get photos(): PhotoItem[] {
    // TODO: get photo store. For now here is a hot dog
    const items: PhotoItem[] = [];

    for (let i = 0; i < 120; i++) {
      items.push({ id: 'test', url: 'https://cdn.britannica.com/27/213427-050-869B98FE/Chicago-style-hot-dog.jpg', reviewId: 'TEST' });
    }
    return items;
    return this.photoStore;
  }
}

const dataService = new DataService();
export default dataService;
