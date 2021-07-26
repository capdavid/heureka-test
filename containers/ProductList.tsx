import React from 'react'
import { Product } from '../data/types'
import { ProductDetail } from 'components'

interface ProductListProps {
  products: Product[]
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <section className="flex-grow flex-col justify-center flex items-center mx-10">
      <h1 className="text-22 font-semibold self-start mb-2">
        Mobilní telefony
      </h1>
      {products.length ? (
        products.map((product) => (
          <ProductDetail key={product.id} product={product} />
        ))
      ) : (
        <span className="text-16 font-semibold">
          Vašemu dotazu neodpovídají žádné výsledky.
        </span>
      )}
    </section>
  )
}
