import { React, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Container, Form, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom";
import "./Home.css"

function ProductForm() {
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [seller, setSeller] = useState("");
  const [description, setDescription] = useState("");
  const [categoryTag, setCategory] = useState("Food and Beverages");
  const [price, setPrice] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [discountedPrice, setDiscprice] = useState("");
  const [expiryDate, setExpiry] = useState("");
  const [selectedfile, setSelectedFile] = useState({});
  const [message, setMessage] = useState(null);
  const [ngo, setngo] = useState("false");

  function handleClick(e) {
    e.preventDefault();
    var userInput = {
      brand: brand,
      seller: seller,
      title: title,
      description: description,
      categoryTag: categoryTag,
      price: price,
      Quantity: Quantity,
      discountedPrice: discountedPrice,
      expiryDate: expiryDate,
    };

    let formData = new FormData();

    formData.append("file", selectedfile);
    formData.append("payload", JSON.stringify(userInput));

    const header = {
      "Content-Type": "application/json",
    };

    axios
      .post("http://localhost:4000/createProduct", formData, { header })
      .then((response) => {
        console.log(JSON.stringify(response.data.message));
        setMessage(response.data.message);
      });
  }

  return (
    <div className="prodadd_bg">
      <Container fluid>
        <Row className="justify-content-center" style={{ paddingTop: "2%" }}>
          <Col xs={2} sm={5} md={3} className="container-bg">
            {/* Form */}
            <Form>
              <Form.Group className="form-elem">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Brand name"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Label>Seller's Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
              ></Form.Control>

              <Form.Group className="form-elem">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="form-elem">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="About Product"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Category</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Food and Beverages</option>
                  <option>Electronics</option>
                  <option>Body Care</option>
                  <option>Miscellaneous</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="form-elem">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="form-elem">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Quantity"
                  value={Quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="form-elem">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  dateFormat="dd/MM/yyyy"
                  placeholder="Expiry date"
                  value={expiryDate}
                  onChange={(e) => setExpiry(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* <DatePicker
              selected    ={expiryDate}
              onChange    = {e=> setExpiry(e)}
              dateFormat  = 'dd/MM/yyyy'
               /> */}

              <Form.Group className="form-elem">
                <Form.Label>Discounted Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Discounted price"
                  value={discountedPrice}
                  onChange={(e) => setDiscprice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="form-elem">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="form-elem">
                <Button
                  type="submit"
                  className="full-button"
                  onClick={handleClick}
                >
                  Submit
                </Button>
                <h6 style={{ color: "green" }}>{message}</h6>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductForm;
