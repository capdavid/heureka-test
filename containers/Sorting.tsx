import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'classnames'
import qs from 'qs'

interface SortLinkProps {
  href: string
  selected: boolean
}

const SortLink: React.FC<SortLinkProps> = ({ children, href, selected }) => {
  return (
    <Link href={href}>
      <a
        className={cn(
          'text-14 mx-2',
          selected
            ? 'text-primary underline'
            : 'hover:text-primary hover:underline cursor-pointer'
        )}
      >
        {children}
      </a>
    </Link>
  )
}

export const Sorting: React.FC = () => {
  const router = useRouter()

  const { sort: querySort, page, ...routerQuery } = router.query
  const query = routerQuery ? qs.stringify(routerQuery) + '&' : ''

  return (
    <section className="flex py-2 border-b-2 border-t-2 w-full px-4 items-center">
      <span className="text-14 font-semibold mr-2">Seřadit:</span>

      <SortLink
        href={`/?${query}sort=top`}
        selected={querySort === 'top' || !querySort}
      >
        Od nejoblíbenějších
      </SortLink>

      <SortLink href={`/?${query}sort=pasc`} selected={querySort === 'pasc'}>
        Od nejlevnějších
      </SortLink>

      <SortLink href={`/?${query}sort=pdesc`} selected={querySort === 'pdesc'}>
        Od nejdražších
      </SortLink>
    </section>
  )
}
