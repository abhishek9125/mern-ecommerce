import React from 'react';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.png';


function SideDrawer() {

    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    const imageStyle = {
        height: '100px',
        width: '100%',
        objectFit: 'contain'
    };

    return (
        <Drawer 
            visible={drawer}
            title={`Cart / ${cart.length} Products`}
            className="text-center"
            onClose={() => {
                dispatch({
                    type: 'SET_VISIBLE',
                    payload: false
                });
            }}
        >
            {
                cart.map((product) => (
                    <div className="row" key={product._id}>
                        <div className="col">
                            {
                                product.images[0] ? 
                                <>
                                    <img src={product.images[0].url} style={imageStyle} /> 
                                    <p className="text-center text-light bg-secondary">{product.title} x {product.count}</p>
                                </> :
                                <>
                                    <img src={laptop} style={imageStyle} />
                                    <p className="text-center text-light bg-secondary">{product.title} x {product.count}</p>
                                </>

                            }
                        </div>
                    </div>
                ))
            }
            <Link to='/cart'>
                <button 
                    className="text-center btn btn-primary btn-raised btn-block"
                    onClick={() => {
                        dispatch({
                            type: 'SET_VISIBLE',
                            payload: false
                        });
                    }}
                >
                    Go To Cart
                </button>
            </Link>
        </Drawer>
    )
}

export default SideDrawer;
