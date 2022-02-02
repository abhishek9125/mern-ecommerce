let initialState = []

if(typeof window != 'undefined') {
    let localCartData = localStorage.getItem('cart');
    if(localCartData) {
        initialState = JSON.parse(localCartData);
    }
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type) {

        case 'ADD_TO_CART' : 
            return action.payload;
        
        default : 
            return state;
    }
}