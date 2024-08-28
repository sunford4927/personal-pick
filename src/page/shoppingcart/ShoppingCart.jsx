import React, { useEffect, useState } from 'react';
import LeftArrow from "../../img/왼쪽.png"
import { useNavigate } from 'react-router-dom';
import './ShoppingCart.scss'
import { sendGet, sendPost, URL } from '../../util/util';
import { useSelector } from 'react-redux';

const ShoppingCart = () => {
    const nav = useNavigate();
    const user = useSelector(state => state.user);

    const [data, setData] = useState([])
    const [totalPrice, setTotalPrice]= useState(0);
    useEffect(()=>{
        if(typeof(user.user_id) !== "undefined")
        {
            sendGet(URL+"/OrderCart?userid="+user.user_id,setData)
        }

        if(typeof(user.user_id) === "undefined"){
            nav("/")
        }
    },[])
    
    const PLUS = 0;
    const MINUS = 1;
    function calcul(type, targetNum){
        let str = "";
        switch(type)
        {
            case PLUS:
                str = "increase"
            case MINUS:
                str = "decrease"
            default:
                break;
        }
        if(str !== "")
        {

            sendPost(URL + "/UpdateCartCnt", null, { user_id: user.user_id, idx : data[targetNum].idx, action : str})
            sendGet(URL+"/OrderCart?userid="+user.user_id,setData)
        }
    }
    
    function totalCheck(e){
        if(e.target.checked)
        {
            let changeList = [...data];
            for(let i = 0; i<changeList.length; i++)
            {
                changeList[i].is_selected = true;
            }   
            setData([...changeList])
        }
    }
    useEffect(()=>{
        let price = 0;
        for(let i =0; i< data.length; i++)
        {
            if(data[i].is_selected)
            {
                price+=data[i].total_price;
            }
        }
        setTotalPrice(price)
    },[data])
    return (
        <>
            <div className='management_title'>
                <img className='home_menu float_l cursor' src={LeftArrow} alt=""  onClick={()=>nav(-1)}/>
                <p>장바구니</p>
            </div>

            <p className='basket_text'>샘플로드 배송상품</p>

            <div className='basket_line flex_col ' style={{alignItems:"center"}}>
                <input type="checkbox" className='basket_check'  onChange={(e)=> totalCheck(e)}/>
                <div className='sub_title' >전체선택</div>
                <div className='basket_text' style={{marginRight : "30px", marginLeft : "auto"}}>품절삭제</div>
                <div className='basket_text'>선택삭제</div>
            </div>
            <hr />
            <div>
                {data.map((item, i)=>{
                    console.log(item)
                    
                    return (
                        <div  key={item.idx}>
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
                                        {item.vol}
                                    </p>
                                </div>
                                {/* <img className='basket_x_btn ' src={XBtn} alt="" style={{marginLeft: "40%"}}/> */}
                            </div>
                            <div className='flex_col basket_under_container'>
                                <div className='flex_col basket_under_content_box'>
                                    <div className='basket_sum_btn' onClick={()=>calcul(PLUS, i)}>-</div>
                                    <div className='basket_price'>{item.buy_cnt}</div>
                                    <div className='basket_sum_btn' onClick={()=>calcul(MINUS, i)}>+</div>
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
                <span className='float_r basket_price'>{totalPrice+"원"}</span>
            </div>
            <div className='basket_line'>
                <span className='sub_title'>배송비</span>
                <span className='float_r basket_price'>3,000원</span>
            </div>

            <hr />
            <div className='basket_line'>
                <span className='tax_title'> 총 주문금액</span>
                <span className='float_r basket_price basket_color_text'> {totalPrice+3000+"원"}</span>
            </div>
            <div className='basket_fix_btn' onClick={()=>{
                sendPost(URL+"/OrderCart", null , data)
                nav('/payshipment')
                }}>
                {totalPrice+3000+"원 주문하기"}
            </div>
        </>
    );
};

export default ShoppingCart;