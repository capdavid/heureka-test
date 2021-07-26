import type { NextApiRequest, NextApiResponse } from 'next'
import mockData from 'data/mockData.json'
import { Data, PageInfo } from 'data/types'
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

  // filters
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

  // sorting
  if (sort === 'pdesc' || sort === 'pasc') {
    products.sort((a, b) =>
      sort === 'pasc' ? a.price - b.price : b.price - a.price
    )
  }

  // pagination
  const pageLimit = 6
  const paginationPossible =
    +page > 0 && products.length - (+page - 1) * pageLimit > 0

  const pageInfo: PageInfo = {
    currentPage: paginationPossible ? +page : 1,
    pages: Array.from(
      { length: Math.ceil(products.length / pageLimit) },
      (_, i) => i + 1
    ),
    totalCount: products.length,
  }

  if (paginationPossible) {
    products = products.slice((+page - 1) * pageLimit, +page * pageLimit)
  } else {
    products = products.slice(0, 1 * pageLimit)
  }

  const data = {
    products,
    filters,
    pageInfo,
  }

  return res.status(200).json(data)
}
