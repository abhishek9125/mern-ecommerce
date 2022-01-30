import axios from 'axios';

export const createProduct = async (product, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: { authToken }
    });
}

export const getProductsByCount = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
}

export const getProduct = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
}

export const getProducts = async (sort, order, limit) => {
    return await axios.post(`${process.env.REACT_APP_API}/products/`, { sort, order, limit });
}

export const updateProduct = async (slug, product, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
        headers: { authToken }
    });
}

export const removeProduct = async (slug, authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: { authToken }
    });
}
