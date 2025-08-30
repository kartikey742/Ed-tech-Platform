import React from "react"

import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import { ReviewSlider } from "../components/core/common/ReviewSlider"
import Footer from "../components/core/common/Footer"
// import ReviewSlider from "../components/Common/ReviewSlider"
import ContactFormSection from "../components/core/aboutPage/ContactFormSection"
import LearningGrid from "../components/core/aboutPage/LearningGrid"
import Quote from "../components/core/aboutPage/Quote"
import StatsComponenet from "../components/core/aboutPage/Stats"
import {HighlightText} from "../components/core/homepage/highlight"

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="about-hero-inner">
          <header className="about-hero-header">
            Driving Innovation in Online Education for a <HighlightText text="Brighter Future" />
            <p className="about-hero-subtext">
              Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
            </p>
          </header>
         
          <div className="about-banner-spacer"></div>
          <div className="about-banner-images">
            <img src={BannerImage1} alt="Banner 1" />
            <img src={BannerImage2} alt="Banner 2" />
            <img src={BannerImage3} alt="Banner 3" />
          </div>
        </div>
      </section>

      <section className="about-quote-section">
        <div className="about-quote-inner">
          <div className="about-quote-spacer"></div>
          <Quote />
        </div>
      </section>

      <section className="about-story-section">
        <div className="about-story-inner">
          <div className="about-story-block">
            <div className="about-text-content">
              <h1 className="about-title-gradient1">Our Founding Story</h1>
              <p>
                Our e-learning platform was born out of a shared vision and passion for transforming education...
              </p>
              <p>
                As experienced educators ourselves, we witnessed firsthand the limitations and challenges...
              </p>
            </div>
            <div>
              <img src={FoundingStory} alt="Founding Story" className="about-story-img" />
            </div>
          </div>

          <div className="about-vision-mission">
            <div className="about-text-content">
              <h1 className="about-title-gradient2">Our Vision</h1>
              <p>
                With this vision in mind, we set out on a journey to create an e-learning platform that...
              </p>
            </div>
            <div className="about-text-content">
              <h1 className="about-title-gradient3">Our Mission</h1>
              <p>
                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community...
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponenet />

      <section className="about-learning-contact">
        <LearningGrid />
        <ContactFormSection />
      </section>

       
        <ReviewSlider />

      <Footer />
    </div>
  )
}

export default About
