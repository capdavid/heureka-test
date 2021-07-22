import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge, Button, ProductDescription } from 'components'
import { Product } from 'data/types'

interface ProductDetailProps {
  product: Product
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const {
    imageUrl,
    topBadge,
    name,
    rating,
    description,
    attributes,
    price,
    shopsCount,
  } = product
  return (
    <article className="flex py-6 border-b last:border-0 items-center">
      <div className="flex-1 flex justify-center">
        <Image
          objectFit="cover"
          src={imageUrl}
          alt=""
          height={200}
          width={200}
        />
      </div>
      <div className="flex flex-col space-y-2 flex-2 overflow-hidden">
        {topBadge && <Badge>{`TOP ${topBadge}`}</Badge>}
        <Link href="#">
          <a className="text-16 font-medium underline hover:text-primary">
            {name}
          </a>
        </Link>
        <span className="text-primary text-14 font-semibold">{rating} %</span>
        <span className="font-semibold text-14">
          {attributes.map(
            (attr, i, arr) => attr.text + (i + 1 < arr.length ? ', ' : '')
          )}
        </span>
        <ProductDescription>{description}</ProductDescription>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex flex-col">
          <span className="font-semibold text-16">
            {price.toLocaleString('cs-CZ')} Kč
          </span>
          <span className="text-12 underline">v {shopsCount} obchodech</span>
          <Button to="#" className="bg-primary text-white">
            Porovnat ceny
          </Button>
        </div>
      </div>
    </article>
  )
}
