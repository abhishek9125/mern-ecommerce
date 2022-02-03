import React from 'react';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.png';


function SideDrawer() {

    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    return (
        <Drawer visible={true}>
            Cart Drawer
        </Drawer>
    )
}

export default SideDrawer;
