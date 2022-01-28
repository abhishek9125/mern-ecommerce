import React, { useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, LogoutOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
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
                    <Item key="setting1">
                        Option 1
                    </Item>
                    <Item key="setting2">
                        Option 2
                    </Item>
                    <Item icon={ <LogoutOutlined /> } onClick={logout}>
                        Logout
                    </Item>
                </SubMenu>
            }



        </Menu>
    )
}

export default Header;
