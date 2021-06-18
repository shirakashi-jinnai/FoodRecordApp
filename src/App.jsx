import React from 'react'
import { Component } from 'react';
import Router from './Router';
import Signup from './templetes/Signup';
import Test from './templetes/Test';
import './asetts/reset.css'
import './asetts/style.css'
import { Header } from './components/Header';


function App() {
  return (
    <div>
      <Header />
      <div className="main">
        <Router />
      </div>
    </div>
  );
}

// class test extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       test: this.props,
//       test1: [{a: 1, b: 2 }]
//     }
//   }
// }

export default App;
