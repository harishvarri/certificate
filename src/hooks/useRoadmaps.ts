import { useState, useEffect } from 'react';
import { Technology } from '../types/roadmap';
import { fetchRoadmaps } from '../lib/api';

export function useRoadmaps() {
  const [roadmaps, setRoadmaps] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getRoadmaps() {
      try {
        const data = await fetchRoadmaps();
        setRoadmaps(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    getRoadmaps();
  }, []);

  return { roadmaps, loading, error };
}
