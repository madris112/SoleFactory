import {React, useState,useEffect} from 'react'
import {Button, Card, CardColumns, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './productlist.css'
import { Link, useHistory } from 'react-router-dom';
import smile from './smile.png'
import axios from 'axios'

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
            // var y=response.data.retuser.CoinAmt;
            // console.log(parseInt(y));
            // setcoins(response.data.retuser.CoinAmt);
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

  //console.log(props.arr);
  let history = useHistory();
  const Prod = ({prod_id,discount,img_url,title, brand, description, price, instock,coinval}) => {
    var sc = 'http://localhost:4000/upload/' + img_url;
    if (!title) return <div />;
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
    }
  
    function handleClick(){
      history.push({
        pathname: "/productdescription",
        state: data
      })
    }

    if(ngo==="true"){

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
            <Card.Text>{description}</Card.Text>
          </Card.Body>
          <Card.Footer>
          
          <div>
            <p className="text-muted">₹ <strike>{price}</strike> <strong> {discount} </strong></p>
            <small className="text-right">    x {instock} units</small></div>
            <div className="smiley">
            <h4>{coinval} </h4> 
            <img src={smile} height="24" width="24" marginTop="10" marginLeft="34px"/>
            </div>
            
          </Card.Footer>
        </Card>
      </Col>
    );

    }else{
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
            <Card.Text>{description}</Card.Text>
          </Card.Body>
          <Card.Footer>
          
          <div>
            <p className="text-muted">₹ <strike>{price}</strike> <strong> {discount} </strong></p>
            <small className="text-right">    x {instock} units</small></div>
            
            
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
          Oops nothing mathces your search query !
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  var tempexpiryarray = [];
  var tempnonexpiryarray = [];

  var expfinalarray = []; 

  for(let key in props.arr){
    const curDate = new Date().toLocaleDateString();
    const expdate = new Date(props.arr[key].expiryDate).toLocaleDateString();

    var initial = curDate.split(/\//);
    var s1=[ initial[1], initial[0], initial[2] ].join('/');

    var last = expdate.split(/\//);
    var s2=[ last[1], last[0], last[2] ].join('/');

    const a=new Date(s1);
    const b=new Date(s2);
    const c=Math.abs(b-a)/(1000 * 60 * 60 * 24);

    console.log(c);
    if(c<5){
      tempexpiryarray.push(props.arr[key]);
    }else{
      tempnonexpiryarray.push(props.arr[key]);
    }
  }

  expfinalarray = ([...tempexpiryarray,...tempnonexpiryarray]);

  return (
    <div>
    <Container>
      <Row>
        {
          expfinalarray.map((data, key) => {
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
              />
          );
        })}
      </Row>
    </Container>
    </div>
  )
}
export default ProductList ;
