import React from 'react';
import Banner from '../components/Banner';
import TestimonialSlider from '../components/TestimonialSlider';
import HowItWorks from './HowItWorks';
import ContactSupport from './ContactSupport';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TestimonialSlider></TestimonialSlider>
      <HowItWorks></HowItWorks>
      <ContactSupport></ContactSupport>
      
    </div>
  );
};

export default Home;