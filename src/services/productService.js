const API_BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  if (response.status === 204) {
    return null; // No content to parse
  }
  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || 'Something went wrong');
    } catch (e) {
      throw new Error(errorText || 'Something went wrong');
    }
  }
  return response.json();
};

const buildQueryString = (params) => {
  if (!params) return '';
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return query ? `?${query}` : '';
};

export const productService = {
  getAllProducts:  async (params) => {
    try {
      const queryString = buildQueryString(params);
      const response = await fetch(`${API_BASE_URL}/products/${queryString}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      return null;
    }
  },

  createProduct: async (productData) => {
    try {
      // Agregar imagen automáticamente si no la tiene
      const dataWithImage = {
        ...productData,
        image: productData.image || getClothingImage(productData.category || 'clothing'),
      };
      
      const response = await fetch(`${API_BASE_URL}/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithImage),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      // Agregar imagen automáticamente si no la tiene
      const dataWithImage = {
        ...productData,
        image: productData.image || getClothingImage(productData.category || 'clothing'),
      };
      
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithImage),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  getCategoryById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error fetching category with id ${id}:`, error);
      return null;
    }
  },

  getProductsByCategory: async (categoryId) => {
    console.log("ID:", categoryId);
    const products = await productService.getAllProducts();
    console.log("Products:", products);
    return products.filter(p => p.category_id == categoryId);
  },

  getNewArrivals: async (limit = 8) => {
    return productService.getAllProducts({ sort: 'newest', limit });
  },

  getOnSale: async (limit = 8) => {
    return productService.getAllProducts({ on_sale: true, limit });
  },

  searchProducts: async (query) => {
    return productService.getAllProducts({ search: query });
  },

  getReviewsByProduct: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/by_product/${productId}`);
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error fetching reviews for product ${productId}: `, error);
      return [];
    }
  },

  addReview: async (reviewData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }
};