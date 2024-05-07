import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home'
import Weather from './pages/weather';
import Landing from './pages/landing';
import SignUp from './pages/singup';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { setAccessToken, refreshToken } from './store/user/userSlice';
import getCookie from './utils/getCookie';
import Explore from './pages/explore';
import NotFound from './pages/notfoundpage';
import StockMarketPage from './pages/finance';

function App() {
  const accessToken = useSelector((state: any) => state.user.accessToken);
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      dispatch(setAccessToken(accessToken));
    } else {
      const token = getCookie("refreshToken");
      if(token){
        dispatch(refreshToken({token, token_expires_in: '1d'}))
      }
    }
  }, []);
  
  return (
    <>
      <Router>
        {accessToken ? 
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/finance" element={<StockMarketPage />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main> 
        :
          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
        }
      </Router>
    </>
  )
}

export default App
