import {React, Component} from 'react'
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './Home'
import Signin from './Signin'
import Checkout from './Checkout'
import SellersForm from './SellersForm'
import Signup from './Signup'

function App() {
  return (
    
     
      <Router>
      <div className="App">
        <Route path='/home' component={Home}></Route>
        <Route path='/signin' component={Signin}></Route>
        <Route path='/checkout' component={Checkout}></Route>
        <Route path='/seller' component={SellersForm}></Route>
        <Route path='/signup' component={Signup}></Route>
     
      
    </div>
     </Router>
  )
}

export default App;
