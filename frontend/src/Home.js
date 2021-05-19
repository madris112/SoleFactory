import React, {Component} from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core'
import {Link} from 'react-router-dom'
import './Home.css'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import ama from "./ama.jpg"


class App extends Component{
  state : {

  }  


  render() {
    return (
      <div>
        <nav className="header">
         

          <div className="header_search">

          <input type='text' className="header_searchInput"/>
          <SearchIcon className="header_searchIcon" />
          </div>

          <div className="header_nav">
            <Link to='/signin' className="header_link">
            <div className="header_option">
            <span>Sign in</span>
            </div>
            </Link>

            <Link to='/orderhistory' className="header_link">
            <div className="header_option">
            <span>Orders</span>
            </div>
            </Link>

            <Link to='/checkout' className="header_link">
            <div className="cart_icon">
            <ShoppingBasketIcon />
            </div>
            </Link>


          </div>
        </nav>
     <div class img-banner >
        <img src={ama} alt="" />
        </div>
        </div>


        
    )

}
}
export default App;