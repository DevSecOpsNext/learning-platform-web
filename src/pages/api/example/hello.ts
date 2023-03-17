import type { NextApiRequest, NextApiResponse } from 'next'
import database from '../../../lib/database/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    const db = await database("example");
    const { title, content } = req.body;

    const post = await db.collection("hello").insertOne({ title, content, });

    res.status(200).json(post)

  } catch (e) {
    console.error(e);
    res.status(400).json(e)
  }
};