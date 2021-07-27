import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'classnames'
import qs from 'qs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faDollarSign,
  faArrowDown,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons'

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
    <section className="py-3 border-b border-t-0 sm:border-b-2 sm:border-t-2 w-full px-0 sm:px-4">
      <span className="sm:text-14 text-16 font-semibold mr-2">Seřadit:</span>

      <SortLink
        href={`/?${query}sort=top`}
        selected={querySort === 'top' || !querySort}
      >
        <span className="sm:inline hidden"> Od nejoblíbenějších</span>
        <FontAwesomeIcon className="sm:hidden inline" icon={faHeart} />
      </SortLink>

      <SortLink href={`/?${query}sort=pasc`} selected={querySort === 'pasc'}>
        <span className="sm:inline hidden">Od nejlevnějších</span>
        <FontAwesomeIcon className="sm:hidden inline" icon={faDollarSign} />
        <FontAwesomeIcon className="sm:hidden inline" icon={faArrowUp} />
      </SortLink>

      <SortLink href={`/?${query}sort=pdesc`} selected={querySort === 'pdesc'}>
        <span className="sm:inline hidden"> Od nejdražších</span>
        <FontAwesomeIcon className="sm:hidden inline" icon={faDollarSign} />
        <FontAwesomeIcon className="sm:hidden inline" icon={faArrowDown} />
      </SortLink>
    </section>
  )
}
