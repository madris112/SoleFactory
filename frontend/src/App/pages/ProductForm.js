import {React, useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {Button, Container, Form, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import axios from 'axios'

function ProductForm() {
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discprice, setDiscprice] = useState("");
  const [expirydate, setExpiry] = useState("");



  function handleClick(e){
    e.preventDefault();
    var userInput = {
      brand: brand,
      name: name,
      title: title,
      description: description,
      category: category,
      price: price,
      quantity: quantity,
      discprice: discprice,
      expirydate: expirydate,

    }

    const header = {
      "Content-Type":"application/json"
    };

     axios.post('http://localhost:4000/', userInput , { header})
        .then(response => console.log(JSON.stringify(response.data.message)));
  }

  
  
  return (
    <div className = "fixed-bg">
      <Container fluid>
        <Row className = "justify-content-center" style = {{paddingTop: "2%"}}>
        <Col xs        = {2} sm                        = {5} md = {3}  className = "container-bg">
            

            {/* Form */}
            <Form>
              <Form.Group className = "form-elem">
                <Form.Label>Brand</Form.Label>
                <Form.Control 
                type        = "text"
                placeholder = "Brand name"
                value       = {brand}
                onChange    = {e=>setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Label>Seller's Name</Form.Label>
                <Form.Control 
                type        = "text"
                placeholder = "name"
                value       = {name}
                onChange    = {e=>setName(e.target.value)}
                ></Form.Control>
             

              <Form.Group className = "form-elem">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                type        = "text"
                placeholder = "Product Title"
                value       = {title}
                onChange    = {e=>setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className = "form-elem">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                as        = "textarea"
                rows      = {3}
                placeholder = "About Product"
                value       = {description}
                onChange    = {e=>setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

               <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Category</Form.Label>
                 <Form.Control 
                 as        =  "select" 
                 onChange  =  {e=>setCategory(e.target.value)}>
                  <option>Food and Beverages</option>
                  <option>Electronics</option>
                  <option>Body Care</option>
                  <option>Miscellaneous</option>
                  
               </Form.Control>
             </Form.Group>


              <Form.Group className = "form-elem">
                <Form.Label>Price</Form.Label>
                <Form.Control 
                type        = "text"
                placeholder = "Price"
                value       = {price}
                onChange    = {e=>setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className = "form-elem">
                <Form.Label>Quantity</Form.Label>
                <Form.Control 
                type        = "text"
                placeholder = "Quantity"
                value       = {quantity}
                onChange    = {e=>setQuantity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className = "form-elem">
                <Form.Label>Expiry Date</Form.Label>
                {/* <Form.Control 
                type        = "text"
                placeholder = "Expiry date"
                value       = {expirydate}
                onChange    = {e=>setExpiry(e.target.value)}
                ></Form.Control> */}

               
              </Form.Group>
               <DatePicker
              selected    ={expirydate}
              onChange    = {e=> setExpiry(e)}
              dateFormat  = 'dd/MM/yyyy'
               />

              

              <Form.Group className = "form-elem">
                <Form.Label>Discounted Price</Form.Label>
                <Form.Control 
                type        = "text"
                placeholder = "Discounted price"
                value       = {discprice}
                onChange    = {e=>setDiscprice(e.target.value)}
                ></Form.Control>
              </Form.Group>


              
              <Form.Group className = "form-elem">
                <Button 
                type      = "submit"
                className = "full-button"
                onClick   = {handleClick}
                >Submit</Button>
              </Form.Group>
              
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProductForm;
