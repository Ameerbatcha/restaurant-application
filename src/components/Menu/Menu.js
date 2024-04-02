import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Navbar2 from '../Navbar/Navbar2';
import Button from 'react-bootstrap/Button';
import './Menu.css'
import Badge from 'react-bootstrap/Badge';
// import Image from "./../../components/images/foodie.jpeg";

const Menu = () => {
  const [data, setData] = useState([])
  // const [count,setCount]=useState(0)
  // {
  //   setCount(count+1)
  // }

  function addToCart(id) {
    const url = "https://hactvwuzyh.execute-api.ap-south-1.amazonaws.com/dev/api/cart"
    const params = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        food_id: id,
        user_id: 2
      })

    }
    fetch(url, params).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data.body);
      window.alert(data.body.message);
    })
    // setCount(count+1)
  }
  const fetchData = () => {
    const url = "https://hactvwuzyh.execute-api.ap-south-1.amazonaws.com/dev/api/food"
    const params = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(url, params).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data.body);
      setData(data.body)

    })
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (

    <div className='something'>
      <Navbar2 />

      <div className='menu'>

        {data.map((f) => {
          return <Card className='card'>
            <Card.Img className='cardimagesize' variant="top" src={`https://drive.google.com/uc?id=${f.food_image}`} />
            <Badge bg="secondary">Huge Discounts</Badge>
            <Card.Body>
              <Card.Title>{f.food_name}</Card.Title>
              <Card.Text>
                Price {f.food_price}/-
              </Card.Text>
              <Button variant="primary" onClick={() => { addToCart(f.food_id) }}>Add to cart</Button>
            </Card.Body>
            <Card.Text>

              <div className="ratings">
                {f.ratings}
                <i class="fa fa-star rating-color"></i>
              </div>
            </Card.Text>
          </Card>

        })}

      </div>

    </div>

  );
};
export default Menu;
