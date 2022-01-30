import React from 'react';
import { Card, Skeleton } from 'antd';

function LoadingCard() {
    return (
        <Card>
            <Skeleton active />            
        </Card>
    )
}

export default LoadingCard;
