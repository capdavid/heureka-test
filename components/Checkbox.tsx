import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

interface CheckboxProps {
  type: string
  name: string
  capitalize?: boolean
  routerQuery: Record<string, string | string[] | undefined>
}

export const Checkbox: React.FC<CheckboxProps> = ({
  type,
  name,
  capitalize,
  routerQuery,
}) => {
  const { [type]: _, ...queryWithoutCategory } = routerQuery

  const categoryFilter =
    type in routerQuery ? (routerQuery[type] as string).split(',') : []

  const checked = categoryFilter.includes(name)

  const filter = checked
    ? categoryFilter.filter((el) => el !== name)
    : [...categoryFilter, name]

  const query = filter.length
    ? { ...routerQuery, [type]: filter.join(',') }
    : queryWithoutCategory

  return (
    <Link href={{ pathname: '/', query }} passHref>
      <a
        className={cn('sm:mx-0 sm:my-0 mx-1 my-1', capitalize && 'capitalize')}
        tabIndex={-1}
      >
        <label htmlFor={name} className="my-1">
          <input
            className="mr-1 sm:mr-2 w-5 h-5 align-middle"
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            readOnly
          />
        </label>
        {name}
      </a>
    </Link>
  )
}
