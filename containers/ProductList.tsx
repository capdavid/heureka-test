import React from 'react'
import useSWR from 'swr'
import { Data } from '../data/types'
import { ProductDetail } from 'components'

interface ProductListProps {}

export const ProductList: React.FC<ProductListProps> = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR<Data>('/api/data', fetcher)
  return (
    <section>
      {data?.products.map((product) => (
        <ProductDetail key={product.id} product={product} />
      ))}
    </section>
  )
}
