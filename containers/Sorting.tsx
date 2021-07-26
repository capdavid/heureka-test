import React, { forwardRef, useEffect } from 'react'
import cn from 'classnames'
import { useForm, ChangeHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

interface SortButtonProps {
  label: React.ReactNode
  name: string
  value: string | undefined
  onChange: ChangeHandler
  onBlur: ChangeHandler
  selected: string
}

const SortButton = forwardRef<HTMLInputElement, SortButtonProps>(
  ({ name, label, onChange, onBlur, value, selected }, ref) => {
    selected
    return (
      <>
        <input
          className="hidden"
          type="radio"
          value={value}
          id={value}
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
        <label
          className={cn(
            selected === value || (selected === undefined && value === 'top')
              ? 'text-primary underline'
              : 'hover:text-primary hover:underline cursor-pointer'
          )}
          htmlFor={value}
        >
          {label}
        </label>
      </>
    )
  }
)

export const Sorting: React.FC = () => {
  const { register, watch, setValue } = useForm()
  const router = useRouter()

  const { sort: querySort, page, ...routerQuery } = router.query
  const sort: string = watch('sort')

  useEffect(() => {
    setValue('sort', querySort)
  }, [querySort, router, setValue])

  useEffect(() => {
    if (sort && querySort !== sort) {
      sort === 'top'
        ? delete router.query.sort &&
          router.push({ pathname: '/', query: routerQuery })
        : router.push({ pathname: '/', query: { ...routerQuery, sort } })
    }
  }, [sort, router, querySort, routerQuery])

  return (
    <section className="flex py-3 border-b-2 border-t-2 w-full px-4">
      <span className="font-semibold">Seřadit:</span>
      <form className="space-x-4">
        <SortButton
          value="top"
          label="Od nejoblíbenějších"
          {...register('sort')}
          selected={sort}
        />
        <SortButton
          value="pasc"
          label="Od nejlevnějších"
          {...register('sort')}
          selected={sort}
        />
        <SortButton
          value="pdesc"
          label="Od nejdražších"
          {...register('sort')}
          selected={sort}
        />
      </form>
    </section>
  )
}
