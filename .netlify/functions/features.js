// netlify/functions/features.js
import { getStore } from '@netlify/blobs';

// Helper to get the features store
const getFeaturesStore = () => {
  return getStore('features');
};

export default async (req, context) => {
  const store = await getFeaturesStore();
  const url = new URL(req.url);
  const method = req.method;

  // CORS headers (so your frontend can call this)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight
  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // GET: return all features
  if (method === 'GET') {
    try {
      const data = await store.get('features');
      const features = data ? JSON.parse(data) : [];
      return new Response(JSON.stringify(features), {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Failed to fetch features' }), {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }
  }

  // POST: submit new feature or vote
  if (method === 'POST') {
    try {
      const body = await req.json();
      const { action, id, title } = body;

      // Get current data
      const raw = await store.get('features');
      let features = raw ? JSON.parse(raw) : [];

      if (action === 'submit') {
        // Add new feature
        const newFeature = {
          id: Date.now().toString(),
          title: title.trim(),
          score: 1,
          created: new Date().toISOString(),
        };
        features.push(newFeature);
        await store.set('features', JSON.stringify(features));
        return new Response(JSON.stringify(newFeature), {
          status: 201,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      if (action === 'vote') {
        // Find and increment score
        const feature = features.find(f => f.id === id);
        if (!feature) {
          return new Response(JSON.stringify({ error: 'Feature not found' }), {
            status: 404,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }
        feature.score += 1;
        await store.set('features', JSON.stringify(features));
        return new Response(JSON.stringify(feature), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Failed to process request' }), {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
};

export const config = {
  path: '/api/features',
};