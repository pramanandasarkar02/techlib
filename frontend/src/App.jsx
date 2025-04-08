import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Trending from './pages/Trending'
import Help from './pages/Help'
import Collections from './pages/Collections'
import WorkSpace from './pages/WorkSpace'
import Navbar from './components/Navbar'
import SingleDocumentPage from './pages/SingleDocumentPage'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import ReaderPage from './pages/ReaderPage'

const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/trending' element={<Trending />} />
          {/* document view */}
          <Route path="/documents/:id" element={<SingleDocumentPage />} />


          {/* document upload */}

          <Route path='/collection' element={<Collections />} />
          

          


          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/profile/edit/:id' element={<EditProfile />} />
          
          
          
          


          {/* <Route path='/workspace' element={<WorkSpace />} /> */}
          <Route path='/help' element={<Help />} />

          {/* <Route path='/read' element={<ReaderPage />} /> */}
          <Route path='*' element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
