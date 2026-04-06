import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        'Content-Type':'application/json',
    },
});

// API methods
export const getHealth = () => API.get('/health');
// export const getUser = () => API.get('/items');
// export const loginUser = (id) => API.get(`/items/${id}`);
// export const createItem = (user) => API.post('/items', item);
// export const updateUser = (id, item) => API.put(`/items/${id}`, item);
// export const deleteUser = (id) => API.delete(`/items/${id}`);

export default API;


