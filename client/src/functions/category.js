import axios from 'axios';

export const createCategory = async (category, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/category`, category, {
        headers: { authToken }
    });
}

export const getCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/categories`);
}

export const getCategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
}

export const updateCategory = async (slug, category, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
        headers: { authToken }
    });
}

export const removeCategory = async (slug, authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers: { authToken }
    });
}



