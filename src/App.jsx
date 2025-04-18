import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Convert from './pages/Convert/Convert'
import NewsFeed from './pages/News/NewsFeed'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div className=" dark:bg-gray-900 dark:text-white min-h-screen custom-scrollbar">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/news" element={<NewsFeed />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
