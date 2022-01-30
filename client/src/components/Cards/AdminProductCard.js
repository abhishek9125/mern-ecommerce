import React from 'react';
import { Card } from 'antd';
import laptop from '../../images/laptop.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

function AdminProductCard({ product }) {

    const { title, description, images } = product;

    return (
        <Card
            cover={
                <img 
                    src={images && images.length ? images[0].url : laptop}
                    style={{ height: '150px', objectFit: 'cover' }}
                    className="p-1"
                />
            }
            actions={[ 
                <EditOutlined className="text-warning" />, 
                <DeleteOutlined className="text-danger" /> 
            ]}
            className="mb-2"
        >
            <Meta title={title} description={`${description && description.substring(0, 30)}...`} />
        </Card>
    )
}

export default AdminProductCard;