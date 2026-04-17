import type { VercelRequest, VercelResponse } from '@vercel/node';
import { roadmapData } from '../../src/data/roadmapData';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid ID parameter' });
    }
    
    const roadmap = roadmapData.find(r => r.id === id);
    
    if (roadmap) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
      res.status(200).json(roadmap);
    } else {
      res.status(404).json({ error: `Roadmap with ID "${id}" not found` });
    }
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
