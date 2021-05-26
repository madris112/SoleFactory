import {React,useState,useEffect} from 'react'
import Home from './Home'
import Portal from './Portal'
import {Button,Card, Container, FormControl, Form, Col, Row, ToggleButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from 'react-router-dom';
import ProductList from "./productlist"
import "./OrderHistory.css"
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'
import sole from "./sole.jpg"
import cart from "./cart.svg"
import coin from "./coin.png"
import guccibelt from "./guccibelt.jpeg"
import { FaCartPlus } from "react-icons/fa";

function Cart(props) {
  const [currentCart, setCurrentCart] = useState({})
  const [message , setMessage] = useState(null)
  const [searchname, setSearchName] = useState("");
  const [category, setCategory] = useState("");


  const [ngo, setngo] = useState("false");
  const [coins, setcoins] = useState(null);
  


  const [popup, setPopUp] = useState(0);
  const [payWithCoin, setPayWithCoin] = useState(0);
  const [paymentConfirmed, setPaymentConfirmed] = useState(0)
  let totalAmount = 0;
  let numberOfCoins = 0;

  let history = useHistory();

  useEffect(() => {
    setCurrentCart(JSON.parse(localStorage.getItem(localStorage.getItem("curUser"))))
  },[])





  useEffect(() => {
    if (localStorage.getItem('localsession') === "1") {
      console.log("inside local storage");
      if (localStorage.getItem('localsession') !== '1') history.push('/');

      const header = {
        'Content-Type'                    : 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      let x=localStorage.getItem('username');
      console.log(x);
      axios
        .get('http://localhost:4000/getuser', {params:{usrname: x}, header, withCredentials: true })
        .then((response) => {
          if(response.data.retuser){
          console.log(JSON.stringify(response.data.retuser));
          console.log(JSON.stringify(response.data.retuser.Type));
          console.log(JSON.stringify(response.data.retuser.CoinAmt));
          if(response.data.retuser && response.data.retuser.Type==="1"){
            setngo("true");
            console.log("hello");
            var y=response.data.retuser.CoinAmt;
            console.log(parseInt(y));
            setcoins(response.data.retuser.CoinAmt);
          }
          
          // if(response.data.retuser &&response.data.retuser.IsActivated === "0"){
          //   history.push('/completeForm');
          // }
        }
        }
    );

    } else {
      // const header = {
      //   'Content-Type'                    : 'Application/json',
      //   'Access-Control-Allow-Credentials': true,
      // };
      // axios
      //   .get('http://localhost:4000/check', { header, withCredentials: true })
      //   .then((response) => {
      //     console.log(JSON.stringify(response.data.user));
      //     console.log(JSON.stringify(response.data.message));
      //     if(response.data.user.IsAuthorized === '0'){
      //       history.push('/completeForm');
      //     }
      //     redirectLink = response.data.redirect;
      //     if(response.data.message === "Unauthorized Access!"){
      //         history.push('/');

      //     }
      //   });

      // if(redirectLink!=='')
      //   history.push(redirectLink)
    }
  }, []);
  



  useEffect(() => {
      if(category!=""){
          let data = {"category":category}
          history.push({
          pathname: "/home",
          state: data
      })
      return;
      }
  },[category])

  function logoutClick(e){
    localStorage.clear();
    const header = {
      "Content-Type": "application/json"
    };
    axios.get("http://localhost:4000/logout",{header})
    .then(response => {console.log(JSON.stringify(response.data.message))
          if(response.data.message === "Logout Successful!")
            history.push('/');

    });

  }

  function handleClick(e){
  if(searchname!=""){
    let data = {"searchname":searchname}

    let query = null;
    if(searchname!="")
    query = "?searchname="+searchname;

    console.log("cart" + data);

    history.push({
        pathname: "/home",
        state: data
      })


  }

  }
  let redirectLink = '';

  useEffect(() => {
    if (localStorage.getItem('localsession') === "1") {
      console.log("inside local storage");
      if (localStorage.getItem('localsession') !== '1') history.push('/');
    } else {
      const header = {
        'Content-Type'                    : 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      axios
        .get('http://localhost:4000/check', { header, withCredentials: true })
        .then((response) => {
          console.log(JSON.stringify(response.data.message));
          redirectLink = response.data.redirect;
          if(response.data.message === "Unauthorized Access!"){
              history.push('/');
          }

        });


      if(redirectLink!=='')
        history.push(redirectLink)
 
    }
  }, []);

  function confirmBuy(){
    //BACKEND connection
    let inventory = localStorage.getItem(localStorage.getItem("curUser"));
     let requestoptions = {
       inventory: inventory,
       userordered: localStorage.getItem("curUser")
     }
     if(paymentConfirmed){
       requestoptions = {...requestoptions, coinsUsed: payWithCoin?numberOfCoins:0}
     }
     console.log(inventory);
     const header = {
      "Content-Type": "application/json"
    };
     axios.post("http://localhost:4000/order",requestoptions,{header})
     .then(response => {
       console.log(response.data.message)
       setMessage(response.data.message);
    });
    setCurrentCart({})
    localStorage.setItem(localStorage.getItem("curUser"),JSON.stringify({}))

  }
  var nameofuser = localStorage.getItem('curUser');
  if(!nameofuser)nameofuser="hi"
  if(ngo==="false"){
    return (
        <div style={{overflowX: 'hidden'}}>
            <ReactBootStrap.Navbar       collapseOnSelect expand = "lg" bg = "dark" variant = "dark">
      <ReactBootStrap.Navbar.Brand href                    = "/home">
      <img
        alt          = ""
        src          = {sole}
        width        = "30"
        height       = "30"
        margin-right = "10px"
        className    = "s_image"
      />SoleFactory</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle   aria-controls = "responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id            = "responsive-navbar-nav">
  <ReactBootStrap.Nav             className     = "mr-auto">

      <ReactBootStrap.NavDropdown
      title="Categories"
      id="collasible-nav-dropdown"
      onSelect={(key) => setCategory(key)}>
        <ReactBootStrap.NavDropdown.Item eventKey="All">All</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item eventKey="Food and Beverages">Food n Beverages</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item eventKey="Electronics">Electronics</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item eventKey="Body Care">Body Care</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item eventKey="Miscellaneous">Miscellaneous</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>

      <ReactBootStrap.Nav.Link href = "#features">About Us</ReactBootStrap.Nav.Link>

    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>

      <Form inline div = "search_bar">
      <FormControl
      type        = "text"
      placeholder = "Search"
      className   = "mr-sm-2"
      value       = {searchname}
      onChange    = {e=>setSearchName(e.target.value)} />
      <Button
      variant = "outline-info"
      onClick = {handleClick}>Search</Button>
    </Form>

      <ReactBootStrap.Nav.Link href = "/orderhistory">Orders</ReactBootStrap.Nav.Link>

       {/* <ReactBootStrap.Nav>
         <Button variant = "outline-info" onClick = {logoutClick}>SignOut</Button>
       </ReactBootStrap.Nav> */}

       

      <ReactBootStrap.NavDropdown
      title={nameofuser}
      id="collasible-nav-dropdown"
      onSelect={(key) => setCategory(key)}>
        <ReactBootStrap.NavDropdown.Item eventKey="All">My Profile</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item onClick={logoutClick} >Signout</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>
           <ReactBootStrap.Nav.Link href="/cart"><FaCartPlus/></ReactBootStrap.Nav.Link>

    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
  <div className="you_orders" >
 <h2 className="your_orders"><strong>Your Orders</strong></h2>
 <h3 style={{color:"green",marginLeft:"30%"}}>{message}</h3>
 </div>
 <div className="whole_page">
  {console.log(currentCart)}
    <Container >
  {
    Object.keys(currentCart).map((data,key) => {
      if(currentCart[data].quantity==0)
        return;
      totalAmount += currentCart[data].price * currentCart[data].quantity
      numberOfCoins = Math.min(Math.ceil(totalAmount/100),localStorage.getItem('coins'))
      console.log("items")
      return(
        <Row className="row_orders">
          <Col style={{padding: "0px"}}>
            <img className="img_row"
            fluid
            src={'http://localhost:4000/upload/' + currentCart[data].img_url} alt=""
            width="150"
            height="120"/>
          </Col>
          <Col style={{padding: "5px"}}><br/>
            <h4><strong>{currentCart[data].title}</strong></h4>
            <p>By {currentCart[data].brand} </p>
            <h5>Quantity: {currentCart[data].quantity}</h5>
          </Col>
          <Col className="row_price">
            <h3><strong>Your total for this item: {currentCart[data].price * currentCart[data].quantity}</strong></h3><br/>
            <button lg color="secondary">Buy it Again</button>
          </Col>
        </Row>
      )
    })
  }
    
    <h1>Your total is: {totalAmount}</h1>
    <Button variant="primary" onClick={()=>setPopUp(1)} disabled={totalAmount<10000}>Buy All</Button>
    </Container>
    {popup ? (
      <Portal >
        <h1>Your total is: {totalAmount}</h1>
        {payWithCoin ?
          <div>
            <ToggleButton type='checkbox' checked={payWithCoin} onChange={()=>setPayWithCoin(!payWithCoin)}>Pay with coins</ToggleButton>
            <h1>You need to pay: {numberOfCoins}Coins and {Math.max(totalAmount-numberOfCoins*10,0)}Rupees</h1>
          </div>
        :
          <div>
            {localStorage.getItem("ngo") ? 
            <ToggleButton type='checkbox' checked={payWithCoin} onChange={()=>setPayWithCoin(!payWithCoin)}>Pay with coins</ToggleButton>
            : null
            }
            <h1>You need to pay: {totalAmount}Rupees</h1>
          </div>}
        <Button onClick={() => {setPopUp(0);setPaymentConfirmed(1);confirmBuy();}}>Pay</Button>
        <Button onClick={() => setPopUp(0)}>Cancel</Button>
      </Portal>
    ) : null
      }
  </div> 
</div>

    )
  }else{

    return (
        <div>
          {console.log(popup)}
            <ReactBootStrap.Navbar       collapseOnSelect expand = "lg" bg = "dark" variant = "dark">
      <ReactBootStrap.Navbar.Brand href                    = "/home">
      <img
        alt          = ""
        src          = {sole}
        width        = "30"
        height       = "30"
        margin-right = "10px"
        className    = "s_image"
      />SoleFactory</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle   aria-controls = "responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id            = "responsive-navbar-nav">
  <ReactBootStrap.Nav             className     = "mr-auto">

      <ReactBootStrap.NavDropdown
      title="Categories"
      id="collasible-nav-dropdown"
      onSelect={(key) => setCategory(key)}>
        <ReactBootStrap.NavDropdown.Item eventKey="All">All</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item eventKey="Food and Beverages">Food n Beverages</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item eventKey="Electronics">Electronics</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item eventKey="Body Care">Body Care</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item eventKey="Miscellaneous">Miscellaneous</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>

      <ReactBootStrap.Nav.Link href = "#features">About Us</ReactBootStrap.Nav.Link>

    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>

      <Form inline div = "search_bar">
      <FormControl
      type        = "text"
      placeholder = "Search"
      className   = "mr-sm-2"
      value       = {searchname}
      onChange    = {e=>setSearchName(e.target.value)} />
      <Button
      variant = "outline-info"
      onClick = {handleClick}>Search</Button>
    </Form>

    <div className="coin_display">
     
        <img src={coin} width="35" height="35" marginRight="20"  alt="" />
        
        {coins}</div>

      <ReactBootStrap.Nav.Link href = "/orderhistory">Orders</ReactBootStrap.Nav.Link>


      
       {/* <ReactBootStrap.Nav>
        <Button variant = "outline-info" onClick = {logoutClick}>SignOut</Button>
      </ReactBootStrap.Nav> */}

      <ReactBootStrap.NavDropdown
      title={nameofuser}
      id="collasible-nav-dropdown"
      onSelect={(key) => setCategory(key)}>
        <ReactBootStrap.NavDropdown.Item eventKey="All">All</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item onClick={logoutClick} eventKey="Signout">Signout</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>
           <ReactBootStrap.Nav.Link href="/cart"><FaCartPlus/></ReactBootStrap.Nav.Link>

    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
  <div className="you_orders" >
 <h2 className="your_orders"><strong>Your Orders</strong></h2>
 <h3 style={{color:"green",marginLeft:"30%"}}>{message}</h3>
 </div>
 <div className="whole_page">
  {console.log(currentCart)}
    <Container >
  {
    Object.keys(currentCart).map((data,key) => {
      if(currentCart[data].quantity==0)
        return;
      totalAmount += currentCart[data].price * currentCart[data].quantity
      numberOfCoins = Math.min(Math.ceil(totalAmount/100),localStorage.getItem('coins'))
      console.log("items")
      return(
        <Row className="row_orders">
          <Col style={{padding: "0px"}}>
            <img className="img_row"
            fluid
            src={'http://localhost:4000/upload/' + currentCart[data].img_url} alt=""
            width="150"
            height="120"/>
          </Col>
          <Col style={{padding: "5px"}}><br/>
            <h4><strong>{currentCart[data].title}</strong></h4>
            <p>By {currentCart[data].brand} </p>
            <h5>Quantity: {currentCart[data].quantity}</h5>
          </Col>
          <Col className="row_price">
            <h3><strong>Your total for this item: {currentCart[data].price * currentCart[data].quantity}</strong></h3><br/>
            <button lg color="secondary">Buy it Again</button>
          </Col>
        </Row>
      )
    })
  }
    
    <h1>Your total is: {totalAmount}</h1>
    <Button variant="primary" onClick={()=>setPopUp(1)} disabled={totalAmount<=0}>Buy All</Button>
    </Container>
    {popup ? (
      <Portal >
        <h1>Your total is: {totalAmount}</h1>
        {payWithCoin ?
          <div>
            <ToggleButton type='checkbox' checked={payWithCoin} onChange={()=>setPayWithCoin(!payWithCoin)}>Pay with coins</ToggleButton>
            <h1>You need to pay: {numberOfCoins}Coins and {Math.max(totalAmount-numberOfCoins*100,0)}Rupees</h1>
          </div>
        :
          <div>
            {localStorage.getItem("ngo") ? 
            <ToggleButton type='checkbox' checked={payWithCoin} onChange={()=>setPayWithCoin(!payWithCoin)}>Pay with coins</ToggleButton>
            : null
            }
            <h1>You need to pay: {totalAmount}Rupees</h1>
          </div>}
        <Button onClick={() => {setPopUp(0);setPaymentConfirmed(1);confirmBuy();}}>Pay</Button>
        <Button onClick={() => setPopUp(0)}>Cancel</Button>
      </Portal>
    ) : null
      }
  </div> 
</div>

    )
  }
}

export default Cart;
