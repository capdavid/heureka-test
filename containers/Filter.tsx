import React from 'react'
import { useRouter } from 'next/router'
import { Checkbox } from 'components'

interface FilterProps {
  filters: Record<string, string[]>
}

interface FilterCategoryProps {
  name: string
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ name, children }) => (
  <div className="border-b pt-2 pb-4">
    <h4 className="text-16 font-semibold">{name}</h4>
    <fieldset className="flex sm:flex-col flex-wrap">{children}</fieldset>
  </div>
)

export const Filter: React.FC<FilterProps> = ({ filters }) => {
  const { query } = useRouter()
  const { page, ...routerQuery } = query
  const { brand, os } = filters

  return (
    <aside className="w-full sm:w-auto min-w-150 lg:min-w-200">
      <h3 className="text-18 font-semibold border-b">Filtrování</h3>

      <FilterCategory name="Výrobce">
        {brand.map((brand) => (
          <Checkbox
            routerQuery={routerQuery}
            name={brand}
            key={brand}
            type="brand"
            capitalize
          />
        ))}
      </FilterCategory>

      <FilterCategory name="Operační systém">
        {os.map((os) => (
          <Checkbox routerQuery={routerQuery} name={os} key={os} type="os" />
        ))}
      </FilterCategory>
    </aside>
  )
}
