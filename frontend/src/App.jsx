import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Trending from './pages/Trending'
import Help from './pages/Help'
import Collections from './pages/Collections'
import WorkSpace from './pages/WorkSpace'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/collection' element={<Collections />} />
          <Route path='/workspace' element={<WorkSpace />} />
          <Route path='/help' element={<Help />} />
        </Routes>
      </div>
    </>
  )
}

export default App
