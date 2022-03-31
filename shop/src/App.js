import {useState} from 'react';
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import {Link,Route,Switch} from 'react-router-dom';
import Detail from './Detail.js'
import axios from 'axios';
import Cart from './Cart.js';

function App() {
  let [shoes,setShoes] = useState(Data);
  let [재고,재고변경] = useState([10,11,12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">SHOES</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/"> Home </Nav.Link> 
                <Nav.Link as={Link} to="/"> Detail </Nav.Link> 
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>

        <Route exact path="/">
          <MainPage shoes={shoes}/>
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>

      </Switch>

    </div>
  );
}

function Card(props){
  return(
    <div className="col-md-4">
    <img src={ 'https://codingapple1.github.io/shop/shoes'+(props.i+1)+'.jpg'} alt="코딩애플" width="100%" />
    <h4>{props.shoes.title}</h4>
    <p>{props.shoes.content} & {props.shoes.price}</p>
  </div>
  );
}

function Jumbotron(){
  return (
    <div className="bg-light p-5 rounded-lg m-3 jumbotron">
      <h1 className="display-4">20% Season Off</h1>
      <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr className="my-4"></hr>
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    </div>
  );
}

function MainPage(props){

  let [shoes,setShoes] = useState(Data);

  return(
    <div>
      <Jumbotron/>
      <div className="container">
        <div className="row">
          {
            shoes.map((a,i)=>{
              return(<Card shoes={shoes[i]} i={i} key={i}/>);
            })
          }
        </div>
        <button className="btn btn-primary" onClick={()=>{

          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{setShoes([...shoes,...result.data])})
          .catch(()=>{console.log("실패")});
          
        }}>더 보기</button>
      </div>
    </div>
  )
}

export default App;
