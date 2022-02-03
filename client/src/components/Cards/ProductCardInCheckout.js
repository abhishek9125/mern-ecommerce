import React from 'react';

function ProductCardInCheckout({ product }) {
    return (
        <tbody>
            <tr>
                <td>Image</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.brand}</td>
                <td>{product.color}</td>
                <td>{product.count}</td>
                <td>Shipping</td>
                <td>Remove</td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout;
