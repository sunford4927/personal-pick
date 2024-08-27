import React, { useEffect, useState } from 'react';
import LeftArrow from "../../img/왼쪽.png"
import { useNavigate } from 'react-router-dom';
import './ShoppingCart.scss'
import { sendGet, URL } from '../../util/util';
import { useSelector } from 'react-redux';

const ShoppingCart = () => {
    const nav = useNavigate();
    const user = useSelector(state => state.user);
    if(!user){
        nav("/")
    }
    const [data, setData] = useState([])
    useEffect(()=>{
        console.log(typeof(user))
        if(typeof(user.user_id) !== "undefined")
        {
            sendGet(URL+"/OrderCart?userid="+user.user_id,setData)
        }

    },[])


    return (
        <>
            <div className='management_title'>
                <img className='home_menu float_l cursor' src={LeftArrow} alt=""  onClick={()=>nav(-1)}/>
                <p>장바구니</p>
            </div>

            <p className='basket_text'>샘플로드 배송상품</p>

            <div className='basket_line flex_col ' style={{alignItems:"center"}}>
                <input type="checkbox" className='basket_check'  />
                <div className='sub_title'>전체선택</div>
                <div className='basket_text' style={{marginRight : "30px", marginLeft : "auto"}}>품절삭제</div>
                <div className='basket_text'>선택삭제</div>
            </div>
            <hr />
            <div>
                {data.map((item, i)=>{
                    return (
                        <div  key={item.cart_id}>
                            <div className='flex_col basket_item_box'>
                                <input className='basket_check' type="checkbox" checked={item.is_selected} onChange={()=>{
                                    let changeData = [...data]
                                    changeData[i].is_selected = !changeData[i].is_selected;
                                    setData([...changeData])
                                }} />
                                <img className='basket_img' src={item.cos_img_src} alt="" />
                                <div className='basket_content_text'>
                                    <p className='sub_title'>
                                        {item.brand_name}
                                    </p>
                                    <p className='basket_text'>
                                        {item.cos_name}
                                    </p>
                                    <p className='basket_text'>
                                        {item.grade_count}
                                    </p>
                                </div>
                                {/* <img className='basket_x_btn ' src={XBtn} alt="" style={{marginLeft: "40%"}}/> */}
                            </div>
                            <div className='flex_col basket_under_container'>
                                <div className='flex_col basket_under_content_box'>
                                    <div className='basket_sum_btn'>-</div>
                                    <div className='basket_price'>{item.buy_cnt}</div>
                                    <div className='basket_sum_btn'>+</div>
                                </div>
                                <p className='margin_left_pull basket_price'>{(item.price* item.buy_cnt)+"원"}</p>
                            </div>
                            <div className='grayline'></div>
                        </div>
                    )
                })}


            </div>

            <div className='flex_col basket_middle_container'>
                <div className='basket_middle_btn'>선택주문</div>
                <div className='basket_middle_btn'>전체주문</div>
            </div>

            <p className='tax_title'>예상 결제금액</p>
            <div className='basket_line '>
                <span className='sub_title'>총 상품금액</span>
                <span className='float_r basket_price'>43000원</span>
            </div>
            <div className='basket_line'>
                <span className='sub_title'>배송비</span>
                <span className='float_r basket_price'>3,000원</span>
            </div>

            <hr />
            <div className='basket_line'>
                <span className='tax_title'> 총 주문금액</span>
                <span className='float_r basket_price basket_color_text'> 46000원</span>
            </div>
            <div className='basket_fix_btn'>
                46,000원 주문하기
            </div>
        </>
    );
};

export default ShoppingCart;