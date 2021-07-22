import type { NextApiRequest, NextApiResponse } from 'next'
import mockData from 'data/mockData.json'
import { Data } from 'data/types'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(mockData)
}
