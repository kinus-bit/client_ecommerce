import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        'Content-Type':'application/json',
    },
});

// Add a request interceptor to include the token(ensure token is included for every request)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
API.interceptors.response.use(
  (response) =>{
    // Return the data directly so you don't need to use .data everywhere(******)
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const getHealth = () => API.get('/health');

// Auth API methods
export const register = (userData) => API.post('/auth/register', userData);
export const verifyEmail = (token) => API.get(`/auth/verify-email/${token}`);
export const resendVerificationEmail = (email) => API.post('/auth/resend-verification', { email });
export const login = (credentials) => API.post('/auth/login', credentials);
export const forgotPassword = (email) => API.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) => API.post(`/auth/reset-password/${token}`, { password });
export const changePassword = (passwords) => API.put('/auth/change-password', passwords);
export const getMe = () => API.get('/auth/me');
export const updateProfile = (profileData) => API.put('/auth/profile', profileData);
export const logout = () => API.get('/auth/logout');

//user routes

//category
export const createcategory = (name) => API.post('/products/category', name);
export const getallcategories = () => API.get('/products/category');

//subcategory
export const createsubcategory = (subcategoryData) => API.post('products/subcategory', subcategoryData);
export const getallsubcategories = () => API.get('/products/subcategory');

//admin routes
export const getallusers = () => API.get('/admin/users');

//Upload API methods
export const uploadProfilePicture = (file) => {
    //file should already be FormData
    return API.post('/upload/profile-picture',file,{
        headers:{
            'Content-Type':'multipart/form-data',
        },
    });
};

export const deleteProfilePicture = (type, filename) => API.delete(`/upload/${type}/${filename}`);


// Product APIs
export const getAllProducts = () => API.get('/products');
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post('/products', data);
export const createProductWithImages = (formData) => {
  return API.post('/products/with-images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProductStock = (id, stock) => API.patch(`/products/${id}/stock`, { stock });

// Upload APIs
export const uploadSingleImage = (formData) => API.post('/upload/product-image', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const uploadMultipleImages = (formData) => API.post('/upload/product-images', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

//cart APis
export const addtocart = (productData) => API.post('/cart/add', productData);// product details
export const getmycart = () => API.get('/cart/');
export const removefromcart = (id) => API.delete(`/cart/remove/${id}`);

//order APIs
export const createorder = (orderdata) => API.post('/order/', orderdata);//shipment,contact
export const getmyorders = () => API.get('/order/my-orders');
export const getallorders = () => API.get('/order/');
export const getallorderbyuserId = (id) => API.get(`/order/user/${id}`);


export default API;
