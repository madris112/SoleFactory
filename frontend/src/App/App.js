import {React} from 'react'
// import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import ProductForm from "./pages/ProductForm"

function App() {
  return (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/productform" component={ProductForm} />
    </Switch>
  )
}

export default App;
