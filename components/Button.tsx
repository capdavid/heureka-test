import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

interface ButtonProps {
  className?: string
  to: string
}

export const Button: React.FC<ButtonProps> = ({ className, children, to }) => (
  <Link href={to}>
    <a
      className={cn(
        'p-3 rounded text-14 font-semibold shadow-md hover:shadow-lg my-3',
        className
      )}
    >
      {children}
    </a>
  </Link>
)
