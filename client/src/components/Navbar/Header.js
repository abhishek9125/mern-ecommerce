import React, { useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, LogoutOutlined, SettingOutlined, ShoppingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Search from '../Forms/Search';
const { SubMenu, Item } = Menu;

function Header() {

    const [current, setCurrent] = useState('home');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state}));

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    const logout = () => {
        signOut(auth);
        dispatch({
            type: 'LOGOUT',
            payload: null
        });
        navigate('/');
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={ <AppstoreOutlined /> } className="float-left">
                <Link to="/">
                    Home
                </Link>
            </Item>

            <Item key="shop" icon={ <ShoppingOutlined /> } className="float-left">
                <Link to="/shop">
                    Shop
                </Link>
            </Item>

            {
                !user &&
                <>
                    <Item key="register" icon={ <UserAddOutlined /> } className="float-right">
                        <Link to="/register">
                            Register
                        </Link>
                    </Item>
                    <Item key="login" icon={ <UserOutlined /> } className="float-right">
                        <Link to="/login">
                            Login
                        </Link>
                    </Item>

                </>
            }

            {
                user &&
                <SubMenu icon={ <SettingOutlined /> } title={user.email && user.email.split("@")[0]} key="username">
                    { user.role == 'admin' &&
                        <Item key="setting1">
                            <Link to="/admin/dashboard">
                                Admin Dashboard
                            </Link>
                        </Item>
                    }
                    <Item key="setting2">
                        <Link to="/user/history">
                            User Dashboard
                        </Link>
                    </Item>
                    <Item icon={ <LogoutOutlined /> } onClick={logout}>
                        Logout
                    </Item>
                </SubMenu>
            }

            <span className="float-right p-1">
                <Search />
            </span>
            
        </Menu>
    )
}

export default Header;
