async function getData() {
 
    const response = await fetch('https://fakestoreapi.com/products');
   
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    return  response.json();
  }
  //single 
  export const getSingleProduct = async (id: number) => {
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