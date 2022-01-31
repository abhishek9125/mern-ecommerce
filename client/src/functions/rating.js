import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (product) => {
    if(product && product.ratings) {
        let ratingsArray = product && product.ratings;
        let total = [];
        let length = ratingsArray.length;

        ratingsArray.map((rating) => {
            total.push(rating.star);
        })
        let totalReduced = total.reduce((p,n) => p + n, 0);
        let highest = length * 5;
        let result = (totalReduced * 5) / highest;
        return (
            <div className="text-center pt-1 pb-3">
                <StarRating 
                    rating={result} 
                    editing={false}
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="red"
                />{" "}({length})
            </div>
        )
    }
}