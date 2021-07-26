import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Checkbox } from 'components'
import isEqual from 'lodash/isEqual'

interface FilterProps {
  filters: Record<string, string[]>
}

interface FilterCategoryProps {
  name: string
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ name, children }) => (
  <div className="border-b py-2">
    <h4 className="text-16 font-semibold">{name}</h4>
    <fieldset className="flex flex-col">{children}</fieldset>
  </div>
)

export const Filter: React.FC<FilterProps> = ({ filters }) => {
  const router = useRouter()
  const { register, watch, setValue } = useForm()
  const { brand, os } = filters
  const allFields = watch()

  const activeFilter = useMemo(() => {
    const obj: Record<string, string> = {}

    for (const el in filters) {
      const onlyActive = filters[el].filter((x) => allFields[x])
      if (onlyActive.length) {
        obj[el] = onlyActive.join(',')
      }
    }
    return obj
  }, [allFields, filters])

  // Apply filters from URL
  useEffect(() => {
    const query = router.query as Record<string, string>
    for (const el in query) {
      query[el]?.split(',').map((field) => setValue(field, true))
    }
  }, [router, setValue])

  // Set URL from filters
  useEffect(() => {
    !isEqual(router.query, activeFilter) &&
      router.push({ pathname: '/', query: activeFilter })
  }, [router, activeFilter])

  return (
    <aside className="min-w-200">
      <h3 className="text-18 font-semibold border-b">Filtrování</h3>
      <form>
        <FilterCategory name="Výrobce">
          {brand.map((brand) => (
            <Checkbox
              {...register(brand)}
              label={<span className="capitalize">{brand}</span>}
              key={brand}
            />
          ))}
        </FilterCategory>

        <FilterCategory name="Operační systém">
          {os.map((os) => (
            <Checkbox {...register(os)} label={os} key={os} />
          ))}
        </FilterCategory>
      </form>
    </aside>
  )
}
