import React, { useState, useEffect } from 'react';
import Jumbotron from '../components/Cards/Jumbotron';
import BestSellers from '../components/Home/BestSellers';
import NewArrivals from '../components/Home/NewArrivals';

function Home() {

    return (
        <>
            <div className="jumbotron text-center font-weight-bold text-danger h1">
                <Jumbotron 
                    text={['Latest Products', 'Best Sellers', 'New Arrivals']}
                />
            </div>
            <NewArrivals />
            <BestSellers />
            <br />
            <br />
        </>
    )
}

export default Home;
