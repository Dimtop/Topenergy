import React from 'react';

//Components
import {Button} from 'rsuite';
import Banner from './Banner';
import Description from './Description'
import Price from './Price'
import Form from './Form'
import Footer from './Footer'

function LandingPage() {
    return (
      <>
          <Banner />
          <Description />
          <Price />
          <Form />
          <Footer />
      </>
    )
  }
  
  export default LandingPage;