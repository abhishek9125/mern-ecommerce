import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Slider } from 'antd';
import { getProductsByCount, fetchProductsByFilter  } from '../functions/product';
import { DollarOutlined } from '@ant-design/icons';
import ProductCard from '../components/Cards/ProductCard';
import LoadingCard from '../components/Cards/LoadingCard';

const { SubMenu, ItemGroup } = Menu;

function Shop() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);

    let dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
    },[])

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(12)
        .then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
    }

    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
        }, 300);
        return () => clearTimeout(delayed);
    },[text])

    const fetchProducts = (args) => {
        setLoading(true);
        fetchProductsByFilter(args).then((response) => {
            setProducts(response.data);
        });
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts({ price })
    },[ok])

    const handleSlider = (value) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        })
        setPrice(value);
        setTimeout(() => {
            setOk(!ok);
        }, 300)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>Search / Filter</h4>
                    <hr />
                    <Menu defaultOpenKeys={["1","2"]} mode="inline">
                        <SubMenu key="1" title={<span className="h6"><DollarOutlined />{" "}Price</span>}>
                            <div>
                                <Slider 
                                    range
                                    value={price}
                                    max="500000"
                                    className="ml-4 mr-4" 
                                    tipFormatter={(v) => `$${v}`}
                                    onChange={handleSlider} 
                                />
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9 pt-2">
                    <h4 className="text-danger">All Products</h4>
                    { products.length < 1 && <p>No Products Found</p> }
                    <div className="row">
                        {
                            products.map((product) => {
                                return (
                                    <div className="col-md-4 mt-3" key={product._id}>
                                        {
                                            loading ?
                                            <LoadingCard /> :
                                            <ProductCard product={product} />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;
