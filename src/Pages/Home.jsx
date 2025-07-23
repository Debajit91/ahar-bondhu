import React from 'react';
import Banner from '../Components/Banner';
import FeaturedFoods from '../Components/FeaturedFoods';
import HowItWorks from '../Components/HowItWorks';
import TopDonators from '../Components/TopDonatros';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedFoods/>
            <TopDonators/>
            <HowItWorks/>
        </div>
    );
};

export default Home;