import React from 'react'
import Page from 'components/Page'
import {
  Box
} from '@mui/material'

import Hero from './components/Hero'
import Section from './components/Section'
import AboutUs from './components/AboutUs'
import Testimonial from './components/Testimonial'
import ContactUs from './components/ContactUs'
function Home() {
  return (
    <>
      <Page title='Trang chủ'>
        <Box className='container'>
          <Hero />
          <Section />
          <AboutUs />
          <Testimonial />
          <ContactUs />
        </Box>
      </Page>
    </>
  )
}

export default Home