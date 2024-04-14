/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable spellcheck/spell-checker */
import axios, { type AxiosRequestConfig } from 'axios';
import { type CategoryItem, type MenuItem } from '../interfaces/SquareData';
import type PhotoItem from '../interfaces/Photo';
import type ReviewItem from '../interfaces/Review';
import { type CartItem } from '../interfaces/CartItem';

export class DataService {
  /** API Server */
  private apiServer = 'https://unrealpixels.app/api';
  /** All items for sale */
  private menuItemsStore: MenuItem[] = [];
  /** All categories */
  private categoriesStore: CategoryItem[] = [];
  /** All reviews */
  private reviewItemsStore: ReviewItem[] = [];
  /** All cart items */
  private cartItemsStore: CartItem[] = [];
  /** Cart local storage key */
  private cartStorageKey = 'photo-wall-cart-items';

  private parsePrice(price: any): number {
    const testNumber = Number(price);

    if (isNaN(testNumber)) {
      price = 0;
    }

    return testNumber / 100;
  }

  saveCartToStorage(): void {
    try {
      const stringCart = JSON.stringify(this.cartItemsStore);
      localStorage.setItem(this.cartStorageKey, stringCart);
    } catch (error) {
      console.error('DataService: unable to save cart to storage', error);
    }
  }

  displayPrice(price: any): string {
    const testNumber = Number(price);

    if (isNaN(testNumber)) {
      price = 0;
    }

    return testNumber.toFixed(2);
  }

  get businessInfo(): { name: string, address: string, city: string, state: string, zipCode: string, phone: string } {
    return {
      name: "Maya's Taqueria",
      address: '1455 Market St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      phone: '415-555-0199',
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
    try {
      const stringCart = localStorage.getItem(this.cartStorageKey);

      if (stringCart) {
        this.cartItemsStore = JSON.parse(stringCart);
      }
    } catch (error) {
      console.error('DataService: unable to parse cart from storage', error);
    }

    const apiCalls = [
      axios.get(`${this.apiServer}/photo-wall/menu.php`, this.apiCallConfig).then(response => {
        const imageMap = new Map<string, string>();
        (response.data.data.objects || []).filter((item: any) => item.type === 'IMAGE').forEach((item: any) => {
          imageMap.set(item.id as string, item.image_data?.url as string);
        });

        this.categoriesStore = (response.data.data.objects || []).filter((item: any) => item.type === 'CATEGORY' && !!item.category_data).map((item: any) => {
          return {
            id: item.id,
            name: item.category_data?.name,
          };
        });
        this.menuItemsStore = (response.data.data.objects || []).filter((item: any) => item.type === 'ITEM' && !!item.item_data).map((item: any) => {
          const category = Array.isArray(item.item_data?.categories) ? item.item_data?.categories[0] : undefined;
          const firstVariant = (item.item_data?.variations || [])[0];

          return {
            id: item.id,
            name: item.item_data?.name,
            description: item.item_data?.description,
            is_taxable: !!item.item_data?.is_taxable,
            category_id: category?.id,
            image: Array.isArray(item.item_data?.image_ids) ? imageMap.get(item.item_data?.image_ids[0] as string) : '',
            basePrice: this.parsePrice(firstVariant?.item_variation_data?.price_money?.amount || 0),
            variations: (item.item_data?.variations || []).filter((variant: any) => !!variant.item_variation_data).map((variant: any) => {
              return {
                id: variant.id,
                name: variant.item_variation_data?.name,
                ordinal: variant.item_variation_data?.ordinal,
                pricing_type: variant.item_variation_data?.pricing_type,
                price: this.parsePrice(variant.item_variation_data?.price_money?.amount || 0),
              };
            }),
          };
        });

        return response;
      }),
      axios.get(`${this.apiServer}/photo-wall/reviews.php`, this.apiCallConfig).then(response => {
        this.reviewItemsStore = response.data.data;

        this.reviewItemsStore.forEach(item => {
          item.photos.forEach(photo => {
            photo.url = `${this.apiServer}/photo-wall/${photo.url}`;
          });
        });

        return response;
      }),
    ];

    return await Promise.all(apiCalls);
  }

  async saveReview(data: ReviewItem): Promise<ReviewItem> {
    return await axios.post(`${this.apiServer}/photo-wall/reviews.php`, data, this.apiCallConfig).then(response => {
      const newItem = response.data.data as ReviewItem;

      newItem.photos.forEach(photo => {
        photo.url = `${this.apiServer}/photo-wall/${photo.url}`;
      });

      this.reviewItemsStore.unshift(newItem);

      return newItem;
    });
  }

  async getReceiptMenuItems(id: string): Promise<MenuItem[]> {
    return await axios.get(`${this.apiServer}/photo-wall/receipt.php?id=${id}`, this.apiCallConfig).then(response => {
      const receiptMenuItems: MenuItem[] = (response.data.data.order.line_items || []).map((item: any) => {
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

  getReviewById(id: string): ReviewItem | undefined {
    return this.reviewItemsStore.find(item => item.id === id);
  }

  findMatchingMenuItem(menuItemName: string): MenuItem | undefined {
    return this.menuItemsStore.find(item => item.name === menuItemName);
  }

  get menuItems(): MenuItem[] {
    return this.menuItemsStore;
  }

  get categoryItems(): CategoryItem[] {
    return this.categoriesStore;
  }

  get cartItems(): CartItem[] {
    return this.cartItemsStore;
  }

  get cartTotalItems(): number {
    return this.cartItemsStore.reduce((value, current) => value + current.quantity, 0);
  }

  addCartItem(item: CartItem): void {
    this.cartItemsStore.push(item);
    this.saveCartToStorage();
  }

  removeCartItem(item: CartItem): void {
    const foundIndex = this.cartItemsStore.findIndex(cartItem => cartItem.id === item.id);

    if (foundIndex !== -1) {
      this.cartItemsStore.splice(foundIndex, 1);
    }

    this.saveCartToStorage();
  }

  updateCartItem(item: CartItem): void {
    const foundIndex = this.cartItemsStore.findIndex(cartItem => cartItem.id === item.id);

    if (foundIndex !== -1) {
      this.cartItemsStore[foundIndex] = item;
    }

    this.saveCartToStorage();
  }

  getPhotos(name?: string): PhotoItem[] {
    const items: PhotoItem[] = [];

    this.reviewItemsStore.forEach(item => {
      item.photos.forEach(photo => {
        photo.review_id = item.id;

        if (name) {
          if (!photo.foods.includes(name)) {
            return;
          }
        }

        items.push(photo);
      });
    });

    return items;
  }
}

const dataService = new DataService();
export default dataService;
