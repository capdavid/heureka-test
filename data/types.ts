export interface Data {
  products: Product[]
  filters: Record<string, string[]>
  pageInfo: PageInfo
}

export interface PageInfo {
  currentPage: number
  pages: number[]
  totalCount: number
}
export interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  description: string
  attributes: Attribute[]
  tags: Tags
  shopsCount: number
  url: string
  rating: number
  topBadge: number
}

export interface Attribute {
  text: string
  description: string
}

export interface Tags {
  os: Brand[]
  hdd: Brand[]
  brand: Brand[]
}

export interface Brand {
  id: number
  value: string
}
