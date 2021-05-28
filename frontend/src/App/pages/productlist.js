import {React, useState,useEffect} from 'react'
import {Button, Card, CardColumns, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './productlist.css'
import { Link, useHistory } from 'react-router-dom';
import smile from './smile.png'
import axios from 'axios'
import Emptyimg from './finalnotfound.png'

function ProductList(props){
  const [ngo, setngo] = useState("false");

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
          }

        }
        }
    );

    }
  }, []);

  //console.log(props.arr);
  let history = useHistory();

  const Prod = ({prod_id,discount,img_url,title, brand, description, price, instock,coinval,nearexpiry}) => {
    var currRating;
    var sc = 'http://localhost:4000/upload/' + img_url;
    if (!title) return <div />;
    console.log("rating starts")
    const userInput = {
    prodid: prod_id
  }
    const header = {
      'Content-Type': 'Application/json'
    };
    axios.post('http://localhost:4000/product/getrating', userInput, { header } )
       .then(response => {
         console.log(JSON.stringify(response.data.prodrate));

         currRating=response.data.prodrate;
         console.log(currRating);
       });
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
      "nearexpiry": nearexpiry
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

    console.log('countcheck done')

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
      <Col xs={12} sm={6} md={4} style={{marginBottom:"0.5%"}}>
        <Card onClick={handleClick}
            className="cardHover">
          <Card.Body>
            <Card.Img variant="top" src= {sc} style = {{height: "300px"}}/>
            <Card.Title
            className="cardHover">
            {title}
            </Card.Title>
            <Card.Text>{brand}</Card.Text>
          </Card.Body>
          <Card.Footer>

          <div>
            {nearexpiry?   
              <p className="text-muted">₹ <strike>{price}</strike> <strong> {discount} </strong></p>
            : <p className="text-muted">₹ <strong> {price} </strong></p>}
            <small className="text-right">    x {instock} units</small>
            </div>
            <div className="smiley">
            <h4>{coinval} </h4>
            <img src={smile} height="24" width="24" marginTop="10" marginLeft="34px"/>
            </div>

          </Card.Footer>
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
          <Card.Body>
            <Card.Img variant="top" src= {sc} id="cardImg"/>
            
            <Card.Title
            className="cardHover"
            style={{overflow: "hidden",height:"50px"}}>
            {title}
            </Card.Title>
            
            <Card.Text  >{brand}</Card.Text>
          </Card.Body>
          <Card.Footer style = {{height: "90px",marginTop:"0"}}>

          <div style = {{height: "100%"}}>
            {nearexpiry?   
              <p className="text-muted">₹ <strike>{price}</strike> <strong> {discount} </strong></p>
            : <p className="text-muted">₹ <strong> {price} </strong></p>}
            <small className="text-right">    x {instock} units</small>
            </div>
          </Card.Footer>
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
                nearexpiry={data.nearexpiry}
              />
          );
        })}
      </Row>
    </Container>
    </div>
  )
}
export default ProductList ;
