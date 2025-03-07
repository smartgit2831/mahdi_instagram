import './App.css';
import ForgetPassword from './component/ForgetPassword';
import Login from './component/Login';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './component/SignUp';
import Search from './Page/Search';
import Footer from './component/Footer';
import Profile from './Page/Profile';
import Explore from './Page/Explore';
import Post from './Page/Post';
import Notification from './component/Notification';
import Send from './component/Send';
import { useEffect, useState } from 'react';
import { Context } from './component/Context';
import Reels from './component/Reels';
import ViewStory from './component/ViewStory';
import Page from './Page/Page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}
function AppContent() {
  const location = useLocation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (location.pathname === '/') {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [location]);

  return (
    <Context>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Page' element={<Page/>}/>
        <Route path='/ForgetPassword' element={<ForgetPassword/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/Search' element={<Search/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Explor/:id' element={<Explore/>}/>
        <Route path='Profile/Post/:id' element={<Post/>}/>
        <Route path='/Notification' element={<Notification/>}/>
        <Route path='/Send' element={<Send/>}/>
        <Route path='/Reels' element={<Reels/>}/>
        <Route path='/ViewStory' element={<ViewStory/>}/>
      </Routes>
      {show && <Footer />}
    </Context>
  );
}
export default App;
