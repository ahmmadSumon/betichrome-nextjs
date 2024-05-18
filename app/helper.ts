// Define your Product and Item interfaces
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}
export interface Item extends Product {
  size: string | null;
  quantity: number;
}

// Fetch data from the API using an environment variable for the URL
async function getData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('API URL is not defined in environment variables');
  }

  const response = await fetch(`${apiUrl}/products`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

// Fetch a single product by ID
export const getSingleProduct = async (id: number): Promise<Product> => {
  try {
    const items = await getData();

    // Ensure items is an array before using find
    if (!Array.isArray(items)) {
      throw new Error('Unexpected data format: items is not an array');
    }

    const singleItem = items.find((product: any) => product.id === id);

    if (!singleItem) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return singleItem;
  } catch (error) {
    console.error('Error fetching single product:', error);
    throw error;
  }
};
