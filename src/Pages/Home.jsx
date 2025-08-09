import React from 'react';
import Banner from '../Components/Banner';
import FeaturedFoods from '../Components/FeaturedFoods';
import HowItWorks from '../Components/HowItWorks';
import TopDonators from '../Components/TopDonators';
import ImpactStatistics from '../Components/ImpactStatistics';
import Testimonials from '../Components/Testimonials';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto px-6'>
            <Banner/>
            <FeaturedFoods/>
            <ImpactStatistics/>
            <TopDonators/>
            <Testimonials/>
            <HowItWorks/>
        </div>
    );
};

export default Home;