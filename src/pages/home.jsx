import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { HighlightText } from '../components/core/homepage/highlight'
import {CTAButton} from '../components/core/homepage/button'
import banner from '../assets/Images/banner.mp4'
import { CodeBlocks  } from '../components/core/homepage/CodeBlocks'
import { Timelinesection } from '../components/core/homepage/Timelinesection'
import LearningLanguageSection from '../components/core/homepage/LearningLanguageSection'
import { InstructorSection } from '../components/core/homepage/InstructorSection'
import { ExploreMore } from '../components/core/homepage/ExploreMore'
import TestPlayer from '../components/core/viewCourse/TestPlayer'
import { ReviewSlider } from '../components/core/common/ReviewSlider'
import Footer from '../components/core/common/Footer'
export const Home = () => {
  return (
     <div >
        <div className='container' >

      <Link to="/signup" className="no-underline">
        <div className="link-wrapper">
          <div className="link-inner">
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>
        </div>
      </Link>
      <div id='maintext'>
        Empower Your Future  with
        <HighlightText text={"Coding Skill"}></HighlightText>
      </div>
      <div className='text'>
         With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
      </div>
      <div id='homeButtons'>
        <CTAButton active={true} linkto={'signup'}>Learn More</CTAButton>
        <CTAButton active={false} linkto={'login'}>Book a Demo</CTAButton>
      </div>

      <div className='video' >
        <video muted loop autoPlay id='video'>
        <source src={banner}></source>
        </video>
      </div>

      <div>
        <CodeBlocks 
        position={'row'}
        heading={
            <div>
                Unlock your <HighlightText text={'coding potential'}></HighlightText> with our online courses
            </div>
        }
        subHeading={'"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."'}
        ctaBtn1={{
            text:'Try it yourself',
            linkto:'/signup',
            active:true
        }}
        ctaBtn2={{
            text:'Learn more',
            linkto:'/login',
            active:false
        }}
        codeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
        >

        </CodeBlocks>
<br /><br />
         <CodeBlocks 
        position={'row-reverse'}
        heading={
            <div>
                Start<HighlightText text={'coding in seconds'}></HighlightText>
            </div>
        }
        subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
        ctaBtn1={{
            text:'Continue Lesson',
            linkto:'/signup',
            active:true
        }}
        ctaBtn2={{
            text:'Learn more',
            linkto:'/login',
            active:false
        }}
        codeBlock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
        >

        </CodeBlocks>
      </div>
      <br /><br /><br /><br /><br /><br /><br />
        <div id='maintext'>
       Unlock the
        <HighlightText text={"Power of code"}></HighlightText>
      </div>
       <div className='text'>
         With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
      </div>
     <ExploreMore></ExploreMore>
     </div>

     <div id='container2'>
        <br />
        <div id='backimg'>
              <CTAButton active={true}>
                <div id="CTA">
                        Explore full catalogue
                        <FaArrowRight></FaArrowRight>
                        </div>
                      </CTAButton>
        <CTAButton active={false} linkto={'login'}>Learn more</CTAButton>
        </div>
        <br /><br />
        <div id='part2'>
        <div id='head2'>Get the skills you need for a <HighlightText text={'job that is in demand'}></HighlightText></div>
        <div id='head3'>
              The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
                <br /><br />
                <CTAButton active={true} linkto={'login'}>Learn more</CTAButton>
        </div>
        </div>


        <Timelinesection></Timelinesection>
        <LearningLanguageSection></LearningLanguageSection>
     </div>
     <div id='container3'>
     <br></br>
        <InstructorSection></InstructorSection>
     </div>
     <ReviewSlider></ReviewSlider>
     <Footer></Footer>
    </div>
  )
}
