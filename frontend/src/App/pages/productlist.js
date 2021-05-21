import {React, useState} from 'react'
import {Button, Card, CardColumns, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'

function ProductList(props){
  //console.log(props.arr);
  const Prod = ({ title, description, price, instock }) => {
    if (!title) return <div />;
    return (
      <Col xs={12} sm={6} md={4} style={{marginBottom:"0.5%"}}>
        <Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
            {description}
            </Card.Text>
            <Button variant="primary">Add to cart</Button>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">₹ {price}</small>
            <small className="text-right">X {instock}</small>
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
                key={key}
                //img_url={data.img_url}
                title={data.Title}
                description={data.description}
                price={data.price}
                instock={data.Quantity}
              />
          );
        })}
      </Row>
    </Container>
    </div>
  )
}
export default ProductList ;
