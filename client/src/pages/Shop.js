import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import { getProductsByCount, fetchProductsByFilter  } from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import ProductCard from '../components/Cards/ProductCard';
import LoadingCard from '../components/Cards/LoadingCard';
import Star from '../components/Forms/Star';

const { SubMenu, ItemGroup } = Menu;

function Shop() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [subs, setSubs] = useState([]);
    const [brands, setBrands] = useState(['Apple', 'Sony', 'Lenovo', 'Microsoft', 'Samsung', 'Asus']);
    const [brand, setBrand] = useState('');
    const [colors, setColors] = useState(['Black', 'Brown', 'Silver', 'White', 'Blue']);
    const [color, setColor] = useState('');
    const [sub, setSub] = useState('');
    const [star, setStar] = useState('');

    let dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
        getCategories().then((response) => setCategories(response.data));
        getSubs().then((response) => setSubs(response.data));
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
        setCategoryIds([]);
        setPrice(value);
        setStar("");
        setSub('');
        setBrand('');
        setColor('');
        setTimeout(() => {
            setOk(!ok);
        }, 300)
    }

    const showCategories = () => {
        return (
            categories.map((cat) => 
                <div key={cat._id}>
                    <Checkbox 
                        name="category" 
                        value={cat._id} 
                        checked={categoryIds.includes(cat._id)}
                        className="pb-2 pl-4 pr-4" 
                        onChange={handleCategoryCheck}
                    >
                        {cat.name}
                    </Checkbox>
                </div>
            )
        )
    }

    const handleCategoryCheck = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setStar("");
        setSub('');
        setBrand('');
        setColor('');
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInState = inTheState.indexOf(justChecked);

        if(foundInState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundInState, 1);
        }
        setCategoryIds(inTheState);
        fetchProducts({ category: inTheState });
    }

    const showStars = () => {
        return (
            <div className="pl-4 pr-4 pb-2">
                <Star starClick={handleStarClick} numberOfStars={5} />
                <Star starClick={handleStarClick} numberOfStars={4} />
                <Star starClick={handleStarClick} numberOfStars={3} />
                <Star starClick={handleStarClick} numberOfStars={2} />
                <Star starClick={handleStarClick} numberOfStars={1} />
            </div>
        )
    }

    const handleStarClick = (num) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar(num);
        setSub('');
        setBrand('');
        setColor('');
        fetchProducts({ stars: num });
    }

    const showSubs = () => {
        return (
            subs.map((s) => {
                return (
                    <div key={s._id} style={{ cursor: 'pointer' }} onClick={() => handleSubClick(s)} className="p-1 m-1 badge badge-secondary">
                        {s.name}
                    </div>
                )
            })
        )
    }

    const handleSubClick = (s) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor('');
        setSub(s);
        fetchProducts({ sub: s });
    }

    const showBrands = () => {
        return (
            brands.map((b) => {
                return (
                    <Radio
                        name={b}
                        value={b}
                        checked={b == brand}
                        onChange={handleBrand}
                        className="pb-1 pl-4 pr-4"
                        style={{ display: 'flex' }}
                    >
                        {b}
                    </Radio>
                )
            })
        )
    }

    const handleBrand = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setSub('');
        setColor('');
        setBrand(e.target.value);
        fetchProducts({ brand: e.target.value });
    }

    const showColors = () => {
        return (
            colors.map((c) => {
                return (
                    <Radio
                        name={c}
                        value={c}
                        checked={c == color}
                        onChange={handleColor}
                        className="pb-1 pl-4 pr-4"
                        style={{ display: 'flex' }}
                    >
                        {c}
                    </Radio>
                )
            })
        )
    }

    const handleColor = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setSub('');
        setBrand('');
        setColor(e.target.value)
        fetchProducts({ color: e.target.value });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>Search / Filter</h4>
                    <hr />
                    <Menu defaultOpenKeys={["1","2","3","4","5","6","7"]} mode="inline">
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

                        <SubMenu key="2" title={<span className="h6"><DownSquareOutlined />{" "}Categories</span>}>
                            <div style={{ marginTop: '4px' }}>
                                {showCategories()}
                            </div>
                        </SubMenu>

                        <SubMenu key="3" title={<span className="h6"><StarOutlined />{" "}Rating</span>}>
                            <div style={{ marginTop: '4px' }}>
                                {showStars()}
                            </div>
                        </SubMenu>

                        <SubMenu key="4" title={<span className="h6"><DownSquareOutlined />{" "}Sub Categories</span>}>
                            <div style={{ marginTop: '4px' }} className="pl-4 pr-4">
                                {showSubs()}
                            </div>
                        </SubMenu>

                        <SubMenu key="5" title={<span className="h6"><DownSquareOutlined />{" "}Brands</span>}>
                            <div style={{ marginTop: '4px' }} className="pr-4">
                                {showBrands()}
                            </div>
                        </SubMenu>

                        <SubMenu key="6" title={<span className="h6"><DownSquareOutlined />{" "}Colors</span>}>
                            <div style={{ marginTop: '4px' }} className="pr-4">
                                {showColors()}
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
