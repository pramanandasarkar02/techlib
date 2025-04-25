import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Explore from "./pages/Explore"
import Collection from "./pages/Collection"


import Navbar from "./components/Navbar"
import Profile from "./pages/Profile"


function App() {
  

  return (
    <BrowserRouter>
      

      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/profile" element={<Profile />} />


        
      </Routes>
    </BrowserRouter>
  )
}

export default App
