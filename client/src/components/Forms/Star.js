import React from 'react';
import StarRating from 'react-star-ratings';

function Star({ starClick, numberOfStars }) {
    return (
        <>
            <StarRating 
                starSpacing="2px"
                starHoverColor="red"
                starEmptyColor="red"
                starDimension="20px"
                numberOfStars={numberOfStars}
                changeRating={() => starClick(numberOfStars)}
            />
            <br />
        </>
    )
}

export default Star;
