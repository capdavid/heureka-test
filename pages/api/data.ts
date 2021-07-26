import type { NextApiRequest, NextApiResponse } from 'next'
import mockData from 'data/mockData.json'
import { Data } from 'data/types'
import isEmpty from 'lodash/isEmpty'

const brands = new Set<string>()
const os = new Set<string>()

mockData.products.forEach((prod) => {
  const osAttribute = prod.attributes.find(
    (attr) => attr.description === 'Operační systém'
  )
  osAttribute && os.add(osAttribute.text)

  prod.tags.brand.forEach((b) => brands.add(b.value))
})

const filters = {
  brand: [...brands],
  os: [...os],
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query as Record<string, string>

  const filterExists = Object.keys(query).every((filter) =>
    Object.keys(filters).includes(filter)
  )

  let filteredProducts = mockData.products

  if (!isEmpty(query) && filterExists) {
    if ('brand' in query) {
      const brandFilters = query.brand.split(',')

      filteredProducts = filteredProducts.filter((prod) =>
        brandFilters.some((f) => f === prod.tags.brand[0].value)
      )
    }

    if ('os' in query) {
      const osFilters = query.os.split(',')

      filteredProducts = filteredProducts?.filter((prod) => {
        const osAttribute = prod.attributes.find(
          (attr) => attr.description === 'Operační systém'
        )

        return osFilters.some((f) => f === osAttribute?.text)
      })
    }
  }

  const data = {
    products: filteredProducts,
    filters,
  }
  res.status(200).json(data)
}
