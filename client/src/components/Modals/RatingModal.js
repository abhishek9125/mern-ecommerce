import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons'; 
import { Navigate, useNavigate } from "react-router-dom";

function RatingModal({ children }) {

    const [modalVisible, setModalVisible] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();

    const handleModal = () => {
        if(user && user.token) {
            setModalVisible(true);
        } else {
            navigate('/login');
        }
    }

    return (
        <>
            <div onClick={handleModal}>
                <StarOutlined className="text-danger" /> <br />
                {user ? 'Leave Rating' : 'Login to Leave Rating'}
            </div>
            <Modal
                title="Leave your Rating"
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false);
                    toast.success('Thanks for your Review.');
                }}
                onCancel={() => setModalVisible(false)}
            >
                { children }
            </Modal>
        </>
    )
}

export default RatingModal;
