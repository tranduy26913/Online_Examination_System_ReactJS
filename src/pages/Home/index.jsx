import React from 'react'
import Page from 'components/Page'
import {
  Box
} from '@mui/material'
import './Home.scss'

import Hero from './components/Hero'
import Section from './components/Section'
import AboutUs from './components/AboutUs'
import Testimonial from './components/Testimonial'
import ContactUs from './components/ContactUs'
import { useEffect } from 'react'
function Home() {
  useEffect(()=>{
    const items = document.querySelectorAll('.home-item')
    const parallaxScroll = (event)=>{
      items.forEach(item=>{
      if(item.offsetTop - window.scrollY < 300){
        item.classList.add('active')
      }
      else{
        item.classList.remove('active')
      }
    })
    }
    document.addEventListener('scroll',parallaxScroll)
    return (()=>document.removeEventListener('scroll',parallaxScroll))
  },[])
  return (
    <>
      <Page title='Trang chủ'>
        <Box className='container' pb={5}>
          <Hero className='home-item'/>
          <Section className='home-item'/>
          <AboutUs className='home-item'/>
          <Testimonial className='home-item'/>
          <ContactUs className='home-item'/>
        </Box>
      </Page>
    </>
  )
}

export default Home