export default async (req, context) => {
  const url = new URL(req.url);
  const method = req.method;
  const store = context.blobs;

  // CORS headers – allow your site to call this function
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight OPTIONS request
  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    // ---- GET: fetch all features ----
    if (method === 'GET') {
      const features = (await store.get('features', { type: 'json' })) || [];
      return new Response(JSON.stringify(features), {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    // ---- POST: submit new feature or vote ----
    if (method === 'POST') {
      const body = await req.json();
      const { action, id, title } = body;
      const features = (await store.get('features', { type: 'json' })) || [];

      if (action === 'submit') {
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
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  }
};

// REMOVE the config block entirely
// export const config = {
//   path: '/api/features',
// };