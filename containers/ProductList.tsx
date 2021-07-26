import React, { forwardRef, useEffect } from 'react'
import cn from 'classnames'
import { useForm, ChangeHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Product } from '../data/types'
import { ProductDetail } from 'components'

interface ActionRadioButtonProps {
  label: React.ReactNode
  name: string
  value: string | undefined
  onChange: ChangeHandler
  onBlur: ChangeHandler
  selected: string
}

export const ActionRadioButton = forwardRef<
  HTMLInputElement,
  ActionRadioButtonProps
>(({ name, label, onChange, onBlur, value, selected }, ref) => {
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
            : 'hover:text-primary hover:underline'
        )}
        htmlFor={value}
      >
        {label}
      </label>
    </>
  )
})

const ProductListActions: React.FC = () => {
  const { register, watch, setValue } = useForm()
  const router = useRouter()

  const { sort: querySort } = router.query
  const sort: string = watch('sort')

  useEffect(() => {
    setValue('sort', querySort)
  }, [querySort, router, setValue])

  useEffect(() => {
    if (sort && querySort !== sort) {
      sort === 'top'
        ? delete router.query.sort &&
          router.push({ pathname: '/', query: router.query })
        : router.push({ pathname: '/', query: { ...router.query, sort } })
    }
  }, [sort, router, querySort])

  return (
    <div className="flex py-2 border-b-2 border-t-2 w-full px-4">
      <span className="font-semibold">Seřadit:</span>
      <form className="space-x-4">
        <ActionRadioButton
          value="top"
          label="Od nejoblíbenějších"
          {...register('sort')}
          selected={sort}
        />
        <ActionRadioButton
          value="pasc"
          label="Od nejlevnějších"
          {...register('sort')}
          selected={sort}
        />
        <ActionRadioButton
          value="pdesc"
          label="Od nejdražších"
          {...register('sort')}
          selected={sort}
        />
      </form>
    </div>
  )
}

interface ProductListProps {
  products: Product[]
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <section className="flex-grow flex-col justify-center flex items-center mx-10">
      <h1 className="text-22 font-semibold self-start mb-4">
        Mobilní telefony
      </h1>
      <ProductListActions />
      {products.length ? (
        products.map((product) => (
          <ProductDetail key={product.id} product={product} />
        ))
      ) : (
        <span className="text-16 font-semibold">
          Vašemu dotazu neodpovídají žádné výsledky.
        </span>
      )}
    </section>
  )
}
