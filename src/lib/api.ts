import { roadmapData } from '../data/roadmapData';

/**
 * Fetch roadmaps
 * Uses local data directly (works in both dev and production builds)
 */
export async function fetchRoadmaps() {
  return roadmapData;
}

/**
 * Fetch a specific roadmap by ID
 */
export async function fetchRoadmapById(id: string) {
  const roadmap = roadmapData.find(r => r.id === id);
  if (!roadmap) throw new Error('Roadmap not found');
  return roadmap;
}
