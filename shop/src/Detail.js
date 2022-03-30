import React, { useState,useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Detail.scss';

function Detail(props){
  let [alert,setAlert] = useState(true);
  let [inputData,setInputData] = useState('');

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
          <button className="btn btn-danger">주문하기</button>
          &nbsp; 
          <button className="btn btn-primary" onClick={()=>{
            history.goBack();
          }}>뒤로가기</button> 
        </div>
      </div>
    </div> 
  );
}

function Info(props){
  return(
    <p>재고 : {props.재고[0]}</p>
  )
}

export default Detail;