import {React, useState,useEffect} from 'react'
import {Button, Card, CardColumns, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './productlist.css'
import { Link, useHistory } from 'react-router-dom';
import smile from './smile.png'
import axios from 'axios'
import Emptyimg from './finalnotfound.png'
import { FaBoxes,FaCoins } from "react-icons/fa";

function ProductList(props){
  const [ngo, setngo] = useState("false");
  const [expiryin, setexpiryin] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('localsession') === "1") {
      // console.log("inside local storage");
      if (localStorage.getItem('localsession') !== '1') history.push('/');

      const header = {
        'Content-Type'                    : 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      let x=localStorage.getItem('username');
      // console.log(x);
      axios
        .get('http://localhost:4000/getuser', {params:{usrname: x}, header, withCredentials: true })
        .then((response) => {
          if(response.data.retuser){
          // console.log(JSON.stringify(response.data.retuser));
          // console.log(JSON.stringify(response.data.retuser.Type));
          // console.log(JSON.stringify(response.data.retuser.CoinAmt));
          if(response.data.retuser && response.data.retuser.Type==="1"){
            setngo("true");
            // console.log("hello");
          }

        }
        }
    );

    }
  }, []);

  //console.log(props.arr);

  let history = useHistory();

  const Prod =({prod_id,discount,img_url,title, brand, description, price, instock,coinval, curr,nearexpiry,expiryin}) => {

    var sc = 'http://localhost:4000/upload/' + img_url;
    if (!title) return <div />;
    // console.log("rating starts")
    const userInput = {
    prodid: prod_id
  }
    const header = {
      'Content-Type': 'Application/json'
    };

    let data = {
      "prod_id": prod_id,
      "discount": discount,
      "img_url": img_url,
      "title": title,
      "brand": brand,
      "description": description,
      "price": price,
      "instock": instock,
      "coinval": coinval,
      "nearexpiry": nearexpiry,
      "expiryin": expiryin
    }

     function handleClick(){

      const userInput = {
      prodid: prod_id
    }
    const header = {
      "Content-Type": "application/json"
    };

     axios.post('http://localhost:4000/product/counter',userInput, { header } )
        .then(response => {var newcnt =  response.data} );

    // console.log('countcheck done')

      history.push({
        pathname: "/productdescription",
        state: data
      })
    }

    if(ngo==="true"){
        if(instock <= 0){
          return null
        }
         return (
      <Col xs={12} sm={6} md={4} style={{marginBottom:"0.5%",height: "530px",overflow: "hidden"}}>
        <Card onClick={handleClick}
            className="cardHover"
            id ="cardcss">
            {
              curr>3 && <div className="ribbon"><span className="ribbon__content">Best Seller</span></div>
            }
          <Card.Body>
            <Card.Img variant="top" src= {sc} id="cardImg"/>
            <Card.Title
            className="cardHover"
            style={{overflow: "hidden",height:"50px"}}>
            {title}
            </Card.Title>
            <Card.Text style={{fontSize:"16px"}} >{brand}</Card.Text>
          </Card.Body>

          

          <div style = {{height: "100%"}}>

            {nearexpiry?   

              <h6 style={{color:"red",marginLeft:"10px"}} >Expiry in <strong> {expiryin} </strong> days !</h6>
            :null}
            {nearexpiry?   

              <p className="text-muted" style={{marginLeft:"10px"}}>₹ <strike>{price}</strike> <strong> {discount} </strong></p>
            : <p className="text-muted" style={{marginLeft:"10px"}}> <strong style={{color:"green",fontSize:"20px"}}>₹ {price}</strong></p>}
              <div style={{display:"inline-block",width:"100%"}}>
              <large className="text-right" style={{marginLeft:"10px"}}>  <FaBoxes style={{fontSize:"20px",marginRight:"3px"}}/>  {instock} </large>
              <div className="smiley"  style={{top:"0",position:"relative",float:"right",marginRight:"10px"}}>
              <h4 style={{marginRight:"5px"}}>{coinval} </h4>
              <FaCoins style={{fontSize:"24px"}}/>
              </div>
              </div>
            
            </div>

          
        </Card>
      </Col>
    );

    }else{
        if(instock <= 0){
          return null
        }
         return (

      <Col xs={12} sm={6} md={4} style={{marginBottom:"0.5%",height: "530px",overflow: "hidden"}}>
        <Card onClick={handleClick}
            className="cardHover"
            id ="cardcss">
            {
              curr>3 && <div className="ribbon"><span className="ribbon__content">Best Seller</span></div>
            }

          <Card.Body>
            <Card.Img variant="top" src= {sc} id="cardImg"/>
            
            <Card.Title
            className="cardHover"
            style={{overflow: "hidden",height:"50px"}}>
            {title}
            </Card.Title>
            
            <Card.Text style={{fontSize:"16px"}} >{brand}</Card.Text>
            <div style = {{height: "100%"}}>
            {nearexpiry?   

              <h5 style={{color:"red"}} >Expiry in <strong> {expiryin} </strong> days !</h5>
            : null}
            {nearexpiry?   
              <p className="text-muted">₹ <strike>{price}</strike> <strong> {discount} </strong></p>
            : <p className="text-muted"> <strong style={{color:"green",fontSize:"20px"}}>₹ {price} </strong></p>}
            <large className="text-right">    <FaBoxes style={{fontSize:"20px",marginRight:"3px"}}/> {instock} </large>
            </div>
          </Card.Body>
          

          
          
        </Card>
      </Col>
    );
    }
  };

  if(props.arr.length == 0){
    return(
      <Card xs= {6}>
        <Card.Body>
          <Card.Title>No results</Card.Title>
          <Card.Text>

             <img src={Emptyimg} style={{marginLeft:"40%",height:"15%",width:"20%"}}/>
             <p  style={{marginLeft:"40%"}}>Oops nothing mathces your search query !</p>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  return (
    <div>
    <Container>
      <Row>
        {
          props.arr.map((data, key) => {
          return (
              <Prod
                prod_id = {data._id}
                discount={data.DiscountedPrice}
                img_url={data.imgURL}
                title={data.Title}
                brand={data.brand}
                description={data.description}
                price={data.price}
                instock={data.Quantity}
                coinval={data.CoinValue}
                key={key}
                curr = {data.Rating}
                nearexpiry={data.nearexpiry}
                expiryin={data.expiryin}
              />
          );
        })}
      </Row>
    </Container>
    </div>
  )
}
export default ProductList ;
