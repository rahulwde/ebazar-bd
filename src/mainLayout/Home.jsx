import React from 'react';
import Banner from '../components/Banner';
import TestimonialSlider from '../components/TestimonialSlider';
import HowItWorks from './HowItWorks';
import ContactSupport from './ContactSupport';
import FeatureProducts from '../components/FeatureProducts';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeatureProducts></FeatureProducts>
      <TestimonialSlider></TestimonialSlider>
    
      <HowItWorks></HowItWorks>
      <ContactSupport></ContactSupport>
      
    </div>
  );
};

export default Home;