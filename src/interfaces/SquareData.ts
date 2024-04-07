export interface MenuItemVariant {
  id: string
  name: string
  ordinal: number
  pricing_type: 'FIXED_PRICING' | 'VARIABLE_PRICING'
  price?: number
}

export interface MenuItem {
  id: string
  name: string
  description: string
  is_taxable: boolean
  variations: MenuItemVariant[]
}
