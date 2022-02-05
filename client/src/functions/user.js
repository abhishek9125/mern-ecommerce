import axios from 'axios';

export const userCart = async (cart, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/cart `, { cart }, {
        headers: { authToken }
    });
}

export const getUserCart = async (authToken) => {
    return await axios.get(`${process.env.REACT_APP_API}/user/cart `, {
        headers: { authToken }
    });
}

export const emptyUserCart = async (authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/user/cart `, {
        headers: { authToken }
    });
}
