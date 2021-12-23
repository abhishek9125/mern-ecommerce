import React, { useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu, Item } = Menu;

function Header() {

    const [current, setCurrent] = useState('home');

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={ <AppstoreOutlined /> }>
                <Link to="/">
                    Home
                </Link>
            </Item>


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

            <SubMenu icon={ <SettingOutlined /> } title="Username">
                <Item key="setting1">
                    Option 1
                </Item>
                <Item key="setting2">
                    Option 2
                </Item>
            </SubMenu>


        </Menu>
    )
}

export default Header;
