import cn from 'classnames'
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PageInfo } from 'data/types'
import qs from 'qs'

interface PaginationProps {
  pageInfo: PageInfo
}

export const Pagination: React.FC<PaginationProps> = ({ pageInfo }) => {
  const { currentPage, pages } = pageInfo

  const router = useRouter()
  const { page, ...routerQuery } = router.query
  const query = routerQuery ? qs.stringify(routerQuery) + '&' : ''

  return (
    <section className="self-center">
      {pages.map((page) => (
        <Link key={page} href={`/?${query}page=${page}`}>
          <a
            className={cn(
              'px-2',
              currentPage === page
                ? 'text-black font-semibold cursor-default'
                : 'hover:underline text-primary'
            )}
          >
            {page}
          </a>
        </Link>
      ))}
    </section>
  )
}
