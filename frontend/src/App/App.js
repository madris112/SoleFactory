import {React} from 'react'
import { Route, Switch } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import ProductForm from "./pages/ProductForm"
import ProductDescription from "./pages/ProductDescription"
import OrderHistory from "./pages/OrderHistory"
import Cart from "./pages/Cart"
import InfoCompleteForm from "./pages/infoCompleteForm"

function App() {
  return (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/productform" component={ProductForm} />
        <Route path="/productdescription" component={ProductDescription} />
        <Route path="/orderhistory" component={OrderHistory} />
        <Route path="/cart" component={Cart} />
        <Route path="/completeForm" component={InfoCompleteForm} />
    </Switch>
  )
}

export default App;
