import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

function AdminProductCard({ product, handleRemoveProduct }) {

    const { title, description, images, slug } = product;

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
                <Link to={`/admin/product/${slug}`}>
                    <EditOutlined className="text-warning" /> 
                </Link>,
                <DeleteOutlined className="text-danger" onClick={() => handleRemoveProduct(slug)} /> 
            ]}
            className="mb-2"
        >
            <Meta title={title} description={`${description && description.substring(0, 30)}...`} />
        </Card>
    )
}

export default AdminProductCard;