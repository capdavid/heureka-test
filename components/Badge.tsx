import React from 'react'

export const Badge: React.FC = ({ children }) => (
  <span className="rounded-full bg-badge py-1 px-2 text-white text-12 self-start">
    {children}
  </span>
)
