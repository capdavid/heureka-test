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
  const { sort, page, ...filter } = query

  let products = mockData.products
  const filterExists = Object.keys(filter).every((filter) =>
    Object.keys(filters).includes(filter)
  )

  if (!isEmpty(filter) && filterExists) {
    if ('brand' in filter) {
      const brandFilters = filter.brand.split(',')

      products = products.filter((prod) =>
        brandFilters.some((f) => f === prod.tags.brand[0].value)
      )
    }

    if ('os' in filter) {
      const osFilters = filter.os.split(',')

      products = products?.filter((prod) => {
        const osAttribute = prod.attributes.find(
          (attr) => attr.description === 'Operační systém'
        )

        return osFilters.some((f) => f === osAttribute?.text)
      })
    }
  }

  if (sort === 'pdesc' || sort === 'pasc') {
    products.sort((a, b) =>
      sort === 'pasc' ? a.price - b.price : b.price - a.price
    )
  }

  const data = {
    products,
    filters,
  }

  return res.status(200).json(data)
}
