import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './pages/User'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Document from './pages/Document'
import SingleDocumentPage from './pages/SingleDocumentPage'
import SingleUserPage from './pages/SingleUserPage'

function App() {
  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/users" element={<User/>} />
        <Route path="/documents" element={<Document/>} />
        <Route path="/documents/:documentId" element={<SingleDocumentPage/>} />
        <Route path="/users/:userId" element={<SingleUserPage/>} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
