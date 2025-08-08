import React from 'react';
import Banner from '../Components/Banner';
import FeaturedFoods from '../Components/FeaturedFoods';
import HowItWorks from '../Components/HowItWorks';
import TopDonators from '../Components/TopDonatros';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto px-6'>
            <Banner/>
            <FeaturedFoods/>
            <TopDonators/>
            <HowItWorks/>
        </div>
    );
};

export default Home;