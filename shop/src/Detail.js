import React, { useState,useEffect } from 'react';
import {Nav} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import './Detail.scss';

import {CSSTransition} from 'react-transition-group';
import { connect } from 'react-redux';

function Detail(props){
  let [alert,setAlert] = useState(true);
  let [inputData,setInputData] = useState('');
  let [누른탭,누른탭변경] = useState(0);
  let [스위치,스위치변경] = useState(false);

  useEffect(()=>{
    let 타이머 = setTimeout(()=>{
      setAlert(false);
    },2000);
    return ()=>{clearTimeout(타이머)}
  },[]);

  let { id } = useParams();
  let findId = props.shoes.find(function(상품){
    return 상품.id == id
  });
  let history = useHistory();

  return (
    <div className="container">

      {alert?(<div className="my-alert">
        <p>재고가 얼마 남지 않았습니다.</p>
      </div>):null}

      {inputData}
      <input onChange={(e)=>{setInputData(e.target.value)}} />

      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes'+(findId.id+1)+'.jpg'} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{findId.title}</h4>
          <p>{findId.content}</p>
          <p>{findId.price}</p>
          <Info 재고={props.재고}></Info>
          <button className="btn btn-danger" onClick={()=>{
            props.dispatch({type : '항목추가', payload : {id: findId.id, name : findId.title, quan: 1}})
            history.push('/cart');
          }}>주문하기</button>
          &nbsp; 
          <button className="btn btn-primary" onClick={()=>{
            history.goBack();
          }}>뒤로가기</button> 
        </div>
      </div>


      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{ 스위치변경(false); 누른탭변경(0)}}> Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{ 스위치변경(false); 누른탭변경(1)}}> Option 2</Nav.Link>
        </Nav.Item>
      </Nav>


      
      <CSSTransition in = {스위치} classNames="wow" timeout = {2000}>
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>
    </div> 
  );
}

function TabContent(props){

  useEffect(()=>{
    props.스위치변경(true);
  });

  if(props.누른탭 === 0){
    return(<div>0번째 내용입니다.</div>)
  }else if(props.누른탭 === 1){
    return(<div>1번째 내용입니다.</div>)
  }else if(props.누른탭 === 2){
    return(<div>2번째 내용입니다.</div>)
  }
}


function Info(props){
  return(
    <p>재고 : {props.재고[0]}</p>
  )
}

function state를props화(state){
  console.log(state)
  return {
      state : state.reducer,
      alert열렸니 : state.reducer2
  }
}

export default connect(state를props화)(Detail);