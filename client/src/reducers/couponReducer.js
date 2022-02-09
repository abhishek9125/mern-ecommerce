export const couponReducer = (state = { coupon: false }, action) => {
    switch(action.type) {
        case 'COUPON_APPLIED' : 
            return {...state, ...action.payload};
        
        default : 
            return state;
    }
}