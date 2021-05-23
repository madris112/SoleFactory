import {React} from 'react'
// import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import ProductForm from "./pages/ProductForm"
import ProductDescription from "./pages/ProductDescription"
import SideBar from "./pages/Layout"
import OrderHistory from "./pages/OrderHistory"

function App() {
  return (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={SideBar} />
        <Route path="/productform" component={ProductForm} />
        <Route path="/productdescription" component={ProductDescription} />
        <Route path="/sidebar" component={SideBar} />
        <Route path="/orderhistory" component={OrderHistory} />
    </Switch>
  )
}

export default App;
