import React from 'react'
import cn from 'classnames'
import styles from './ProductDescription.module.css'

export const ProductDescription: React.FC = ({ children }) => {
  return <span className={cn('text-14', styles['line-clamp'])}>{children}</span>
}
