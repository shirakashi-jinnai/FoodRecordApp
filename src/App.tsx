import React from 'react'
import Router from './Router'
import './asetts/reset.css'
import './asetts/style.css'
import './asetts/swiper.css'
import { Header } from './components/Header'

function App() {
  return (
    <div>
      <Header />
      <div className="main">
        <Router />
      </div>
    </div>
  )
}

export default App
