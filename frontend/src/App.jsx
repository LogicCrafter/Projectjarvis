import React, { useContext, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize'
import { userDataContext } from './context/UserContext'
import Home from './pages/Home'
import Customize2 from './pages/Customize2'

function App() {
  const {userData,setUserData}=useContext(userDataContext)
  const [language, setLanguage] = useState("en"); // 'en' for English, 'hi' for Hindi

  // When sending a message to backend, include language
  const sendMessage = async (message) => {
    await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, language }),
    });
  };

  return (
   <>
   <div>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>
    </div>
   <Routes>
     <Route path='/' element={(userData?.assistantImage && userData?.assistantName)? <Home/> :<Navigate to={"/customize"}/>}/>
    <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
     <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
      <Route path='/customize' element={userData?<Customize/>:<Navigate to={"/signup"}/>}/>
       <Route path='/customize2' element={userData?<Customize2/>:<Navigate to={"/signup"}/>}/>
   </Routes>
   </>
  )
}

export default App
