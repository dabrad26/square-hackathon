export interface MenuItemVariant {
  id: string
  name: string
  ordinal: number
  pricing_type: 'FIXED_PRICING' | 'VARIABLE_PRICING'
  price?: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  is_taxable: boolean
  category_id?: string
  basePrice: number
  image: string
  variations: MenuItemVariant[]
}

export interface CategoryItem {
  id: string
  name: string
}
