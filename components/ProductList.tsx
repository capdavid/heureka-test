import React from 'react'

import { Product } from '../data/types'
import { ProductDetail } from 'components'

interface ProductListProps {
  products: Product[]
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <section>
    {products.map((product) => (
      <ProductDetail key={product.id} product={product} />
    ))}
  </section>
)
