// Import necessary functions and types from the Directus SDK
import {
  createDirectus,
  readItems,
  rest,
  staticToken,
} from '@directus/sdk';
import { Collections } from './types'; // Import Collections type from local types file

// Create a Directus client instance configured for a specific environment
const client = createDirectus<Collections>('http://localhost:8055')
                  .with(rest())
                  .with(staticToken('123456'));

// Request to retrieve items from the 'products' collection with specific fields (id, title)
// This is without any filters applied
const responseResolvedFields = await client.request(
  readItems('products', { fields: ['id', 'title'] })
);

// Request to retrieve items from the 'products' collection with specific fields (id, title)
// This includes a filter to only get items with the status 'published'
// Unfortunatly, fields id and title are not resolved in this case
const responseNonResolvedFields = await client.request(
  readItems('products', {
    fields: ['id', 'title'],
    filter: {
      _and: [{ status: { _eq: 'published' } }]
    }
  })
);
