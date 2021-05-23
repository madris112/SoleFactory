import {React, useState} from 'react'
import {Button, Card, CardColumns, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './productlist.css'
import { Link, useHistory } from 'react-router-dom';

function ProductList(props){
  //console.log(props.arr);
  let history = useHistory();
  const Prod = ({prod_id,discount,img_url,title, brand, description, price, instock}) => {
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
      "instock": instock
    }
  
    function handleClick(){
      history.push({
        pathname: "/productdescription",
        state: data
      })
    }
    
    return (
      <Col xs={12} sm={6} md={4} style={{marginBottom:"0.5%"}}>
        <Card>
          <Card.Body>
            <Card.Img variant="top" src= {sc} style = {{height: "200px"}}/>
            <Card.Title  
            onClick={handleClick} 
            className="cardHover">
            {title}
            </Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <p className="text-muted">₹ <strike>{price}</strike> <strong> {discount} </strong></p>
            <small className="text-right">    x {instock} units</small>
          </Card.Footer>
        </Card>
      </Col>
    );
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
