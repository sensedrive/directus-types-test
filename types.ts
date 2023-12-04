export interface Product {

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: uuid
   */
   id: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: character varying
   */
   status: 'published' | 'archived' | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: character varying
   */
   title: string;
}

export type Collections = {
  products: Product[];
}

