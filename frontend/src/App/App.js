import {React} from 'react'
// import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"

function App() {
  return (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
    </Switch>
  )
}

export default App;
