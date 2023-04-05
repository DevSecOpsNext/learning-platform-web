import database from '../../../lib/database/mongodb'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req, res) {
    const { id } = req.query;
    try {
      const db = await database("learningplatform_db");
      const collection = db.collection('stack');
      const myid = id;
      const query = { _id: myid };
      const stack = await collection.findOne(query);
      console.log(stack);
      res.json(stack);

    } catch (e) {
      console.error(e)
      res.status(500).json({ status: 'Not Connected' })    
    }
  }