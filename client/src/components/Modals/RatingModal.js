import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons'; 

function RatingModal({ children }) {

    const [modalVisible, setModalVisible] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    return (
        <>
            <div onClick={() => setModalVisible(true)}>
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
