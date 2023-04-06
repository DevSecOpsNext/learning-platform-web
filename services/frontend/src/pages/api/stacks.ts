import database from '../../lib/database/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 

{
    try {
    const { query } = req;
    const title = query.title;
    const db = await database("learningplatform_db");
    const collection = db.collection('stack');
    const searchQuery = title;
    const searchRegex = new RegExp(searchQuery, "i");
    const data = await collection.find({ title: { $regex: searchRegex} }).toArray();
    res.json(data);    
  } catch (e) {
    console.error(e)
    res.status(500).json({ status: 'Not Connected' })    
  }

}
