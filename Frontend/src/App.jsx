import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Verify from './pages/Verify';
import VerifyEmail from './pages/VerifyEmail';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path:"/",
    element:<><Navbar/><Home/></>
  },
  {
    path:"/signup",
    element:<><Signup/></>
  },{
    path:"/login",
    element:<><Login/></>
  },{
    path:"/verify",
    element:<><Verify/></>
  },{
    path:"/verify/:token",
    element:<><VerifyEmail/></>
  },{
    path:"/profile/:userId",
    element:<><Navbar/><Profile/></>
  }

])

const App = () => {
  return (
   <>
   <RouterProvider router={router}></RouterProvider>
   </>
  )
}

export default App