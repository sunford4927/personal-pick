import React from 'react'
import { useState , useEffect } from 'react';
import { modalClose } from '../../util/util'
import { URL } from '../../util/util';
import { useParams } from 'react-router-dom'
import { sendGet } from '../../util/util';




//  const navigate = useNavigate();



const ShoppingCartBtn = ({func}) => {

const [data , setData] = useState([]);

const {idx} = useParams()


useEffect(()=>{
    sendGet(URL + "/DetailPage?idx="+idx , setData); // 화장품 정보
},[]);

useEffect(()=>{
    console.log(data)
},[data]);

  return (
    <>
        <div class = "shoppingcart mt-8 px-20">장바구니 담기</div>
            <hr class='shoppingcartbar'/>
            <span class="addshopping">장바구니에 추가되었습니다.</span>
            <div class = "shoppincartmainbox">
            <div class='godetailmain'>
            <div class="godetailbutton">
            <a class="godetailbutton btn1 first flex" onClick={() => modalClose()}>쇼핑 계속하기</a>
            </div>
            </div>
            <div class='gotoshoppingmain'>
            <div class="gotoshoppingbutton">
            <a className="gotoshoppingbutton btn1 first flex" onClick={() => func("/cartlist")}>장바구니 이동</a>
            </div>
            </div>
            </div>

            
            {/* 랜덤 이미지 */}
            {data.length > 0 ? (
            <div className="modalimg"> 
            {data.map((item) => (
            <img src={item.cos_img_src} alt="코스메틱 이미지" />
            ))}
        </div>
    ) : (
  // 데이터가 없을 때 보여줄 내용
  <div>데이터가 없습니다.</div>
        )}
    </>
  )
}

export default ShoppingCartBtn