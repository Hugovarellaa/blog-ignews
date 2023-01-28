import { NextApiRequest, NextApiResponse } from 'next'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  console.log('Chegou aqui no stripe')
  return response.status(200).json({ ok: true })
}
