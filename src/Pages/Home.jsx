import React from 'react';
import Banner from '../Components/Banner';
import FeaturedFoods from '../Components/FeaturedFoods';
import HowItWorks from '../Components/HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedFoods/>
            <HowItWorks/>
        </div>
    );
};

export default Home;