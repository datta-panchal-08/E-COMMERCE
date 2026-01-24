import React from 'react'
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserLayout/>}></Route>
      <Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App