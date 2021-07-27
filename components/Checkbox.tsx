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
      <a>
        <label
          htmlFor={name}
          className={cn('my-1', capitalize && 'capitalize')}
        >
          <input
            className="mr-2 w-5 h-5 align-middle"
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
