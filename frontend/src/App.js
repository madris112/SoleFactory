import {React, Component} from 'react'
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './Home'
import Signin from './Signin'

function App() {
  return (
    
     
      <Router>
      <div className="App">
        <Route path='/home' component={Home}></Route>
        <Route path='/signin' component={Signin}></Route>
     
      
    </div>
     </Router>
  )
}

export default App;
