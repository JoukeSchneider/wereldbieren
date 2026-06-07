import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = () => api.get('/products');
export const getProductById = (id: string) => api.get(`/products/${id}`);

// Reviews
export const getReviews = (beerId?: string) => {
  const params = beerId ? { beerId } : {};
  return api.get('/reviews', { params });
};
export const postReview = (data: {
  beerId: string;
  authorName: string;
  text: string;
  rating: number;
  language: string;
}) => api.post('/reviews', data);

// Blogs
export const getBlogs = () => api.get('/blogs');
export const getBlogById = (id: string) => api.get(`/blogs/${id}`);

export default api;
