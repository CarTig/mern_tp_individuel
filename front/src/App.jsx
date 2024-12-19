import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Logout from "./components/Logout/Logout.jsx";
import Users from "./components/Users/Users.jsx";
import Wrapper from "./components/Wrapper/Wrapper.jsx";
import Ads from "./components/Ads/Ads.jsx";
import AdsList from "./components/AdsList/AdsList.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <BrowserRouter>
              <Wrapper>
                  <Routes>
                      <Route path="/register" element={<Register/>}/>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/users" element={<Users/>}/>
                      <Route path="/logout" element={<Logout/>}/>
                      <Route path="/ads" element={<Ads/>}/>
                      <Route path="/adslist" element={<AdsList/>}/>
                      <Route path="/" element={<Home/>}/>
                  </Routes>
              </Wrapper>
          </BrowserRouter>

      </div>

    </>
  )
}

export default App
