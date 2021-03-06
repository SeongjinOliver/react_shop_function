/* eslint-disable */

import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap'
import './App.css';
import Data from './data.js'

import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js'

import axios from 'axios';

function App() {

  let [재고, 재고변경] = useState([10, 11, 12]);
  let [shoes, setShoes] = useState(Data);
  let index = useState(0);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>

        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% Season OFF</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
          </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <div className="container">
            <div className="row">
              {
                shoes.map((a, i) => {
                  return <Card shoes={a} i={i} />
                })
              }
            </div>
          </div>
        </Route>

        <Route path="/detail/:id">
          {shoes.map}
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
        </Route>

        {/* 모든 문자 경로를 의미 */}
        <Route path="/:id">
          <div>아무거나 적었을 때 이거 보여주셈</div>
        </Route>

      </Switch>

      <button className="btn btn-primary" onClick={() => {

        // axios.post('서버URL', { id: 'codingapple', pw: 1234 }).then;

        // 로딩중이라는 UI 띄움
        axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result) => {
            // 로딩중이라는 UI 안보이게 처리
            // console.log(result.data)
            setShoes([...shoes, ...result.data]);

          })
          .catch(() => {
            // 로딩중이라는 UI 안보이게 처리
            console.log('실패했어요')
          })
      }}>더보기</button>
    </div >
  );
}


function Card(props) {
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
    </div>
  );
}

export default App;


