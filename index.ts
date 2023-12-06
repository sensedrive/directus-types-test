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
async function getProducts() {
  const response: {
    id: string;
    title: string;
    product_category: string | null;
  }[] = await client.request(
    readItems('products', {
      fields: ['id', 'title', {
        product_category: ['id']
      }],
      filter: {
        _and: [{ status: { _eq: 'published' } }]
      }
    })
  );

  return response;
}

// Request to retrieve items from the 'products' collection with specific fields (id, title)
// This includes a filter to only get items with the status 'published'
// Unfortunatly, fields id and title are not resolved in this case
async function getProducts2() {
  const response: {
    id: string;
    title: string;
    product_category: string | null;
  }[] = await client.request(
    readItems('products', {
      fields: ['id', 'title', {
        product_category: ['id']
      }],
      filter: {
        status: { _eq: 'published' }
      }
    })
  );

  return response;
}

type GetProducts = Awaited<ReturnType<typeof getProducts>>

type GetProducts2 = Awaited<ReturnType<typeof getProducts2>>[number]

const products = await getProducts();
const products2 = await getProducts2();

const products3 = [...products2, ...products];