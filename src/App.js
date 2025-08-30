import logo from './logo.svg';
import './App.css';
import './css/common.css'
import './css/form.css'
import './css/about.css'
import './css/profile.css'
import './css/enrolledCourses.css'
import './css/viewCourse.css'
import './css/settings.css'
import { Route,Routes  } from 'react-router-dom';
import Contact from './pages/Contact';
import {Home} from '../src/pages/home'
import { Instructor } from './components/core/Dashboard/instructorDashboard/Instructor';
import { Navbar } from './components/core/common/Navbar';
import  Signup  from './pages/Signup';
import Settings from './components/core/Dashboard/Settings'
import Login from './pages/Login'
import CourseDetails  from './pages/CourseDetails';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About'
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';
import PrivateRoute from './components/core/common/PrivateRoute';
import Error from './pages/Error'
import { EnrolledCourses } from './components/core/Dashboard/EnrolledCourses';
import Cart from './components/core/Dashboard/cart/Cart';
import { AddCourse } from './components/core/Dashboard/addCourse/Addcourse';
import MyCourses from './components/core/MyCourses';
import EditCourse from './components/core/Dashboard/addCourse/editCourse';
import Catalogs from './pages/Catalogs' 
import ViewCourse from './pages/ViewCourse';
import { useSelector } from 'react-redux';
import VideoDetails from './components/core/viewCourse/VideoDetails';
import { ACCOUNT_TYPE} from "./utils/constants"
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const {user} = useSelector((state) => state.profile)  
  return (
    <div className="App">
      <Navbar></Navbar>
     <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
      <Route path='/update-password/:id' element={<UpdatePassword></UpdatePassword>}></Route>
      <Route path='/verify-email' element={<VerifyEmail></VerifyEmail>}></Route>
      <Route path='/about' element={<About></About>}></Route>
         <Route path="/contact" element={<Contact />} />
       <Route path="catalog/:catalogName" element={<Catalogs />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route element={
          <PrivateRoute>
          <Dashboard></Dashboard>
      </PrivateRoute>
        }>
      <Route path='/dashboard/my-profile' element={<MyProfile></MyProfile>}></Route>
      <Route path='/dashboard/instructor' element={<Instructor></Instructor>}></Route>
      <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses></EnrolledCourses>}></Route>
      <Route path='/dashboard/cart' element={<Cart></Cart>}></Route>
       <Route path="dashboard/settings" element={<Settings />} />
      <Route path='/dashboard/add-course' element={<AddCourse></AddCourse>}></Route>
      <Route path='/dashboard/my-courses' element={<MyCourses></MyCourses>}></Route>
      <Route path='/dashboard/edit-course/:courseId' element={<EditCourse></EditCourse>}></Route>
        </Route>
        <Route element={<PrivateRoute><ViewCourse></ViewCourse></PrivateRoute>}>
        {
          user?.accountType===ACCOUNT_TYPE.STUDENT && (
            <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails></VideoDetails>}>
              
            </Route>
          )
        }
        </Route>
      <Route path='*' element={<Error></Error>}></Route>
     </Routes>
    </div>
  );
}

export default App;
