interface ProductCategory {
  id: string;
  title: string;
}

export interface Product {
   id: string;
   title: string;
   product_category: ProductCategory | null | string;
   status: 'published' | 'archived' | null;
}

export type Collections = {
  products: Product[];
}

