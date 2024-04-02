import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import "./Checkout.css"
import image from "./../images/food.webp"

export default function Checkout() {
  const [data, setData] = useState([]);
  const getData = () => {
    const url = "https://hactvwuzyh.execute-api.ap-south-1.amazonaws.com/dev/api/cart";
    const params = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, params)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.body);
        setData(data.body);
      });
  };
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div style={{ height: "100%", backgroundImage: `url(${image})`, backgroundSize: "cover", fontFamily: ' "Merriweather", serif' }}>
        <div className="checkout-container">
          <h1 className="h1" >
            <div> Your Food Cart</div>
          </h1>
          <Link className="btn btn-dark mx-1" to="/Home" role="button">
            Back
          </Link>
          <h3 className="h3">
            <i>Checkout your favourite food Added: </i>
          </h3>
          <div className="cart-container">

            <Table bordered hover>
              <thead>
                <tr>
                  <th>Item Selected</th>
                  <th>Item Price</th>
                  <th>Item Qty</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {data.map((f) => (
                  <tr key={f.id}>
                    <td>{f.food_name}</td>
                    <td>{f.food_price}</td>
                    <td>{f.quantity}</td>
                    <td>{f.food_price * f.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="coupon">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter a coupon code"
                  aria-label=""
                  aria-describedby="basic-addon2"
                />
                <Button variant="outline-primary" id="button-addon2">
                  Apply
                </Button>
              </InputGroup>
            </div>
            
            <div style={{ textAlign: "center" }}>
              <Link className="btn btn-primary mx-auto" to="/payment" role="button">
                Payment
              </Link>
            </div>

          </div>
        </div>




      </div>
    </>
  );
}
